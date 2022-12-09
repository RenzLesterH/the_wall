let sign_in_form_container = document.getElementById("sign_in_form_container");
let sign_up_form_container = document.getElementById("sign_up_form_container");

const sign_up =  document.getElementById("sign_up_link"); 
sign_up.addEventListener("click", function () {
    toggleForm(sign_up_form_container, sign_in_form_container);
    return false;
});

const sign_in =  document.getElementById("sign_in_link");
sign_in.addEventListener("click", function () {
    toggleForm(sign_in_form_container, sign_up_form_container);  
    return false;
});

const form_sign_in =  document.getElementById("form_sign_in");
form_sign_in.addEventListener("submit", function (event) {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let email_error = document.getElementsByClassName("sign_in_error")[0];
    let password_error = document.getElementsByClassName("sign_in_error")[1];
    if(email.value === "test1@gmail.com" && password.value === "test1@gmail.com"){
        window.location.href = "../views/wall.html";
    }
    else{
        if(email.value !== "test1@gmail.com"){
            email.classList.add("input_error");
            email_error.classList.add("show_element"); 
            email_error.textContent = "Incorrect Email";
        }
        if(password.value !== "test1@gmail.com"){
            password.classList.add("input_error");
            password_error.classList.add("show_element");  
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
            sign_up_errors[i].classList.remove("hide_element");
            sign_up_errors[i].classList.add("show_element");
            sign_up_errors[i].textContent = sign_up_inputs[i].name+" is required";
        }
        else{
            sign_up_errors[i].classList.add("hide_element");
            sign_up_errors[i].classList.remove("show_element");
            input_id.classList.remove("input_error");
            validateSignUp(sign_up_inputs, sign_up_errors);
        }
    }
    event.preventDefault();   
});

function toggleForm(form_to_show, form_to_hide){
    form_to_hide.classList.remove("show_element");
    form_to_hide.classList.add("hide_element");
    form_to_show.classList.remove("hide_element");
    form_to_show.classList.add("show_element"); 
}

function validateSignUp(sign_up_inputs, sign_up_errors){
    if (validateEmail(sign_up_inputs[0].value) && sign_up_inputs[0].value !== "" && sign_up_inputs[1].value !== "" && sign_up_inputs[2].value !== "" && sign_up_inputs[1].value === sign_up_inputs[2].value) {
        window.location.href = "../views/wall.html"; 
    }
    else{ 
        if(sign_up_inputs[1].value !== sign_up_inputs[2].value){
            sign_up_inputs[2].classList.add("input_error");
            sign_up_errors[2].classList.add("show_element");
            sign_up_errors[2].textContent = "Password doesn't match";
        }
        if (!validateEmail(sign_up_inputs[0].value)) {
            sign_up_inputs[0].classList.add("input_error");
            sign_up_errors[0].classList.add("show_element");
            sign_up_errors[0].textContent = "Email is not valid";
        }
    }
} 

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 