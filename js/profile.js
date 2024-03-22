$(document).ready(function(){
    // Function to retrieve username from localStorage
    function getUsername() {
        var token = localStorage.getItem('token');
        if (token) {
            return token;
        } else {
            return ""; // Return an empty string if username is not found
        }
    }
    
    $('#logout').click(function() {
        // Delete the token username
        localStorage.removeItem('username');
        window.location.href = './login.html';
    });
    
    // Function to display greeting message
    function displayGreeting() {
        var username = getUsername();
        if (username) {
            $("#greeting").text("Hi, " + username); // Display greeting message
        }
    }

    // Call the displayGreeting function when the document is ready
    displayGreeting();

    $('#saveProfile').click(function(){
        var age = $('#age').val();
        var dob = $('#dob').val();
        var contact = $('#contact').val();
        var username = getUsername(); // Retrieve username using the getUsername function
        
        // Check if all fields are filled
        if (age && dob && contact && username) {
            $.ajax({
                type: 'POST',
                url: './php/profile.php',
                data: { age: age, dob: dob, contact: contact, username: username },
                success: function(response){
                    console.log(response);
                    alert('Profile updated successfully!');
                },
                error: function(xhr, status, error){
                    console.error(xhr.responseText);
                    alert('Error occurred while updating profile. Please try again.');
                }
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});
