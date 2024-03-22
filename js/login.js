$(document).ready(function() {
    // Handling form submission
    $(".btn-primary").click(function() {
        // Get username and password values
        var username = $("#username").val();
        var password = $("#password").val();
        // Simulate login request (replace with actual AJAX call)
        $.ajax({
            type: "POST",
            url: "./php/login.php", // Assuming login processing script is named login.php
            data: {
                username: username,
                password: password,
            },
            success: function(response) {
                if (response === "success") {
                    // Store token in local storage (replace tokenValue with actual token)
                    localStorage.setItem("token", username); // Store username in localStorage
                    
                    // If login is successful, redirect to profile.html
                    window.location.href = "./profile.html";
                } else {
                    // If login fails, display error message
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                // If there's an error with the AJAX request, display error message
                console.error(xhr.responseText);
                alert("An error occurred. Please try again.");
            }
        });
    });
});
