<?php
include 'connect.php';

if (isset($_POST["id"]) and isset($_POST['selectValue'])) {
    $unique = $_POST['id'];
    $selectValue = $_POST['selectValue'];
    foreach ($_POST["id"] as $unique) {
        $sql = "UPDATE users SET status='$selectValue' WHERE id = $unique";
        $result = mysqli_query($con, $sql);
    }
}
