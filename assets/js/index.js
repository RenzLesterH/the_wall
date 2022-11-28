window.onload = function() {
   let sign_in_form = document.getElementById("sign_in_form");
   let sign_up_form = document.getElementById("sign_up_form");

   const sign_up = document.getElementById("sign_up_link");
   sign_up.addEventListener("click", function(){
        sign_in_form.style.display = "none";
        sign_up_form.style.display = "block";
        return false;
   })

   const sign_in = document.getElementById("sign_in_link");
   sign_in.addEventListener("click", function(){
        sign_in_form.style.display = "block";
        sign_up_form.style.display = "none";
        return false;
   })

   const form_sign_in = document.getElementById("form_sign_in"); 
   form_sign_in.addEventListener("submit", function(event){
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let error_email = document.getElementsByClassName("error_email")[0];
        let error_password = document.getElementsByClassName("error_password")[0];
        if (email.value === "test1@gmail.com" && password.value === "test1@gmail.com") {
            window.location.href = "../views/wall.html";
        }else{
            if (email.value !== "test1@gmail.com") {
                email.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
                error_email.style.display = "block";
                error_email.innerHTML = "Incorrect Email";
            }
            if (password.value !== "test1@gmail.com") {
                password.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
                error_password.style.display = "block";
                error_password.innerHTML = "Incorrect Password"; 
            }
        }
        event.preventDefault(); 
   });

   const form_sign_up = document.getElementById("form_sign_up"); 
   form_sign_up.addEventListener("submit", function(event){
        let email = document.getElementById("sign_up_email");
        let password = document.getElementById("sign_up_password");
        let confirm_password = document.getElementById("sign_up_confirm_password");
        let error_email = document.getElementsByClassName("error_email")[1];
        let error_password = document.getElementsByClassName("error_password")[1];
        let error_current_password = document.getElementsByClassName("error_current_password")[0];
        if (email.value === "") {
            email.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
            error_email.style.display = "block";
            error_email.innerHTML = "Email is required";
        }
        if(password.value === ""){
            password.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
            error_password.style.display = "block";
            error_password.innerHTML = "Password is required"; 
        }
        if(confirm_password.value === ""){
            confirm_password.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
            error_current_password.style.display = "block";
            error_current_password.innerHTML = "Current password is required"; 
        }
        if(password.value !== confirm_password.value){
            confirm_password.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
            error_current_password.style.display = "block";
            error_current_password.innerHTML = "Current password doesn't match"; 
        }else if(password.value !== "" && confirm_password.value !== ""){
            document.getElementById("sign_in_link").click();
        }
        event.preventDefault(); 
   });
}