window.onload = function () {
    let create_post_textarea = document.getElementById("create_post_textarea");
    let post_comment = document.getElementsByClassName("post_comment")[0];
    let comment_list = document.getElementsByClassName("comment_list")[0];
    let edit_message = document.getElementsByClassName("edit_message")[0];
    let edit_comment = document.getElementsByClassName("edit_comment")[0]; 

    //detects if textarea if empty
    function checkTextareaEmpty(){
        let post_message_btn = document.getElementById("post_message_btn");
        if (create_post_textarea.value === "") {
            post_message_btn.setAttribute("disabled", true);
            post_message_btn.style.backgroundColor = "rgba(44, 107, 255, 0.5)";
        }else{
            post_message_btn.removeAttribute("disabled");
            post_message_btn.style.backgroundColor = "#2c6bff";
        }
    }

    //shows edit form.
    function toggleEditForm(edit_form, element_child, child_number){
        if (window.getComputedStyle(edit_form).display === "none") {
            document.getElementsByClassName(element_child)[child_number].children[0].style.display = "none";
            document.getElementsByClassName(element_child)[child_number].children[1].style.display = "none";
            edit_form.style.display = "block"; 
        }else{
            document.getElementsByClassName(element_child)[child_number].children[0].style.display = "block";
            document.getElementsByClassName(element_child)[child_number].children[1].style.display = "flex"; 
            edit_form.style.display = "none";
        }
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
        if(event.target === create_post_modal){
            create_post_modal.style.display = "none";
        }
    });

    //detect if textarea if empty in keyup
    document.addEventListener('keyup', function () {
        checkTextareaEmpty();
    });

    //add the new message in the lists
    const form_message = document.getElementById("create_message_form");
    form_message.addEventListener("submit", function(event) {
        document.getElementById("create_post_modal").style.display = "none";
        document.getElementById("empty_post").style.display = "none";
        document.getElementById("total_messages").innerHTML = "5";
        document.getElementById("created_message").style.display = "block";
        document.getElementById("created_message_content").textContent = create_post_textarea.value;
        let message_list = document.getElementsByClassName("message_list");
        for (let index = 0; index < message_list.length; index++) {
            message_list[index].style.display = "block"; 
        }
        event.preventDefault();
        create_post_textarea.value = "";
    });

    document.getElementsByClassName("delete_button")[0].addEventListener('click', function () {
        let action_modal = document.getElementById("action_modal");
        action_modal.style.display = "block";
        document.getElementById("action_form_input").value = "message";
        document.getElementById("modal_body_title").innerHTML = "Confirm Delete Message";
        document.getElementById("modal_body_description").innerHTML = "Are you sure you want to remove this message? This action cannot be undone.";
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
        if(event.target === action_modal){
            action_modal.style.display = "none";
        }
    });

    //remove post or comment
    const action_form = document.getElementById("action_form"); 
    action_form.addEventListener("submit", function(event) {
        let action_form_input = document.getElementById("action_form_input").value;
        document.getElementById("action_modal").style.display = "none";
        if(action_form_input === "message"){
            document.getElementsByClassName("message_list")[0].style.display = "none";
            document.getElementById("total_messages").innerHTML = "4";
        }else{
            document.getElementsByClassName("comment_list")[0].style.display = "none";
        }
        event.preventDefault();
    });

    //show comment list
    document.getElementsByClassName("comment_button")[1].addEventListener('click', function () {
        if (window.getComputedStyle(post_comment).display === "none") {
            post_comment.style.display = "block";
            comment_list.style.display = "block";
        }else{
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
}