// LOGIN
async function login(){
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
alert("Enter email and password");
return;
}

const res = await post("/auth/login",{email,password});

if(res.token){
localStorage.setItem("token",res.token);
window.location.href = "dashboard.html";
}else{
alert("Login failed");
}
}

// SIGNUP
async function signup(){
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
alert("Enter email and password");
return;
}

const res = await post("/auth/signup",{email,password});

if(res.success){
alert("Account created");
window.location.href = "login.html";
}else{
alert("Signup failed");
}
}

// CHECK AUTH
function checkAuth(){
const token = localStorage.getItem("token");

if(!token){
window.location.href = "login.html";
}
}

// LOGOUT
function logout(){
localStorage.removeItem("token");
window.location.href = "login.html";
}
