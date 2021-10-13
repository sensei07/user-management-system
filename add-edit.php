<?php
include 'connect.php';

$sql = "SELECT id FROM users ORDER BY id";
$result = mysqli_query($con, $sql);
$response = array();
while ($row = mysqli_fetch_assoc($result)) {
    $response = $row;
}
echo json_encode($response);

extract($_POST);

if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['status']) && isset($_POST['role'])) {
    $sql = "insert into `users` (firstName,lastName,status,role) values ('$firstName','$lastName','$status','$role')";
    $result = mysqli_query($con, $sql);
}

if (isset($_POST['idEdit'])) {
    $firstName = $_POST['firstNameEdit'];
    $lastName = $_POST['lastNameEdit'];
    $status = $_POST['statusEdit'];
    $role = $_POST['roleEdit'];
    $sql = "update `users` set firstName='$firstName',lastName='$lastName',status='$status',role='$role' where id='$idEdit'";
    $result = mysqli_query($con, $sql);
}
