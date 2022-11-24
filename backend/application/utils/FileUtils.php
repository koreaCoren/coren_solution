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

//이미지 파일 생성
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
    $imageUpload = move_uploaded_file($tmp_img, $target_full_path . "/" .$target_filenm); //파일이동 성공시 true, 실패시 false
    echo $tmp_img . "---------" . $target_full_path . "----------" .$target_filenm;
    return $target_filenm;
}

//기존 이미지 삭제
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