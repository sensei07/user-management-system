<?php
include 'connect.php';

if (isset($_POST["id"]) and isset($_POST['action']) and isset($_POST['selectValue'])) {
    if ($_POST['action'] == 'update-status') {
        $selectValue = $_POST['selectValue'];
        $arr = explode(',', $_POST['id']);
        foreach ($arr as $id) {
            $sql = "UPDATE users SET status='$selectValue' WHERE id = $id";
            $result = mysqli_query($con, $sql);
        }
        $errorHttp = array(
            'code' => http_response_code(),
            'message' => $error
        );
        if ($result === true) {
            $errorHttp = null;
        } else {
            return;
        }
        $userStatus = '';
        if ($selectValue === 'on') {
            $userStatus = 'online';
        } else {
            $userStatus = 'offline';
        }
        $response = array(
            'status' => $result,
            'error' => $errorHttp,
            'selectValue' => $selectValue,
            'selectId' => $_POST['id'],
            'userStatus' => $userStatus,
            'action' => $_POST['action']
        );
        echo json_encode($response);
    } elseif ($_POST['action'] == 'delete') {
        $arr = explode(',', $_POST['id']);
        foreach ($arr as $unique) {
            $sql = "DELETE from `users` WHERE id = $unique";
            $result = mysqli_query($con, $sql);
        }
        $errorHttp = array(
            'code' => http_response_code(),
            'message' => $error
        );
        if ($result === true) {
            $errorHttp = null;
        }
        $response = array(
            'status' => $result,
            'error' => $errorHttp,
            'selectId' => $_POST['id'],
            'action' => $_POST['action'],
        );
        echo json_encode($response);
    }
}
