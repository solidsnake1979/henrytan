const password=document.getElementById("password")
const password2=document.getElementById("password2")
const btn=document.getElementById("btn")

function check_password(password,password2){
if(password.value===password2.value){
    console.log("password created")
}
}


btn.addEventListener("click",()=>{
check_password(password,password2)
})