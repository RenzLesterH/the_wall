let create_post_textarea = document.getElementById("create_post_textarea");
let prev_content = "";

document.getElementById("create_message_modal_button").addEventListener("click", showCreateMessageModal); 

document.getElementById("cancel_post_message_btn").addEventListener("click", hideModal);

document.querySelectorAll('.cancel_remove_btn').forEach((button) => { button.addEventListener('click', hideModal); });

document.querySelectorAll('.close_modal').forEach((button) => { button.addEventListener('click', hideModal); });

document.getElementById("create_message_form").addEventListener("submit", createMessage);
 
document.getElementById("delete_message_form").addEventListener("submit", deleteMessage);

document.getElementById("delete_comment_modal").addEventListener("submit", deleteComment);

document.getElementById("create_post_textarea").addEventListener("keyup", checkTextareaEmpty);

/** This function will dislay the selected element. */
function showElement(element_to_show){
    element_to_show.classList.remove("hide_element");
    element_to_show.classList.add("show_element"); 
}

/** This function will hide the selected element. */
function hideElement(element_to_hide){
    element_to_hide.classList.remove("show_element");
    element_to_hide.classList.add("hide_element"); 
}

/** This function will dislay the modal for creating message. */
function showCreateMessageModal(){
    let create_message_modal = document.getElementById("create_post_modal");
    create_message_modal.classList.remove("hide_element");
    create_message_modal.classList.add("show_element_flex");
    document.querySelector("#create_message_form #post_message_btn").setAttribute("disabled", true);
    document.querySelector("#create_message_form #post_message_btn").classList.add("disable_button");
}

/** This function will hide the modal after clicking cancel button. */
function hideModal(event){
    create_post_textarea.value = "";
    let modal = event.target.closest('div[id]');
    let modal_to_close = document.getElementById(modal.id);
    modal_to_close.classList.remove("show_element_flex"); 
    hideElement(modal_to_close); 
}

/** This function will validate if textareas is empty. */
function checkTextareaEmpty() {
    let form_id            = event.target.closest('form').id;
    let form_textarea      = document.querySelector("#"+form_id+" textarea");
    let form_submit_button = document.querySelector("#"+form_id+" button[type=submit]");    

    /** This will check if textarea in form is empty and if true it will disable the button. */
    if(form_textarea.value === ""){
        form_submit_button.setAttribute("disabled", true);
        form_submit_button.classList.add("disable_button");
    }
    else{
        form_submit_button.removeAttribute("disabled");
        form_submit_button.classList.remove("disable_button");
    }
}

/** This funtion will create and prepend the newly created message. */
function createMessage(event) {
    event.preventDefault(); 
    let create_post_modal      = document.getElementById("create_post_modal");
    let clone_message          = document.querySelector("#sample_message");
    let cloned_message         = clone_message.cloneNode(true); 
    let message_id             = "message_item"+document.querySelectorAll(".message_item").length;

    /** This functions will hide modal, empty post and temporary show the element to be cloned. */
    create_post_modal.classList.remove("show_element_flex");
    hideElement(create_post_modal);
    hideElement(document.getElementById("empty_post")); 
    showElement(clone_message); 

    /** This will remove id, add class name, data-attribite and message content on the cloned element. */
    cloned_message.removeAttribute('id');
    cloned_message.className = "message_item"; 
    cloned_message.setAttribute('data-id', message_id);
    document.getElementById("message_container_list").prepend(cloned_message);
    document.querySelector("[data-id ="+message_id+"]"+" .content_message").textContent = create_post_textarea.value; 

    /** This will hide the cloned element, reset the textarea for creating message and will count the total message items. */
    hideElement(clone_message);
    create_post_textarea.value = "";
    document.querySelector("#total_messages").innerHTML = document.querySelectorAll(".message_item").length;

    /** This will add event listener to class comment_button on the message list. */ 
    cloned_message.getElementsByClassName("comment_button")[0].addEventListener("click", toggleCommentForm);
    
    /** This will add event listener to class edit_button on the message list. */  
    cloned_message.getElementsByClassName("edit_button")[0].addEventListener("click", toggleEditMessageForm);

    /** This will add event listener to class delete_button on the message list. */
    cloned_message.getElementsByClassName("delete_button")[0].addEventListener("click", showDeleteMessageModal); 
}

/** This funtion will create and prepend the newly created comments of the messages. */
function createComment(event){
    event.preventDefault();
    showElement(document.querySelector("#sample_comment"));
    let message_id             = event.target.closest('li[class=message_item]').dataset.id;
    let comment_textarea       = document.querySelector("[data-id ="+message_id+"]"+" textarea"); 
    let cloned_comment         = document.querySelector("#sample_coment_item").cloneNode(true);
    let total_comment_item     = "comment_item"+document.querySelector("[data-id ="+message_id+"] .comment_count").textContent;

    /** This will remove id, add class name, data-attribite, comment content on the cloned element and prepend it in the comment_container_list. */
    cloned_comment.removeAttribute("id");
    cloned_comment.className = "comment_item";
    cloned_comment.setAttribute('data-comment-id', total_comment_item);
    document.querySelector("[data-id ="+message_id+"] .comment_container_list").prepend(cloned_comment);
    let content_comment = document.querySelector("[data-id = "+message_id+"]"+" [data-comment-id = "+total_comment_item+"]  p");
    content_comment.innerHTML = comment_textarea.value; 
    
    /** This will reset the textarea for creating comment, update the total list of comments and add the class has_comment. */ 
    comment_textarea.value = ""; 
    checkTextareaEmpty();
    let updated_total_comment_item = document.querySelectorAll("[data-id = "+message_id+"]"+" .comment_item").length;
    document.querySelector("[data-id ="+message_id+"] .comment_count").innerHTML = updated_total_comment_item;
    checkIfHasComment(message_id);
    hideElement(document.querySelector("#sample_comment")); 

    /** This will add event listener to class edit_button on the comment_list. */ 
    document.getElementsByClassName("edit_comment")[0].addEventListener("click", toggleEditCommentForm); 

    /** This will add event listener to class delete_button on the comment_list. */
    document.getElementsByClassName("delete_comment")[0].addEventListener("click", showDeleteCommentModal); 
}

/** This funtion will toggle the comment form from message. */
function toggleCommentForm(event){
    let message_id          = event.target.closest('li[class=message_item]').dataset.id;
    let form_comment_exists = document.getElementById(message_id+"_comment");

    /** This will check if comment form has been already displayed in the message. */
    if (form_comment_exists === null) {
        let message_item          = document.querySelector("[data-id ="+message_id+"]");
        let comment_form          = document.getElementById("sample_comment_form");
        let create_comment_form   = comment_form.cloneNode(true);
        let prepend_to            = document.querySelector("[data-id ="+message_id+"]"+" .comment_container_list");
        showElement(comment_form);  

        /** This will add class name and id to cloned comment form and prepend it below the message. */
        create_comment_form.className = "post_comment_form"; 
        create_comment_form.id        = message_id+"_comment";        
        message_item.insertBefore(create_comment_form, prepend_to);

        /** This will disable the submit button in comment form. */
        document.querySelector("#"+message_id+"_comment button[type=submit]").setAttribute("disabled", true);
        document.querySelector("#"+message_id+"_comment button[type=submit]").classList.add("disable_button");
        hideElement(comment_form);

        /** This will add event listener to class post_comment_form on the submitting the comment form. */
        document.getElementsByClassName("post_comment_form")[0].addEventListener("submit", createComment);

        /** This will add event listener to comment form textarea. */
        document.getElementsByClassName("comment_textarea")[0].addEventListener("keyup", checkTextareaEmpty);
    }
}

/** This funtion will display the edit form in messages. */
function toggleEditMessageForm(event){
    let messade_id               = event.target.closest('li[class=message_item]').dataset.id;
    let edit_message_form        = document.getElementById("edit_message_form");
    let sample_edit_message_form = document.getElementById("sample_edit_message_form");

    /** This will check if edit form has been already displayed in the message.*/ 
    if (edit_message_form === null) {
        showElement(sample_edit_message_form);
        let cloned_edit_message_form = sample_edit_message_form.cloneNode(true);
        let message_content          = document.querySelector("[data-id = "+messade_id+"]"+" .content_message");
        prev_content                 = message_content.textContent;

        /** This will hide action list, add ID for the form, add text content on textarea and replace message content with a cloned form for editing a message.*/   
        message_content.replaceWith(cloned_edit_message_form);
        hideElement(document.querySelector("[data-id = "+messade_id+"]"+" .action_list"));
        cloned_edit_message_form.id = "edit_message_form";
        let textarea                = document.querySelector("[data-id = "+messade_id+"]"+" textarea");
        textarea.value              = message_content.textContent;
        hideElement(sample_edit_message_form);
        
        /** This will add event listener to class cancel_updating_button. */
        document.getElementsByClassName("cancel_updating_button")[0].addEventListener("click", closeEditMessageForm);  
        
        /** This will add event listener to class edit_form on submitting the edit form. */ 
        document.getElementById("edit_message_form").addEventListener("submit", updateMessage);  
    }
}

/** This funtion will display the edit form in comment. */
function toggleEditCommentForm(event){
    let comment_id               = event.target.closest('li[class=comment_item]');
    let messade_id               = comment_id.closest('li[class=message_item]').dataset.id;
    let edit_comment_form        = document.getElementById("edit_comment_form");
    let sample_edit_comment_form = document.getElementById("sample_edit_comment_form"); 

    /** This will check if edit form has been already displayed in the comment.*/ 
    if (edit_comment_form === null) {
        showElement(sample_edit_comment_form);
        let cloned_edit_comment_form = sample_edit_comment_form.cloneNode(true);
        let comment_content          = document.querySelector("[data-id = "+messade_id+"] [data-comment-id = "+comment_id.dataset.commentId+"] .content_comment");
        prev_content                 = comment_content.textContent;

        /** This will hide action list, add ID for the form, add text content on textarea and replace comment content with a cloned form for editing the comment.*/  
        comment_content.replaceWith(cloned_edit_comment_form);
        hideElement(document.querySelector("[data-id = "+messade_id+"] [data-comment-id = "+comment_id.dataset.commentId+"] .action_list")); 
        cloned_edit_comment_form.id = "edit_comment_form";
        let textarea                = document.querySelector("[data-id = "+messade_id+"] [data-comment-id = "+comment_id.dataset.commentId+"] textarea");
        textarea.value              = comment_content.textContent;
        hideElement(sample_edit_comment_form);
        
        /** This will add event listener to class cancel_updating_button. */
        document.getElementsByClassName("cancel_updating_button")[0].addEventListener("click", closeEditCommentForm);  
        
        /** This will add event listener to class edit_comment_form on submitting the edit form. */ 
        document.getElementById("edit_comment_form").addEventListener("submit", updateComment);  
    }
}

/** This funtion will hide the edit form in messages. */ 
function closeEditMessageForm(event){
    let message_id              = event.target.closest('li').dataset.id;
    let edit_message_form       = document.querySelector("#"+event.target.closest('form[id]').id);
    const content_message       = document.createElement("p");
    content_message.className   = "content content_message";
    content_message.textContent = prev_content;
    edit_message_form.replaceWith(content_message);
    document.querySelector("[data-id = "+message_id+"]"+" .action_list").classList.remove("hide_element");  
}

/** This funtion will hide the edit form in comment. */ 
function closeEditCommentForm(event){
    let comment_id              = event.target.closest('li[class=comment_item]');
    let message_id              = comment_id.closest('li[class=message_item]').dataset.id;
    let edit_comment_form       = document.querySelector("#"+event.target.closest('form[id]').id);
    const content_comment       = document.createElement("p");
    content_comment.className   = "content content_comment";
    content_comment.textContent = prev_content;
    edit_comment_form.replaceWith(content_comment);
    document.querySelector("[data-id = "+message_id+"] [data-comment-id = "+comment_id.dataset.commentId+"] .action_list").classList.remove("hide_element");  
}

/** This funtion will display the modal for deleting messages */
function showDeleteMessageModal(event){
    let message_id = event.target.closest('li[class=message_item]').dataset.id;
    document.getElementById("delete_message_input").value = message_id;
    document.getElementById("delete_message_modal").classList.add("show_element_flex");
}

/** This funtion will display the modal for deleting comments. */
function showDeleteCommentModal(event){
    let comment_id = event.target.closest('li[class=comment_item]').dataset.commentId;
    document.getElementById("delete_comment_input").value = comment_id; 
    document.getElementById("delete_comment_modal").classList.add("show_element_flex"); 
}

/** This funtion will update the total list of comments on a message. */
function checkIfHasComment(message_id){
    let total_comment = document.querySelector("[data-id = "+message_id+"]"+" .comment_button");
    let total         = document.querySelectorAll("[data-id = "+message_id+"]"+" .comment_item");
    
    /** This will check if the total comment list of a message is zero or not and it will add or remove class base on condition. */ 
    if (total.length > 0) {
        total_comment.classList.add("has_comment");
    } 
    else if (total.length === 0) {
        total_comment.classList.remove("has_comment");      
    }
}

/** This funtion will update the content of a certain message. */
function updateMessage(event) {
    event.preventDefault();  
    let message_id      = event.target.closest('li').dataset.id;
    let updated_message = document.querySelector("[data-id = "+message_id+"]"+" #edit_message_form textarea"); 
    closeEditMessageForm(event);
    document.querySelector("[data-id = "+message_id+"]"+" .content_message").textContent = updated_message.value;
}

/** This funtion will update the content of a certain comment. */ 
function updateComment(event) {
    event.preventDefault();
    let comment_id      = event.target.closest('li[class=comment_item]');
    let message_id      = comment_id.closest('li[class=message_item]').dataset.id;
    let updated_comment = document.querySelector("[data-id = "+message_id+"]"+" #edit_comment_form textarea");
    closeEditCommentForm(event);
    document.querySelector("[data-id = "+message_id+"] [data-comment-id = "+comment_id.dataset.commentId+"] .content_comment").textContent = updated_comment.value;
}

/** This funtion will delete a certain messages. */ 
function deleteMessage(event) {
    event.preventDefault();

    /** This variables will identify which message item will be deleted */
    let delete_message_input = document.getElementById("delete_message_input").value;
    document.querySelector("[data-id = "+delete_message_input+"]").remove();

    /** This will count the updated total list of message items. */
    let updated_total_message_item = document.querySelectorAll(".message_item").length;
    document.querySelector("#total_messages").innerHTML = updated_total_message_item;

    /** This will check if total message item is zero and if true it wil show the empty post container. */
    if(updated_total_message_item === 0){ 
        showElement(empty_post); 
    }

    /** This will hide the delete message modal. */ 
    let delete_message_modal = document.getElementById("delete_message_modal");
    delete_message_modal.classList.remove('show_element_flex'); 
    hideElement(delete_message_modal);
}

/** This funtion will delete a certain comment of a message. */ 
function deleteComment(event) {
    event.preventDefault();

    /** This variables will identify which comment item of message will be deleted */
    let delete_comment_input = document.getElementById("delete_comment_input").value;
    let comment_id           = document.querySelector("[data-comment-id = "+delete_comment_input+"]");
    let message_id           = comment_id.closest('li[class=message_item]').dataset.id;
    document.querySelector("[data-id = "+message_id+"] [data-comment-id = "+delete_comment_input+"]").remove();

    /** This will count the updated total list of comment items in a message. */
    let updated_comment_list = document.querySelectorAll("[data-id = "+message_id+"]"+" .comment_item").length;
    document.querySelector("[data-id = "+message_id+"]"+" .comment_count").innerHTML = updated_comment_list;
    checkIfHasComment(message_id);
    
    /** This will hide the delete comment modal. */ 
    let delete_comment_modal = document.getElementById("delete_comment_modal");
    delete_comment_modal.classList.remove('show_element_flex'); 
    hideElement(delete_comment_modal); 
}