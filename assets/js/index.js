let sign_in_form = document.getElementById("sign_in_form");
let sign_up_form = document.getElementById("sign_up_form");

const sign_up =  document.getElementById("sign_up_link");
sign_up.addEventListener("click", function () {
    sign_in_form.style.display = "none";
    sign_up_form.style.display = "block";
    return false;
});

const sign_in =  document.getElementById("sign_in_link");
sign_in.addEventListener("click", function () {
    sign_in_form.style.display = "block";
    sign_up_form.style.display = "none";
    return false;
});

function validateSignUp(sign_up_inputs, sign_up_errors){
    if (sign_up_inputs[0].value !== "" && sign_up_inputs[1].value === sign_up_inputs[2].value) {
        window.location.href = "../views/wall.html";
    }else if(sign_up_inputs[1].value !== sign_up_inputs[2].value){
        sign_up_inputs[2].classList.add("input_error");
        sign_up_errors[2].style.display = "block";
        sign_up_errors[2].textContent = "Password doesn't match";
    }
}

const form_sign_in =  document.getElementById("form_sign_in");
form_sign_in.addEventListener("submit", function (event) {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let email_error = document.getElementsByClassName("sign_in_error")[0];
    let password_error = document.getElementsByClassName("sign_in_error")[1];
    if(email.value === "test1@gmail.com" && password.value === "test1@gmail.com"){
        window.location.href = "../views/wall.html";
    }else{
        if(email.value !== "test1@gmail.com"){
            email.classList.add("input_error");
            email_error.style.display = "block";
            email_error.textContent = "Incorrect Email";
        }
        if(password.value !== "test1@gmail.com"){
            password.classList.add("input_error");
            password_error.style.display = "block";
            password_error.textContent = "Incorrect Password";
        }
    }
    event.preventDefault();
});

const form_sign_up =  document.getElementById("form_sign_up");
form_sign_up.addEventListener("submit", function (event) {
    let sign_up_inputs = document.getElementsByClassName("sign_up_inputs");
    let sign_up_errors = document.getElementsByClassName("sign_up_error");
    for (let i = 0; i < sign_up_inputs.length; i++) { 
        let input_id = document.getElementById(sign_up_inputs[i].id);
        if (sign_up_inputs[i].value === "") {
            input_id.classList.add("input_error");
            sign_up_errors[i].style.display = "block";
            sign_up_errors[i].textContent = "Incorrect "+sign_up_inputs[i].name;
        }else{
            sign_up_errors[i].style.display = "none";
            input_id.classList.remove("input_error");
            validateSignUp(sign_up_inputs, sign_up_errors); 
        }
    }
    event.preventDefault();
});