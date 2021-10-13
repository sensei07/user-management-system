<?php

$con = new mysqli('localhost', 'root', 'root', 'task-3');

if (!$con) {
    die(mysqli_error($con));
}
