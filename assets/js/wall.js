
let create_post_textarea = document.getElementById("create_post_textarea");
let post_comment = document.getElementsByClassName("post_comment")[0];
let comment_list = document.getElementsByClassName("comment_list")[0];
let edit_message = document.getElementsByClassName("edit_message")[0];
let edit_comment = document.getElementsByClassName("edit_comment")[0];

let total_messages_list = document.getElementById("total_messages").textContent;
let total_messages_list_int = parseInt(total_messages_list);
let message_id = 0;

//detects if textarea if empty
function checkTextareaEmpty() {
    let post_message_btn = document.getElementById("post_message_btn");
    if (create_post_textarea.value === "") {
        post_message_btn.setAttribute("disabled", true);
        post_message_btn.style.backgroundColor = "rgba(44, 107, 255, 0.5)";
    } else {
        post_message_btn.removeAttribute("disabled");
        post_message_btn.style.backgroundColor = "#2c6bff";
    }
}

//shows edit form.
// function toggleEditForm(edit_form, element_child, child_number) {
//     if (window.getComputedStyle(edit_form).display === "none") {
//         document.getElementsByClassName(element_child)[child_number].children[0].style.display = "none";
//         document.getElementsByClassName(element_child)[child_number].children[1].style.display = "none";
//         edit_form.style.display = "block";
//     } else {
//         document.getElementsByClassName(element_child)[child_number].children[0].style.display = "block";
//         document.getElementsByClassName(element_child)[child_number].children[1].style.display = "flex";
//         edit_form.style.display = "none";
//     }
// }

//deletes message.
function showDeleteModal(post_type) {
    let action_modal = document.getElementById("action_modal");
    document.getElementById("action_form_input").value = post_type;
    document.getElementById("modal_body_title").innerHTML = "Confirm Delete "+post_type;
    document.getElementById("modal_body_description").innerHTML = "Are you sure you want to remove this "+post_type.toLowerCase()+" ? This action cannot be undone.";
    action_modal.style.display = "block"; 
}

//show edit form message.
function toggleForm(id_message) {
    document.getElementById("edit_message_form").style.display = "block";
    let message_list = document.getElementById(id_message);
    message_list.children[0].style.display = "none";
    message_list.children[1].style.display = "none";
    let message = document.getElementById("edit_message_form");
    let clone_message_list = message.cloneNode(true);
    clone_message_list.className = "edit_message_form";
    clone_message_list.id = "update_"+id_message; 
    message_list.prepend(clone_message_list);
    document.getElementById("edit_message_form").style.display = "none";
}

//hide edit form message.
function closeEditForm(id_message,update_form_id){
    let message_list = document.getElementById(id_message);
    message_list.children[1].style.display = "block";
    message_list.children[2].style.display = "flex"; 
    document.getElementById(update_form_id).remove();
}

//show comment form
function toggleCommentForm(id_message) {
    document.getElementById("post_comment_container").style.display = "block";
    let comments = document.getElementById(id_message);
    let comment_form = document.getElementById("post_comment_container");
    let clone_comment_form = comment_form.cloneNode(true);
    // clone_comment_form.className = "post_comment";
    // clone_comment_form.id = "update_"+id_message; 
    comments.appendChild(clone_comment_form);
    document.getElementById("post_comment_container").style.display = "none";
}

//triggers create message modal
document.getElementById("create_message_modal_button").addEventListener('click', function () {
    document.getElementById("create_post_modal").style.display = "block";
    checkTextareaEmpty();
});

//triggers cancel in create message modal
document.getElementById("cancel_post_message_btn").addEventListener('click', function () {
    create_post_textarea.value = "";
    document.getElementById("create_post_modal").style.display = "none";
});

//triggers close in create message modal
document.getElementsByClassName("close")[0].addEventListener('click', function () {
    document.getElementById("create_post_modal").style.display = "none";
});

window.addEventListener('click', function (event) {
    let create_post_modal = document.getElementById("create_post_modal");
    if (event.target === create_post_modal) {
        create_post_modal.style.display = "none";
    }
});

//detect if textarea if empty in keyup
document.addEventListener('keyup', function () {
    checkTextareaEmpty();
});

//add the new message in the lists
const form_message = document.getElementById("create_message_form");
form_message.addEventListener("submit", function (event) {
    document.getElementById("create_post_modal").style.display = "none";
    document.getElementById("empty_post").style.display = "none"; 
    document.getElementById("created_message").style.display = "block";
    let message_container = document.getElementById("message_container");
    let message = document.getElementById("created_message");
    let clone_message_container = message.cloneNode(true);
    clone_message_container.id = "message_"+total_messages_list_int;
    message_container.prepend(clone_message_container);
    document.getElementById("message_"+total_messages_list_int).firstElementChild.textContent = create_post_textarea.value;
    document.getElementById("created_message").style.display = "none";
    create_post_textarea.value = "";
    total_messages_list_int++;
    document.getElementById("total_messages").innerHTML = total_messages_list_int;
    event.preventDefault();
});

document.addEventListener("click", function(event) {
    let clicked_by = event.target;
    if (clicked_by.className == "comment_button") {
        message_id = event.target.closest('div[id]').id;
        toggleCommentForm(message_id);
    } else if (clicked_by.className == "edit_button edit_message") {
        message_id = event.target.closest('div[id]').id;
        toggleForm(message_id);
    }else if (clicked_by.className == "delete_button") {
        showDeleteModal("Message");
        message_id = event.target.closest('div[id]').id;
    }else if (clicked_by.id == "cancel_updating_message_btn") {
        message_id = event.target.closest('div[id]').id;
        closeEditForm(message_id,event.target.closest('form[id]').id);
    }
});


document.getElementsByClassName("delete_comment")[0].addEventListener('click', function () {
    let action_modal = document.getElementById("action_modal");
    action_modal.style.display = "block";
    document.getElementById("action_form_input").value = "comment";
    document.getElementById("modal_body_title").innerHTML = "Confirm Delete Comment";
    document.getElementById("modal_body_description").innerHTML = "Are you sure you want to remove this comment? This action cannot be undone.";
});

document.getElementById("cancel_remove_btn").addEventListener('click', function () {
    document.getElementById("action_modal").style.display = "none";
});

document.getElementsByClassName("close")[1].addEventListener('click', function () {
    document.getElementById("action_modal").style.display = "none";
});

window.addEventListener('click', function (event) {
    let action_modal = document.getElementById("action_modal");
    if (event.target === action_modal) {
        action_modal.style.display = "none";
    }
});

//remove post or comment
const action_form = document.getElementById("action_form");
action_form.addEventListener("submit", function (event) {
    let action_form_input = document.getElementById("action_form_input").value;
    document.getElementById("action_modal").style.display = "none";
    if (action_form_input === "Message") {
        document.getElementById(message_id).style.display = "none";
        console.log(message_id);
        total_messages_list_int--;
        document.getElementById("total_messages").innerHTML = total_messages_list_int;
    } else {
        document.getElementsByClassName("comment_list")[0].style.display = "none";
    }
    event.preventDefault();
});

//show comment list
document.getElementsByClassName("comment_button")[1].addEventListener('click', function () {
    if (window.getComputedStyle(post_comment).display === "none") {
        post_comment.style.display = "block";
        comment_list.style.display = "block";
    } else {
        post_comment.style.display = "none";
        comment_list.style.display = "none";
    }
});

edit_message.addEventListener('click', function () {
    toggleEditForm(edit_message_form, "message_list", 1);
});

document.getElementById("cancel_updating_message_btn").addEventListener('click', function () {
    toggleEditForm(edit_message_form, "message_list", 1);
});

edit_comment.addEventListener('click', function () {
    toggleEditForm(edit_comment_form, "comment_list", 0);
});

document.getElementById("cancel_updating_comment_btn").addEventListener('click', function () {
    toggleEditForm(edit_comment_form, "comment_list", 0);
});
