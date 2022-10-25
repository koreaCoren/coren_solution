<?php
// jwt에서 유저 정보 가져오기
$data = $jwt->dehashing($token);

$parted = explode('.', base64_decode($token));

$payload = json_decode($parted[1], true);

var_dump($payload);

echo "<br/><br/>";
echo "email: " . base64_decode($payload['email']);
echo "<br/><br/>";
echo "password: " . base64_decode($payload['password']);