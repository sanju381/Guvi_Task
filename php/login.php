<?php
$servername = "localhost";
$username = "root";
$password = "roothost";
$dbname = "project";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}   

// Check if request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get username and password from POST data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare an SQL statement to fetch user details by username
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify username and password
    if ($user && password_verify($password, $user['password'])) {
        // Login successful
        echo "success";
    } else {
        // Login failed
        echo "Invalid username or password.";
    }
}

// Close database connection
$conn = null;
?>
