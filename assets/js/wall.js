
let create_post_textarea = document.getElementById("create_post_textarea");
let sample_message = document.getElementById("sample_message");
let total_message_list_count = 0;
let comment_id_list_count = 0;
let message_id = 0;
let content = "";

document.querySelector("#create_message_modal_button").addEventListener("click", function (event) {
    let create_message_modal = document.getElementById("create_post_modal");
    create_message_modal.classList.remove("hide_element");
    create_message_modal.classList.add("show_element_flex"); 
    checkTextareaEmpty("#create_post_textarea", "#create_message_form #post_message_btn");
}); 

document.querySelector("#cancel_post_message_btn").addEventListener("click", function () {
    create_post_textarea.value = "";
    let create_message_modal = document.getElementById("create_post_modal");
    create_message_modal.classList.remove("show_element_flex"); 
    hideElement(create_message_modal);
});

document.querySelector("#cancel_remove_btn").addEventListener("click", function () {
    let action_modal=  document.getElementById("action_modal");
    action_modal.classList.remove("show_element_flex"); 
    hideElement(action_modal); 
});

document.querySelectorAll('.close_modal').forEach((button) => {
    button.addEventListener('click', (event) => {
        create_post_textarea.value = "";
        let modal_id = event.target.closest('div[id]').id;
        let create_post_modal = document.getElementById(modal_id);
        create_post_modal.classList.remove("show_element_flex");
        hideElement(create_post_modal);
    });
});

window.addEventListener("click", function (event) {
    let create_post_modal = document.getElementById("create_post_modal");
    let action_modal = document.getElementById("action_modal");
    if (event.target === create_post_modal) {
        create_post_textarea.value = "";
        create_post_modal.classList.remove("show_element_flex");
        hideElement(create_post_modal); 
    }
    else if(event.target === action_modal){
        hideElement(action_modal);
    }
});

document.querySelector("#create_message_form").addEventListener("submit", function (event) {
    createMessage();
    enableActionButtons();
    event.preventDefault();
});

document.querySelector("#create_post_textarea").addEventListener("keyup", function () {
    checkTextareaEmpty("#create_post_textarea", "#create_message_form #post_message_btn");
});

// document.addEventListener("keyup", function (event) {
//     let textarea = event.target.id;
//     if(textarea === "comment_textarea"){
//         let message_list_id = event.target.closest('div[id]').id;
//         let form = "#"+message_list_id+" #"+message_list_id+"_comment";
//         checkTextareaEmpty(form+" #comment_textarea", form+" .post_comment_btn"); 
//     }
//     event.preventDefault();
// });

// document.addEventListener("submit", function (event) {
//     let form = event.target;
//     if(form.className === "post_comment_form"){
//          let message = event.target.closest('div[id]').id;
//          createComment(message);
//     }
//     else if(form.className === "edit_form"){
//         let message = event.target.closest('div[id]').id;
//         updateContent(message, form.id); 
//     }
//     event.preventDefault();
// });

function enableActionButtons(){
 
    document.querySelectorAll('.comment_button').forEach((comment_button) => {
        comment_button.addEventListener("click", (event) => {
            message_id = event.target.closest('div[id]').id;
            toggleCommentForm(message_id);
            triggerActionButton();
        });
    });

    document.querySelectorAll('.edit_button').forEach((edit_button) => {
        edit_button.addEventListener("click", (event) => {
            let content_id = event.target.closest('div[id]').id;
            let message_content = document.querySelector("#"+content_id+" p"); 
            toggleEditForm(content_id, message_content.textContent);
            triggerActionButton();
        });
    });

    document.querySelectorAll('.delete_button').forEach((delete_button) => {
        delete_button.addEventListener("click", (event) => {
            let content_id = event.target.closest('div[id]').id;
             showDeleteModal(content_id);
        });
    });

    document.querySelector("#action_form").addEventListener("submit", function (event) {
        deleteContent(content, message_id);
        event.preventDefault(); 
    });  
}

function triggerActionButton(){

    document.querySelector("#comment_textarea").addEventListener("keyup", function (event) {
        let message_list_id = event.target.closest('div[id]').id;
        let form = "#"+message_list_id+" #"+message_list_id+"_comment";
        checkTextareaEmpty(form+" #comment_textarea", form+" .post_comment_btn");  
    });

    document.querySelectorAll('.post_comment_form').forEach((post_comment_form) => {
        post_comment_form.addEventListener("submit", (event) => {
            let message = event.target.closest('div[id]').id;
            createComment(message);
            // enableActionButtons();
            event.preventDefault();
        });
    });

    document.querySelectorAll('.edit_form').forEach((edit_form) => {
        edit_form.addEventListener("submit", (event) => {
            let message = event.target.closest('div[id]').id;
            updateContent(message, event.target.id);
            // enableActionButtons(); 
            event.preventDefault();
        });
    });

    document.querySelectorAll('.cancel_updating_button').forEach((cancel_updating_button) => {
        cancel_updating_button.addEventListener("click", (event) => {
            message_id = event.target.closest('div[id]').id;
            let form_id = event.target.closest('form[id]').id;
            closeEditForm(message_id, form_id);
            // enableActionButtons(); 
        });
    });
}

function showElement(element_to_show){
    element_to_show.classList.remove("hide_element");
    element_to_show.classList.add("show_element"); 
}

function hideElement(element_to_hide){
    element_to_hide.classList.remove("show_element");
    element_to_hide.classList.add("hide_element"); 
}

function checkTextareaEmpty(textarea, button) {
    let form_textarea = document.querySelector(textarea);
    let form_submit_button = document.querySelector(button);
    if(form_textarea.value === ""){
        form_submit_button.setAttribute("disabled", true);
        form_submit_button.classList.add("disable_button");
    }
    else{
        form_submit_button.removeAttribute("disabled");
        form_submit_button.classList.remove("disable_button");
    }
}

function countPostList(post_list, total_list){
    const messages_list = document.querySelectorAll(post_list);
    total_message_list_count = messages_list.length; 
    document.querySelector(total_list).innerHTML = messages_list.length; 
}

function createMessage() {
    let textarea_value = create_post_textarea.value;
    let create_post_modal = document.getElementById("create_post_modal");
    let empty_post = document.getElementById("empty_post");
    create_post_modal.classList.remove("show_element_flex");
    hideElement(create_post_modal);
    hideElement(empty_post); 
    let container = document.getElementById("message_container");
    showElement(sample_message);
    let create_post = sample_message.cloneNode(true);
    create_post.className = "message_list"; 
    create_post.id = "message_list"+total_message_list_count; 
    create_post.childNodes[1].textContent = textarea_value;
    container.prepend(create_post);
    hideElement(sample_message);
    create_post_textarea.value = "";
    countPostList(".message_list", "#total_messages");
}

function createComment(message_id){
    let form = "#"+message_id+" #"+message_id+"_comment";
    let comment_textarea = document.querySelector(form+" #comment_textarea");
    let container = document.getElementById(message_id);
    showElement(sample_message);
    let create_post = sample_message.cloneNode(true);
    create_post.className = "comment_list"; 
    create_post.id = "comment_list"+comment_id_list_count;
    create_post.childNodes[1].textContent = comment_textarea.value;
    create_post.className = "comment_list";
    let comment_button = create_post.childNodes[3].childNodes[1];
    comment_button.remove();
    container.insertBefore(create_post, container.children[3]);
    updateTotalComments(message_id, "add");
    hideElement(sample_message);
    comment_textarea.value = "";
    checkTextareaEmpty(form+" #comment_textarea", form+" .post_comment_btn");  
    comment_id_list_count++; 
}

function toggleCommentForm(message_list_id){
    let form_comment_exists = document.getElementById(message_list_id+"_comment");
    if (form_comment_exists === null) {
        let message_list = document.getElementById(message_list_id);
        let comment_form = document.getElementById("sample_comment_form");
        showElement(comment_form);
        let create_comment_form = comment_form.cloneNode(true);
        create_comment_form.className = "post_comment_form";
        create_comment_form.id = message_list_id+"_comment";
        document.getElementById("message_container").prepend(create_comment_form);
        hideElement(comment_form); 
        message_list.insertBefore(create_comment_form, message_list.children[2]);
        let form = "#"+message_list_id+" #"+message_list_id+"_comment";
        let comment_textarea = form+" #comment_textarea";
        let comment_submit_button = form+" .post_comment_btn"; 
        checkTextareaEmpty(comment_textarea, comment_submit_button);
    }
}

function toggleEditForm(content_id, message_content){
    let content = document.getElementById(content_id);
    let text_content = document.querySelector("#"+content_id+" p");
    let action_buttons = document.querySelector("#"+content_id+" .action_message");
    hideElement(text_content);
    hideElement(action_buttons);
    let edit_form = document.getElementById("sample_edit_form");
    showElement(edit_form);
    let create_edit_form = edit_form.cloneNode(true);
    create_edit_form.id = "edit_message_form";
    let textarea = create_edit_form.childNodes[1];
    let submit_button = create_edit_form.childNodes[3];
    textarea.value = message_content;
    textarea.id = "textarea_message_edit"; 
    submit_button.textContent = "Update Message";
    if(content.className === "comment_list"){
        create_edit_form.id = "edit_comment_form";
        textarea.id = "textarea_comment_edit";
        submit_button.textContent = "Update Comment"; 
    }
    content.prepend(create_edit_form);
    hideElement(edit_form);
} 

function closeEditForm(id_message, form_id){
    let message_list =document.getElementById(id_message);
    let text_content = message_list.children[1];
    showElement(text_content);
    let action_button = message_list.children[2];
    action_button.classList.remove("show_element_flex");   
    action_button.classList.remove("hide_element");
    document.getElementById(form_id).remove();
}

function showDeleteModal(content_id){
    let post_type = document.getElementById(content_id); 
    content = post_type.id;
    let modal_for = "Message";
    if (post_type.className === "comment_list") {
        modal_for = "Comment";
        let comment = document.querySelector('#'+content_id);
        message_id = comment.closest('.message_list').id;
    }
    let action_modal = document.getElementById("action_modal");
    document.getElementById("action_form_input").value = modal_for;
    document.getElementById("modal_body_title").innerHTML = "Confirm Delete "+modal_for;
    document.getElementById("modal_body_description").innerHTML = "Are you sure you want to remove this "+modal_for.toLowerCase()+" ? This action cannot be undone."; 
    action_modal.classList.add("show_element_flex");
}

function updateTotalComments(message_id, operation){
    let total_comment = document.querySelector("#"+message_id+" .action_message .comment_button");
    let total = document.querySelectorAll("#"+message_id+" .comment_list"); 
    if (operation === "add") {
        total_comment.classList.add("has_comment");
    } 
    else {
        if (total.length === 0) {
            total_comment.classList.remove("has_comment");  
        }    
    }
    countPostList("#"+message_id+" .comment_list", "#"+message_id+" .action_message .comment_button .comment_count");
}

function updateContent(id_message, form_id) {
    let textarea = document.getElementById(form_id).children[0].id;
    let updated_content =  document.getElementById(textarea).value;
    closeEditForm(id_message, form_id);
    document.getElementById(id_message).children[0].textContent = updated_content;  
}

function deleteContent(content, message) {
    let action_form_input = document.getElementById("action_form_input").value;
    let action_modal = document.getElementById("action_modal");
    action_modal.classList.remove('show_element_flex');
    hideElement(action_modal);
    if (action_form_input === "Message") {
        document.getElementById(content).remove(); 
        countPostList(".message_list", "#total_messages");
        if(total_message_list_count === 0){
            showElement(empty_post);
        }
    } 
    else{
        document.getElementById(content).remove();
        updateTotalComments(message, "minus"); 
    }
}