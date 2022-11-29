<?php
function getRandomFileNm($fileName) {
    return gen_uuid_v4() . "." . getExt($fileName);
}

function getExt($fileName) {
    return pathinfo($fileName, PATHINFO_EXTENSION);
}

function gen_uuid_v4() { 
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x'
        , mt_rand(0, 0xffff)
        , mt_rand(0, 0xffff)
        , mt_rand(0, 0xffff)
        , mt_rand(0, 0x0fff) | 0x4000
        , mt_rand(0, 0x3fff) | 0x8000
        , mt_rand(0, 0xffff)
        , mt_rand(0, 0xffff)
        , mt_rand(0, 0xffff) 
    ); 
}

//formdata기반 이미지 추가
function create_img(&$userId, $folderPath){
    $img_name = $_FILES["img"]["name"]; // $_FILES["포스트된 이미지의 이름"]["name=파일이름?"]
    $last_index = mb_strrpos($img_name, ".");
    $ext = mb_substr($img_name, $last_index);
    $target_filenm = gen_uuid_v4() . $ext;
    $target_full_path = IMG_PATH . "/" . $folderPath . "/" . $userId;
    rmdirAll($target_full_path);
    if(!is_dir($target_full_path)) {
        mkdir($target_full_path, 0777, true);
    }
    $imgPath = REQ_IMG_PATH . "/" . $folderPath . "/" . $userId;

    $tmp_img = $_FILES['img']['tmp_name'];
    $imageUpload = move_uploaded_file($tmp_img, $target_full_path . "/" .$target_filenm);
    echo $tmp_img . "---------" . $target_full_path . "----------" .$target_filenm;
    return $target_filenm;
}

//base64기반 이미지 추가
function create_b64_img($id, $b64img, $folderPath){
    $img = $b64img;
    // $img = str_replace('data:image/jpeg;base64,', '', $img);
    // $img = str_replace(' ', '+', $img);
    // $img = explode(',', $b64img);
    // $data = base64_decode($img);
    $image_parts = explode(";base64,", $img);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);

    $imgPath = IMG_PATH. "/" . $folderPath . "/" . $id;
    rmdirAll($imgPath);
    if(!is_dir($imgPath)) {
        mkdir($imgPath, 0777, true);
    }
    $fileNm = uniqid() . "img." . $image_type;
    $filePath = $imgPath . "/" . $fileNm;
    $success = file_put_contents($filePath, $image_base64);
    return $fileNm;
}

//기존 이미지 삭제//
function rmdirAll($dir) {
    if(!is_dir($dir)) { return; }
    $dirs = dir($dir);
    while(false !== ($entry = $dirs->read())) {
        if(($entry != '.') && ($entry != '..')) {
            if(is_dir($dir.'/'.$entry)) {
            rmdirAll($dir.'/'.$entry);
            } else {
            @unlink($dir.'/'.$entry);
            }
            }
        }
    $dirs->close();
    @rmdir($dir);
}