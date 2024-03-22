$(document).ready(function(){
    $('#register-btn').click(function(){
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirm-password').val();
        var dob = $('#dob').val();
        var mobile = $('#mobile').val();
  
        // Ensure password match
        if (password !== confirmPassword) {
            $('#message').html('<div class="alert alert-danger" role="alert">Passwords do not match.</div>');
            return;
        }
  
        // AJAX request for user registration
        $.ajax({
            type: 'POST',
            url: './php/register.php',
            data: { 
                username: username, 
                email: email, 
                password: password, 
                dob: dob, 
                mobile: mobile 
            },
            success: function(response){
                if (response === 'success') {
                    $('#message').html('<div class="alert alert-success" role="alert">Registration successful! You can now <a href="login.html">login</a>.</div>');
                    window.location.href = "./profile.html";
                  } else {
                    $('#message').html('<div class="alert alert-danger" role="alert">' + response + '</div>');
                }
            },
            error: function(xhr, status, error){
                console.error(xhr.responseText);
                $('#message').html('<div class="alert alert-danger" role="alert">Error occurred while registering. Please try again.</div>');
            }
        });
    });
  });
  