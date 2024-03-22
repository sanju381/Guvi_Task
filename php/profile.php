<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
    exit(); // Exit the script if connection fails
}

// Establish MongoDB connection
$mongoManager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$mongoCollection = 'guvi.users'; // MongoDB collection name

// Check if request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get username, age, dob, and contact from POST data
    $username = $_POST['username'];
    $age = $_POST['age'];
    $dob = $_POST['dob'];
    $contact = $_POST['contact'];

    try {
        // Update user details in MongoDB
        $mongoFilter = ['username' => $username];
        $mongoBulk = new MongoDB\Driver\BulkWrite;
        $mongoDocument = [
            '$set' => [
                'age' => $age,
                'dob' => $dob,
                'contact' => $contact
            ]
        ];
        $mongoBulk->update($mongoFilter, $mongoDocument);
        $mongoManager->executeBulkWrite($mongoCollection, $mongoBulk);

        // Update user details in MySQL
        $sql = "UPDATE users SET age=:age, dob=:dob, contact=:contact WHERE username=:username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':age', $age);
        $stmt->bindParam(':dob', $dob);
        $stmt->bindParam(':contact', $contact);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        // Profile updated successfully, send success message
        echo "success";
    } catch (Exception $e) {
        // Log and display detailed error message
        echo "Error occurred while updating profile: " . $e->getMessage();
    }
}
?>
