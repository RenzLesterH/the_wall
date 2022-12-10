let sign_in_form = document.getElementById("form_sign_in"); 
let sign_up_form = document.getElementById("form_sign_up"); 

const sign_up =  document.getElementById("sign_up_link"); 
sign_up.addEventListener("click", () => { toggleForm(sign_up_form, sign_in_form) }); 

const sign_in =  document.getElementById("sign_in_link");
sign_in.addEventListener("click", () => { toggleForm(sign_in_form, sign_up_form) }); 

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
        if(email.value !== login_credentials.email){
            email.classList.add("input_error");
            email_error.classList.add("show_element"); 
            email_error.textContent = "Incorrect Email";
        }
        if(password.value !== login_credentials.password){
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
    let is_inputs_empty = true; 
    /** This will check if all inputs in sign up is empty. */
    for (let input_index = 0; input_index < sign_up_inputs.length; input_index++) { 
        let input_id = document.getElementById(sign_up_inputs[input_index].id);
        if (sign_up_inputs[input_index].value === "") {
            input_id.classList.add("input_error");
            sign_up_errors[input_index].classList.remove("hide_element");
            sign_up_errors[input_index].classList.add("show_element");
            sign_up_errors[input_index].textContent = sign_up_inputs[input_index].name+" is required";
            is_inputs_empty = false;
        }
        else{
            sign_up_errors[input_index].classList.add("hide_element");
            sign_up_errors[input_index].classList.remove("show_element");
            input_id.classList.remove("input_error");
        }
    }
    validateSignUp(is_inputs_empty, sign_up_inputs, sign_up_errors);
    event.preventDefault();   
});

function toggleForm(form_to_show, form_to_hide){
    form_to_hide.classList.remove("show_element_flex");
    form_to_hide.classList.add("hide_element");
    form_to_show.classList.remove("hide_element");
    form_to_show.classList.add("show_element_flex"); 
}

function validateSignUp(is_inputs_empty, sign_up_inputs, sign_up_errors){
    let email = sign_up_inputs[0].value; 
    let password = sign_up_inputs[1].value;
    let confirm_password = sign_up_inputs[2].value; 
    if (is_inputs_empty && isEmailValid(email) && password === confirm_password) {
        window.location.href = "../views/wall.html"; 
    }
    else{
        /** Check if confirm password matches to the password. */
        if(password !== confirm_password){ 
            sign_up_inputs[2].classList.add("input_error");
            sign_up_errors[2].classList.add("show_element");
            sign_up_errors[2].textContent = "Password doesn't match";
        }
        if (!isEmailValid(email)) {
            sign_up_inputs[0].classList.add("input_error");
            sign_up_errors[0].classList.add("show_element");
            sign_up_errors[0].textContent = "Email is not valid";
        }
    }
} 

function isEmailValid(email) {
    return regex_email.test(String(email).toLowerCase());
}