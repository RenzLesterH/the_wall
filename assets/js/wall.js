
let create_post_textarea = document.getElementById("create_post_textarea");
let total_message_list = document.getElementById("total_messages").textContent;
let total_message_list_count = parseInt(total_message_list);
let comment_id_list_count = 0;
let message_id = 0;
let content = "";

function checkTextareaEmpty(textarea, button) {
    let button_submit = document.getElementById(button);
    if(textarea.value === ""){
        button_submit.setAttribute("disabled", true);
        button_submit.classList.add("disable_button");
    }
    else{
        button_submit.removeAttribute("disabled");
        button_submit.classList.remove("disable_button");
    }
}

function createMessage() {
    let textarea_value = create_post_textarea.value;
    document.getElementById("create_post_modal").style.display = "none";
    document.getElementById("empty_post").style.display = "none";
    generateTemplate("message_container", "message_list", textarea_value, total_message_list_count);
    create_post_textarea.value = "";
    total_message_list_count++;
    document.getElementById("total_messages").innerHTML = total_message_list_count; 
}

function createComment(message_id){
    updateTotalComments(message_id, "add");
    let comment_textarea = document.getElementById("comment_textarea");
    generateTemplate(message_id, "comment_list", comment_textarea.value, comment_id_list_count);
    comment_textarea.value = "";
    checkTextareaEmpty(comment_textarea, "post_comment_btn");
    comment_id_list_count++; 
}

function generateTemplate(container_type, container_list, content_value, content_number) {
    let container = document.getElementById(container_type);
    let div_container = document.createElement("div");
    div_container.className = container_list;
    div_container.id = container_list+content_number;
    let content = document.createElement("p");
    div_container.appendChild(content);
    content.textContent = content_value;
    let div_action = document.createElement("div");
    div_action.className = "action_message";
    div_container.appendChild(div_action);
    if (container_list === "message_list") {
        createActionButtons(div_action, "button", "comment_button", "0 comment", "span");
    }
    createActionButtons(div_action, "button", "edit_button", "Edit", "span");
    createActionButtons(div_action, "button", "delete_button", "Delete", "span");
    createActionButtons(div_action, "span", "user_profile", "You - Few seconds ago", "div"); 
    (container_list === "message_list") ? container.prepend(div_container) : container.insertBefore(div_container, container.children[3]);
}

function createActionButtons(action_message, element, element_class, element_text, element_icon){
    let buttons = document.createElement(element);
    buttons.className = element_class;
    buttons.textContent = element_text;
    let icon = document.createElement(element_icon); 
    buttons.prepend(icon);
    action_message.appendChild(buttons);  
}

function toggleCommentForm(id_message){
    let form_comment_visible = document.getElementById("post_comment_form");
    if (form_comment_visible === null) {
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
        message_list.insertBefore(comment, message_list.children[2]);
        let comment_textarea = document.getElementById("comment_textarea");
        checkTextareaEmpty(comment_textarea,"post_comment_btn");
        toggleAllComments(id_message, "visible", "block");
    }
    else{
        form_comment_visible.remove();
        toggleAllComments(id_message, "hidden", "none");
    }
}

function toggleAllComments(id_message, visibility_type, display_type){
    if (visibility_type === "hidden" && display_type === "none") {
        let comments = document.getElementsByClassName("comment_list");
        for (let i = 0; i < comments.length; i++) {
            comments[i].style.visibility = visibility_type;
            comments[i].style.display = display_type;     
        }
    } 
    else {
        let comments =  document.getElementById(id_message);
        for (let i = 0; i < comments.childNodes.length; i++) {
            if (comments.childNodes[i].className === "comment_list") {
                comments.childNodes[i].style.visibility = visibility_type;
                comments.childNodes[i].style.display = display_type;
            }
        }
    }

}

function toggleEditForm(content_id){
    let content = document.getElementById(content_id);
    let button_text = "Update Message";
    content.children[0].style.display = "none";
    content.children[1].style.display = "none";
    let edit_form = document.createElement("form");
    edit_form.id = "edit_message_form";
    let textarea = document.createElement("textarea");
    edit_form.appendChild(textarea);
    if(content.className === "comment_list"){
        button_text = "Update Comment";
    }
    createEditFormButtons(edit_form, "submit", "post_updated_button", button_text);
    createEditFormButtons(edit_form, "button", "cancel_updating_button", "Cancel");
    content.prepend(edit_form);
}

function createEditFormButtons(edit_form, button_type, button_id, button_text){
    let update_button = document.createElement("button");
    update_button.type = button_type;
    update_button.id = button_id;
    update_button.textContent = button_text;
    edit_form.appendChild(update_button);
}

function closeEditForm(id_message, form_id){
    let message_list =document.getElementById(id_message);
    message_list.children[1].style.display = "block";
    message_list.children[2].style.display = "flex";
    document.getElementById(form_id).remove();
}

function showDeleteModal(content_id){
    let post_type = document.getElementById(content_id);
    content = post_type.id;
    let modal_for = "Message";
    if (post_type.className === "comment_list") {
        modal_for = "Comment";
    }
    let action_modal = document.getElementById("action_modal");
    document.getElementById("action_form_input").value = modal_for;
    document.getElementById("modal_body_title").innerHTML = "Confirm Delete "+modal_for;
    document.getElementById("modal_body_description").innerHTML = "Are you sure you want to remove this "+modal_for.toLowerCase()+" ? This action cannot be undone.";
    action_modal.style.display = "flex"; 
}

function updateTotalComments(message_id, operation){
    let total_comment = document.getElementById(message_id).childNodes[1];
    let total_comment_text = total_comment.childNodes[0].textContent;
    let total_comment_count = parseInt(total_comment_text.charAt(0));
    if (operation === "add") {
        total_comment_count++;
        total_comment.childNodes[0].className = "has_comment comment_button";
    } 
    else {
        total_comment_count--;
        if (total_comment_count === 0) {
            total_comment.childNodes[0].className = "comment_button";
        }    
    }
    total_comment.childNodes[0].textContent = total_comment_count+" Comment";
    let icon = document.createElement("span");
    total_comment.childNodes[0].prepend(icon); 
}

function updateContent(id_message, form_id, updated_content) {
    closeEditForm(id_message, form_id);
    document.getElementById(id_message).children[0].textContent = updated_content; 
}

function deleteContent(content, message) {
    let action_form_input = document.getElementById("action_form_input").value;
    document.getElementById("action_modal").style.display = "none";
    if (action_form_input === "Message") {
        document.getElementById(content).remove(); 
        total_message_list_count--;
        if(total_message_list_count === 0){
            document.getElementById("empty_post").style.display = "block";
        }
        document.getElementById("total_messages").innerHTML = total_message_list_count; 
    }
    else{
        updateTotalComments(message, "minus");
        document.getElementById(content).remove();
    }
}

document.getElementById("create_message_modal_button").addEventListener("click", function () {
    document.getElementById("create_post_modal").style.display = "flex"; 
    checkTextareaEmpty(create_post_textarea,"post_message_btn");
});

document.getElementById("cancel_post_message_btn").addEventListener("click", function () {
    create_post_textarea.value = "";
    document.getElementById("create_post_modal").style.display = "none";
});

document.getElementById("cancel_remove_btn").addEventListener("click", function () {
    document.getElementById("action_modal").style.display = "none";
});

window.addEventListener("click", function (event) {
    let create_post_modal = document.getElementById("create_post_modal");
    let action_modal = document.getElementById("action_modal");
    if (event.target === create_post_modal) {
        create_post_modal.style.display = "none";
    }else if(event.target === action_modal){
        action_modal.style.display = "none";
    }
});

document.addEventListener("keyup", function (event) {
    let textarea = event.target.id;
    if (textarea === "create_post_textarea") {
        checkTextareaEmpty(create_post_textarea,"post_message_btn");
    }
    else if(textarea === "comment_textarea"){
        let comment_textarea = document.getElementById("comment_textarea");
        checkTextareaEmpty(comment_textarea, "post_comment_btn");
    }
    event.preventDefault();
});

document.addEventListener("submit", function (event) {
    let form = event.target.id;
    if (form === "create_message_form") {
        createMessage();
    }
    else if(form === "post_comment_form"){
         let message = event.target.closest('div[id]').id;
         createComment(message);
    }
    else if(form === "edit_message_form"){
        let message = event.target.closest('div[id]').id;
        let updated_content = document.getElementById(form).firstChild.value;
        updateContent(message, form, updated_content); 
    }
    else if(form === "action_form"){
        deleteContent(content, message_id);
    }
    event.preventDefault();
});

document.addEventListener("click", function (event) {
    let clicked_by = event.target;
    if (clicked_by.className === "comment_button" || clicked_by.className === "has_comment comment_button") {
        message_id = event.target.closest('div[id]').id;
        toggleCommentForm(message_id);
    }
    else if(clicked_by.className === "edit_button"){
        let content_id = event.target.closest('div[id]').id;
        toggleEditForm(content_id);
    }
    else if(clicked_by.className === "delete_button"){
        let content_id = event.target.closest('div[id]').id;
        showDeleteModal(content_id);
    }
    else if(clicked_by.id === "cancel_updating_button"){
        message_id = event.target.closest('div[id]').id;
        let form_id = event.target.closest('form[id]').id;
        closeEditForm(message_id, form_id);
    }
    else if(clicked_by.className === "close_modal"){
        let modal_id = event.target.closest('div[id]').id;
        document.getElementById(modal_id).style.display = "none";
    }
});