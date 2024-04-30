<?php

    $localhost = "localhost";
    $user = "root";
    $password = "";
    $db = "user";

    $conn = mysqli_connect($localhost,$user,$password,$RePassword);

    if($_POST['submit']){
        $email = $_POST('email');
        $password = $_POST('password');
        $RePassword = $_POST('RePassword');

        $query = "INSERT INTO user_signup values('$email','$password','$RePassword')";
        $data = mysqli_query($conn,$query);

        if($data){
            echo "Data inserted";
        }
        else{
            echo "Failed";
        }
    }
?>