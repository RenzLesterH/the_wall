let create_post_textarea = document.getElementById("create_post_textarea"); 
let message_id = 0;
let content = "";
let prev_content = "";

document.getElementById("create_message_modal_button").addEventListener("click", showCreateMessageModal); 

document.getElementById("cancel_post_message_btn").addEventListener("click", hideModal);

document.getElementById("cancel_remove_btn").addEventListener("click", hideModal);

document.querySelectorAll('.close_modal').forEach((button) => {
    button.addEventListener('click', hideModal);  
});

document.getElementById("create_message_form").addEventListener("submit", createMessage);
 
document.getElementById("action_form").addEventListener("submit", deleteContent); 

/** This will add event listener to creating of message form textarea. */ 
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
    let textarea_value    = create_post_textarea.value;
    let create_post_modal = document.getElementById("create_post_modal");
    let empty_post        = document.getElementById("empty_post");
    let container         = document.getElementById("message_container");
    let clone_message     = document.querySelector("#sample_message");
    let create_post       = clone_message.cloneNode(true); 
    let message_id        = "message_list"+document.querySelectorAll(".message_list").length;

    create_post_modal.classList.remove("show_element_flex");

    /** This functions will hide modal, empty post and temporary show the element to be cloned. */
    hideElement(create_post_modal);
    hideElement(empty_post); 
    showElement(clone_message);

    /** This will remove id, add class name, data-attribite and message content on the cloned element. */
    create_post.removeAttribute('id');
    create_post.className = "message_list";
    create_post.setAttribute('data-id', message_id);
    container.prepend(create_post);
    let message_content = document.querySelector("[data-id ="+message_id+"]"+" .content_message");
    message_content.textContent = textarea_value;

    /** This will hide the cloned element, reset the textarea for creating message and will count the total messages. */
    hideElement(clone_message); 
    create_post_textarea.value = "";
    document.querySelector("#total_messages").innerHTML = document.querySelectorAll(".message_list").length;

    /** This will add event listener to class comment_button on the message list. */ 
    create_post.querySelectorAll('.comment_button').forEach((comment) => {
        comment.addEventListener('click', toggleCommentForm); 
    });
    
    /** This will add event listener to class edit_button on the message list. */ 
    create_post.querySelectorAll('.edit_button').forEach((edit_content) => {
        edit_content.addEventListener('click', toggleEditForm);  
    });

    /** This will add event listener to class delete_button on the message list. */ 
    create_post.querySelectorAll('.delete_button').forEach((delete_content) => {
        delete_content.addEventListener('click', showDeleteModal);  
    });

}

/** This funtion will create and prepend the newly created comments of the messages. */
function createComment(event){
    event.preventDefault();
    let message_id            = event.target.closest('ul').dataset.id; 
    let form_textarea         = "#"+message_id+"_comment textarea"; 
    let comment_textarea      = document.querySelector("[data-id ="+message_id+"]"+" "+form_textarea); 
    let container             = document.querySelector("[data-id ="+message_id+"]");
    let clone_comment         = document.querySelector("#sample_comment");
    showElement(clone_comment);
    let create_clone_comment  = clone_comment.cloneNode(true);
    let comment_id            = "comment_list"+document.querySelectorAll("[data-id = "+message_id+"]"+" .comment_list").length;
    let comment_form          = document.querySelector("[data-id = "+message_id+"]"+" #"+message_id+"_comment");

    /** This will remove id, add class name, data-attribite, comment content on the cloned element and insert it after the comment form. */
    create_clone_comment.removeAttribute("id");
    create_clone_comment.className = "comment_list";
    create_clone_comment.setAttribute('data-id', comment_id);
    container.insertBefore(create_clone_comment, comment_form.nextSibling);  
    let comment_content = document.querySelector("[data-id = "+message_id+"]"+" [data-id = "+comment_id+"]"+" .content_comment"); 
    comment_content.innerHTML = comment_textarea.value; 
    
    /** This will reset the textarea for creating comment, hide the cloned element, update the total list of comments and add the class has_comment. */ 
    comment_textarea.value = ""; 
    checkTextareaEmpty(); 
    hideElement(clone_comment);
    let total_comment_list = document.querySelectorAll("[data-id = "+message_id+"]"+" .comment_list").length;
    document.querySelector("[data-id = "+message_id+"]"+" .comment_button .comment_count").innerHTML = total_comment_list;
    checkIfHasComment(message_id);

    /** This will add event listener to class comment_button on the comment_list. */ 
    create_clone_comment.querySelectorAll('.comment_button').forEach((comment) => {
        comment.addEventListener('click', toggleCommentForm); 
    });

    /** This will add event listener to class edit_button on the comment_list. */ 
    create_clone_comment.querySelectorAll('.edit_button').forEach((edit_content) => {
        edit_content.addEventListener('click', toggleEditForm);  
    });

    /** This will add event listener to class delete_button on the comment_list. */  
    create_clone_comment.querySelectorAll('.delete_button').forEach((delete_content) => {
        delete_content.addEventListener('click', showDeleteModal);  
    });

}

/** This funtion will toggle the comment form from message. */
function toggleCommentForm(event){
    let message_id          = event.target.closest('ul').dataset.id; 
    let form_comment_exists = document.getElementById(message_id+"_comment");

    /** This will check if comment form has been already displayed in the message. */
    if (form_comment_exists === null) {
        let message_list          = document.querySelector("[data-id ="+message_id+"]");
        let comment_form          = document.getElementById("sample_comment_form");
        let create_comment_form   = comment_form.cloneNode(true);
        let prepend_to            = document.querySelector("[data-id ="+message_id+"]"+" #sample_comment_form");
        showElement(comment_form);

        /** This will add class name and id to cloned comment form and prepend it below the message. */
        create_comment_form.className = "post_comment_form"; 
        create_comment_form.id        = message_id+"_comment";        
        message_list.insertBefore(create_comment_form, prepend_to);

        /** This will disable the submit button in comment form. */
        document.querySelector("#"+message_id+"_comment button[type=submit]").setAttribute("disabled", true);
        document.querySelector("#"+message_id+"_comment button[type=submit]").classList.add("disable_button");
        hideElement(comment_form);

        /** This will add event listener to class post_comment_form on the submitting the comment form. */ 
        document.querySelectorAll('.post_comment_form').forEach((comment_form) => {
            comment_form.addEventListener('submit', createComment);   
        });

        /** This will add event listener to comment form textarea. */
        document.querySelectorAll('.comment_textarea').forEach((comment_textarea) => {
            comment_textarea.addEventListener('keyup', checkTextareaEmpty);   
        });

    }
}

/** This funtion will display the edit form in messages or comments. */
function toggleEditForm(event){
    let content           = event.target.closest('ul');
    let main_content      = content.closest('ul[class="message_list"]');
    let edit_message_form = document.getElementById("edit_message_form");
    let edit_comment_form = document.getElementById("edit_comment_form");
    let edit_form         = document.getElementById("sample_edit_form");

    /** This will check if edit form has been already displayed in the message or comment. */ 
    if (edit_message_form === null && edit_comment_form === null) {
        showElement(edit_form);
        let clone_edit_form = edit_form.cloneNode(true);
        let form_id         = "edit_message_form";
        let textarea_id     = "textarea_message_edit";
        let button_text     = "Update Message";  

        /** This variable will identify the type of the content by its data attribute value.*/
        let data_id         = "[data-id = "+content.dataset.id+"]";

        /** This will check if the content is a comment and if true it will change the edit form's id, textarea id, text content of submit button and change the data_id.*/
        if (content.className === "comment_list") {
            form_id     = "edit_comment_form";
            textarea_id = "textarea_comment_edit";
            button_text = "Update Comment";
            data_id     = "[data-id = "+main_content.dataset.id+"] [data-id = "+content.dataset.id+"]";
        }
        let text_content = document.querySelector(data_id+" .content");

        /** This will hide the comment, edit, delete and user profile on the message or comment. */ 
        document.querySelectorAll(data_id+" > li:not(:first-child)").forEach((action) => hideElement(action));

        /** This will preserve the previous content of message or comment if editting is canceled. */ 
        prev_content = text_content.textContent;

        /** This will replace message or comment content and it will be replaced by a cloned form for editing messages or comment. */ 
        text_content.replaceWith(clone_edit_form);
        clone_edit_form.id = form_id;
        let textarea       = document.querySelector(data_id+" .edit_form textarea");
        textarea.value     = text_content.textContent;
        textarea.id        = textarea_id;
        document.querySelector(data_id+" .edit_form .post_updated_button").textContent = button_text;
        hideElement(edit_form); 
        
        /** This will add event listener to class cancel_updating_button. */ 
        document.querySelectorAll('.cancel_updating_button').forEach((cancel_update) => {
            cancel_update.addEventListener('click', closeEditForm);  
        });

        /** This will add event listener to class edit_form on submitting the edit form. */  
        document.querySelectorAll('.edit_form').forEach((edit_form) => {
            edit_form.addEventListener('submit', updateContent);  
        });
        
    }
}

/** This funtion will hide the edit form in messages or comments. */ 
function closeEditForm(event){
    let data_id         = event.target.closest('ul').dataset.id;
    let form_id         = event.target.closest('form[id]').id;
    let form            = document.querySelector("#"+form_id);
    const content       = document.createElement("li");
    content.className   = "content content_message";
    content.textContent = prev_content;
    form.replaceWith(content); 
    document.querySelectorAll("[data-id = "+data_id+"]"+" li:not(:first-child)").forEach((action) => action.classList.remove("hide_element")); 
}

/** This funtion will display the modal for deleting messages or comments. */
function showDeleteModal(event){
    let content   = event.target.closest('ul');
    let data_id   = "[data-id = "+content.dataset.id+"]";
    let modal_for = "Message";

    /** This will check if the content to be deleted is a comment. */
    if (content.className === "comment_list") {
        modal_for        = "Comment";
        let main_content = content.closest('ul[class="message_list"]');
        data_id          = "[data-id = "+main_content.dataset.id+"] [data-id = "+content.dataset.id+"]";
    }

    /** This will set the UI and value of the content to be deleted. */
    let delete_modal = document.getElementById("delete_modal");
    document.getElementById("action_form_input").value = data_id;
    document.getElementById("modal_body_title").innerHTML = "Confirm Delete "+modal_for;
    document.getElementById("modal_body_description").innerHTML = "Are you sure you want to remove this "+modal_for.toLowerCase()+" ? This action cannot be undone."; 
    delete_modal.classList.add("show_element_flex");
}

/** This funtion will update the total list of comments on a message. */
function checkIfHasComment(message_id){
    let total_comment = document.querySelector("[data-id = "+message_id+"]"+" .comment_button");
    let total         = document.querySelectorAll("[data-id = "+message_id+"]"+" .comment_list");
    
    /** This will check if the total comment list of a message is zero or not and it will add or remove class base on condition. */ 
    if (total.length > 0) {
        total_comment.classList.add("has_comment");
    } 
    else if (total.length === 0) {
        total_comment.classList.remove("has_comment");      
    }
}

/** This funtion will update the content of a message or comment. */
function updateContent(event) {
    let content  = event.target.closest('ul');
    let data_id  = "[data-id = "+content.dataset.id+"]";

    /** This will check if the content to be updated is a comment. */
    if (content.className === "comment_list") {
        let message_id = content.closest('ul[class="message_list"]');
        data_id  = "[data-id = "+message_id.dataset.id+"] [data-id = "+content.dataset.id+"]"; 
    }
    let form_id = event.target.closest('form').id;
    let updated_content = document.querySelector(data_id+" #"+form_id+" textarea");
    closeEditForm(event);
    document.querySelector(data_id+" .content").textContent = updated_content.value;
    event.preventDefault();   
}

/** This funtion will delete a certain messages or comments. */ 
function deleteContent(event) {
    event.preventDefault();
    /** This variables will identify which contemt will be deleted (Message or Comment). */
    let action_form_input = document.getElementById("action_form_input").value;
    let content           = document.querySelector(action_form_input);
    let message_id        = content.closest('ul[class="message_list"]');
    content.remove();

    /** This will check if the content to be deleted is a message or comment and execute its condition. */
    if (content.className === "message_list") {
        let updated_message_list = document.querySelectorAll(".message_list").length;
        document.querySelector("#total_messages").innerHTML = updated_message_list;
        if(updated_message_list === 0){
            showElement(empty_post);
        }
    } 
    else{
        let updated_comment_list = document.querySelectorAll("[data-id = "+message_id.dataset.id+"]"+" .comment_list").length;
        document.querySelector("[data-id = "+message_id.dataset.id+"]"+" .comment_button .comment_count").innerHTML = updated_comment_list;
        checkIfHasComment(message_id.dataset.id);
    }
    let delete_modal = document.getElementById("delete_modal");
    delete_modal.classList.remove('show_element_flex'); 
    hideElement(delete_modal);
}