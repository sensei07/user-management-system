<?php
include 'connect.php';

if (isset($_POST['deleteId'])) {
    $unique = $_POST['deleteId'];
    $sql = "DELETE FROM users WHERE id = $unique";
    $result = mysqli_query($con, $sql);
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
        'id' => $unique
    );
    echo json_encode($response);
}

// if (isset($_POST["selectedId"])) {
//     $arr = explode(',', $_POST['selectedId']);
//     foreach ($arr as $unique) {
//         $sql = "DELETE from `users` WHERE id = $unique";
//         $result = mysqli_query($con, $sql);
//     }
//     $errorHttp = array(
//         'code' => http_response_code(),
//         'message' => $error
//     );
//     if ($result === true) {
//         $errorHttp = null;
//     }
//     $response = array(
//         'status' => $result,
//         'error' => $errorHttp,
//         'selectId' => $_POST['selectedId'],
//     );
//     echo json_encode($response);
// }
