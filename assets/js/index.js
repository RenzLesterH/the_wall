
let sign_in_form = document.getElementById("sign_in_form");
let sign_up_form = document.getElementById("sign_up_form");

const sign_up = document.getElementById("sign_up_link");
sign_up.addEventListener("click", function () {
    sign_in_form.style.display = "none";
    sign_up_form.style.display = "block";
    return false;
})

const sign_in = document.getElementById("sign_in_link");
sign_in.addEventListener("click", function () {
    sign_in_form.style.display = "block";
    sign_up_form.style.display = "none";
    return false;
})

const form_sign_in = document.getElementById("form_sign_in");
form_sign_in.addEventListener("submit", function (event) {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let error_email = document.getElementsByClassName("sign_in_error")[0];
    let error_password = document.getElementsByClassName("sign_in_error")[1];
    if (email.value === "test1@gmail.com" && password.value === "test1@gmail.com") {
        window.location.href = "../views/wall.html";
    } else {
        if (email.value !== "test1@gmail.com") {
            email.classList.add("input_error");
            error_email.style.display = "block";
            error_email.innerHTML = "Incorrect Email";
        }
        if (password.value !== "test1@gmail.com") {
            password.classList.add("input_error");
            error_password.style.display = "block";
            error_password.innerHTML = "Incorrect Password";
        }
    }
    event.preventDefault(); 
});

const form_sign_up = document.getElementById("form_sign_up");
form_sign_up.addEventListener("submit", function (event) {
    let sign_up_inputs = document.getElementsByClassName("sign_up_inputs");
    let sign_up_error = document.getElementsByClassName("sign_up_error");
    for (var i = 0; i < sign_up_inputs.length; i++) {
        let input_id = document.getElementById(sign_up_inputs[i].id);
        if (sign_up_inputs[i].value === "") {
            input_id.classList.add("input_error");
            sign_up_error[i].style.display = "block";
            sign_up_error[i].textContent = "Incorrect "+sign_up_inputs[i].name;
        }else{
            sign_up_error[i].style.display = "none";
            input_id.classList.remove("input_error");
        }
    }
    event.preventDefault();
});