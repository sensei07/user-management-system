<?php
include 'connect.php';

extract($_POST);

if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['status']) && isset($_POST['role'])) {
    $strSearch = array('<', " ", '&lt', '>', '/');
    $firstName = filter_var(str_replace($strSearch, '', ($_POST['firstName'])), FILTER_SANITIZE_STRING);
    $lastName = filter_var(str_replace($strSearch, '', ($_POST['lastName'])), FILTER_SANITIZE_STRING);
    if (strlen($firstName) < 2 || strlen($lastName) < 2) {
        mysqli_close($con);
        $error = 'First and last name can only contain letters and numbers and at least 2 characters and do not contain spaces';
        $code = http_response_code(501);
        $response = array(
            'status' => false,
            'error' => array(
                'code' => $code,
                'message' => $error
            )
        );
        echo json_encode($response);
        exit();
    } else {
        $sql = "insert into `users` (firstName,lastName,status,role) values ('$firstName','$lastName','$status','$role')";
        $result = mysqli_query($con, $sql);
        $id = mysqli_insert_id($con);
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
        'error' =>  $errorHttp,
        'user' => array(
            'firstName' => $firstName,
            'lastName' => $lastName,
            'status' => $status,
            'role' => $role,
            'id' => $id,
        ),
    );
    echo json_encode($response);
}

if (isset($_POST['idEdit'])) {
    $strSearch = array('<', " ", '&lt', '>', '/');
    $firstName = str_replace($strSearch, '', $_POST['firstNameEdit']);
    $lastName = str_replace($strSearch, '', $_POST['lastNameEdit']);
    $lastName = $_POST['lastNameEdit'];
    $status = $_POST['statusEdit'];
    $role = $_POST['roleEdit'];
    $id = $_POST['idEdit'];

    if (strlen($firstName) < 2 || strlen($lastName) < 2) {
        mysqli_close($con);
        $error = 'First and last name can only contain letters and numbers and at least 2 characters and do not contain spaces';
        $code = http_response_code(501);
        $response = array(
            'status' => false,
            'error' => array(
                'code' => $code,
                'message' => $error
            )
        );
        echo json_encode($response);
        exit();
    } else {
        $sql = "update `users` set firstName='$firstName',lastName='$lastName',status='$status',role='$role' WHERE id='$id'";
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
        'user' => array(
            'firstName' => $firstName,
            'lastName' => $lastName,
            'status' => $status,
            'role' => $role,
            'id' => $id,
        ),
    );
    echo json_encode($response);
}
