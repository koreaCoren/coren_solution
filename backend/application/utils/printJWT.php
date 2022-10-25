<?php
    include_once "JWTconstruct.php";
    $jwt = new JWT();

    $email = "simple@mail.com";
    $email = base64_encode($email);
    
    $password = "password...1234";
    $password = base64_encode($password);

    $token = $jwt->hashing(array(
        'exp' => time() + (360 * 30),
        'lat' => time(),
        'id' => 10,
        'email' => $email,
        'password' => $password
    ));

    var_dump($token);