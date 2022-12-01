let create_post_textarea = document.getElementById("create_post_textarea");
let total_messages_list = document.getElementById("total_messages").textContent;
let total_messages_list_int = parseInt(total_messages_list);
let comment_id_list_int = 0;
let message_id = 0;
let content = "";


/* detects if textarea if empty */
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

/* create a html template for message and comment */
function containerTemplate(container_type, container_list, content, content_number){
    let container = document.getElementById(container_type);
    /* Create div for message container. */
    let container_list_div = document.createElement("div");
    container_list_div.className = container_list;
    container_list_div.id = container_list+content_number;
    /* Create p for message content. */
    let container_list_p = document.createElement("p");
    container_list_div.appendChild(container_list_p);
    container_list_p.textContent = content;
    /* Create div for action message. */
    let action_div = document.createElement("div");
    action_div.className = "action_message";
    container_list_div.appendChild(action_div);
    /* This functions create action buttons inside the the action_message div. */
    if (container_list === "message_list") 
    {
        createActionButtons(action_div,"button", "comment_button", "0 comment","span");
    }
    createActionButtons(action_div,"button", "edit_button", "Edit","span");
    createActionButtons(action_div,"button", "delete_button", "Delete","span");
    createActionButtons(action_div,"span", "user_profile", "You - Few seconds ago","div");
    /* Prepend or append new message or comment. */
    (container_list === "message_list") ? container.prepend(container_list_div) :  container.appendChild(container_list_div);
}

/* add the new message in the lists */
function createMessage(){
    document.getElementById("create_post_modal").style.display = "none";
    document.getElementById("empty_post").style.display = "none";
    /* Create template for message list. */
    containerTemplate("message_container", "message_list", create_post_textarea.value, total_messages_list_int);
    create_post_textarea.value = "";
    total_messages_list_int++;
    document.getElementById("total_messages").innerHTML = total_messages_list_int;
};

/* add the new comment for mesage in the lists */
function createComment(message_id){
    let comment_textarea = document.getElementById("comment_textarea").value;
    containerTemplate(message_id, "comment_list", comment_textarea, comment_id_list_int);
    document.getElementById("comment_textarea").value = ""; 
    comment_id_list_int++;
};

/* show modal for deleting message or comment. */
function showDeleteModal(message_id) {
    let post_type = document.getElementById(message_id);
    content = post_type.id;
    let modal_for = "Message";
    if (post_type.className === "comment_list") {
        modal_for = "Comment"; 
    }
    let action_modal = document.getElementById("action_modal");
    document.getElementById("action_form_input").value = modal_for;
    document.getElementById("modal_body_title").innerHTML = "Confirm Delete "+modal_for;
    document.getElementById("modal_body_description").innerHTML = "Are you sure you want to remove this "+modal_for.toLowerCase()+" ? This action cannot be undone.";
    action_modal.style.display = "block"; 
}

/* create action button for the content such as message or comment*/
function createActionButtons(action_message, element, element_class, element_text, element_icon){
    let buttons = document.createElement(element);
    buttons.className = element_class;
    buttons.textContent = element_text;
    let icon = document.createElement(element_icon);
    buttons.prepend(icon);
    action_message.appendChild(buttons);
}

/* show edit form message. */
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

/* hide edit form message. */
function closeEditForm(id_message, update_form_id){
    let message_list = document.getElementById(id_message);
    message_list.children[1].style.display = "block";
    message_list.children[2].style.display = "flex"; 
    document.getElementById(update_form_id).remove();
}

/*show comment form */
function toggleCommentForm(id_message) {
    let message_list = document.getElementById(id_message);
    let comment = document.createElement("form");
    comment.id = "post_comment_form";
    let textarea = document.createElement("textarea");
    textarea.id = "comment_textarea";
    comment.appendChild(textarea);
    let button = document.createElement("button");
    button.type = "submit";
    button.id = "post_comment_btn";
    button.textContent = "Post Comment"; 
    comment.appendChild(button);
    message_list.appendChild(comment);
}

/* create edit form buttons for updating content*/
function createEditFormButtons(edit_form, button_type, button_id, button_text) {
    let update_button = document.createElement("button");
    update_button.type = button_type;
    update_button.id = button_id;
    update_button.textContent = button_text;
    edit_form.appendChild(update_button);
}

function toggleEditForm(content_id) {
    let content = document.getElementById(content_id);
    let button_text = "Update Message"
    content.children[0].style.display = "none";
    content.children[1].style.display = "none";    
    let edit_form = document.createElement("form");
    edit_form.id = "edit_message_form";
    let textarea = document.createElement("textarea");
    edit_form.appendChild(textarea);
    if (content.className === "comment_list") {
        button_text = "Update Comment";  
    }
    createEditFormButtons(edit_form, "submit", "post_updated_message_btn", button_text);
    createEditFormButtons(edit_form, "button", "cancel_updating_message_btn", "Cancel");
    content.prepend(edit_form); 
}

function updateContent(id_message, form_id, updated_content) {
    closeEditForm(id_message, form_id);
    document.getElementById(id_message).children[0].textContent = updated_content;  
}

function deleteContent(content){
    let action_form_input = document.getElementById("action_form_input").value;
    document.getElementById("action_modal").style.display = "none";
    if (action_form_input === "Message") {
        document.getElementById(content).remove(); 
        total_messages_list_int--;
        document.getElementById("total_messages").innerHTML = total_messages_list_int; 
    } else {
        document.getElementById(content).remove(); 
    }
}

/* triggers create message modal */
document.getElementById("create_message_modal_button").addEventListener('click', function () {
    document.getElementById("create_post_modal").style.display = "block";
    checkTextareaEmpty();
});

/* detect if textarea if empty in keyup */
document.getElementById("create_post_textarea").addEventListener('keyup', function () {
    checkTextareaEmpty();
    console.log();
});

/* triggers cancel in create message modal */
document.getElementById("cancel_post_message_btn").addEventListener('click', function () {
    create_post_textarea.value = "";
    document.getElementById("create_post_modal").style.display = "none";
});

window.addEventListener('click', function (event) {
    let create_post_modal = document.getElementById("create_post_modal");
    if (event.target === create_post_modal) {
        create_post_modal.style.display = "none";
    }
});

document.getElementById("cancel_remove_btn").addEventListener('click', function () {
    document.getElementById("action_modal").style.display = "none";
});

window.addEventListener('click', function (event) {
    let action_modal = document.getElementById("action_modal");
    if (event.target === action_modal) {
        action_modal.style.display = "none";
    }
});

document.addEventListener("click", function(event) {
    let clicked_by = event.target;
    if (clicked_by.className === "comment_button") {
        message_id = event.target.closest('div[id]').id;
        toggleCommentForm(message_id);
    }
    else if (clicked_by.className === "edit_button") {
        let content_id = event.target.closest('div[id]').id;
        toggleEditForm(content_id);
    }
    else if (clicked_by.className === "delete_button") {
        message_id = event.target.closest('div[id]').id;
        showDeleteModal(message_id);
    }
    else if (clicked_by.id === "cancel_updating_message_btn") {
        message_id = event.target.closest('div[id]').id;
        let form_id = event.target.closest('form[id]').id;
        closeEditForm(message_id, form_id); 
    }
    else if (clicked_by.className === "close_modal") {
        let modal_id = event.target.closest('div[id]').id;
        document.getElementById(modal_id).style.display = "none";
    }
});

document.addEventListener("submit", function (event) {
    let form_id = event.target.id;
    console.log(form_id);
    if(form_id === "create_message_form"){
        createMessage();
    }
    else if(form_id === "post_comment_form"){
        let message = event.target.closest('div[id]').id;
        createComment(message); 
    }
    else if(form_id === "edit_message_form"){
        let message = event.target.closest('div[id]').id;
        let updated_content = document.getElementById(form_id).firstChild.value;
        updateContent(message, form_id, updated_content);
    }else if(form_id === "action_form"){
        deleteContent(content);
    }
    event.preventDefault();
});
