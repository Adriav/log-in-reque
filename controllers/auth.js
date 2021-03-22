const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

exports.login = async (req, res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).render('login', {
                message: 'Por favor ingrese un correo o contraseña!'
            });
        }

        db.query('SELECT * FROM myusers WHERE email = ?',[email], async(error, results)=>{
            if(error){
                console.log(error);
            }
            console.log(results);
            
            if(results.length==0){
                return res.status(401).render('login', {
                    message: 'El correo o la contraseña son incorrectos!'
                });
            }else if(!(await bcrypt.compare(password, results[0].pass))){
                return res.status(401).render('login', {
                    message: 'El correo o la contraseña son incorrectos!'
                });
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id}, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: "+token);

                const cookieopt = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES *24*60*60*1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt',token, cookieopt);
                res.status(200).redirect("/home");
                
                
                
            }
        });
    } catch (error) {
        console.log(error);
    }
}




exports.register = (req, res)=>{
    console.log(req.body);
    const fname = req.body.name;
    const lname = req.body.lname;
    const tel = req.body.tel;
    const email = req.body.email;
    const pass1 = req.body.password;
    const pass2 = req.body.passwordC;
    const phone = parseInt(tel, 10);

    db.query('SELECT phone FROM myusers WHERE phone = ?', [phone], (error, result)=>{
        if(error){
            console.log(error);
        }
        if(result.length > 0){
            return res.render('register', {
                message: 'Numero de telefono ya registrado!'
            });
        }
        
    });

    db.query('SELECT email FROM myusers WHERE email = ?', [email], async (error, result)=>{
        if(error){
            console.log(error);
        }
        if(result.length > 0){
            return res.render('register', {
                message: 'Correo ya esta en uso!'
            });
        } else if(pass1 !== pass2){
            return res.render('register', {
                message: 'Las contraseñas no coinciden!'
            });
        }
        let hashPass = await bcrypt.hash(pass1, 8);
        

        db.query('INSERT INTO myusers SET ?', {email: email, pass: hashPass, fname: fname, lname: lname, phone: phone}, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                return res.render('register', {
                    message: 'Usuario registrado!\nDa click en la opcion "Log in" arriba a la derecha'
                });
            }
        });

    });

    //res.send("Form Submitted");
}