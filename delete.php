<?php
include 'connect.php';

if (isset($_POST['deleteId'])) {
    $unique = $_POST['deleteId'];
    $sql = "DELETE FROM users WHERE id = $unique";
    $result = mysqli_query($con, $sql);
}

if (isset($_POST["selectedId"])) {
    foreach ($_POST["selectedId"] as $id) {
        $sql = "delete from `users` where id=$id";
        $result = mysqli_query($con, $sql);
    }
}
