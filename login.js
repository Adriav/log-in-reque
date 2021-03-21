const formlog = document.getElementById("login-form");
const BtnLog = document.getElementById("login-form-submit");
const ErrorMessage = document.getElementById("login-error-msg");
BtnLog.addEventListener("click", (e) =&gt; {
e.preventDefault();
const username = formlog.username.value;
const password = formlog.password.value;
if (username === "admin" &amp;&amp; password === "itsourcecode") { alert("You have successfully logged in."); location.reload(); } else { ErrorMessage.style.opacity = 1; }
})