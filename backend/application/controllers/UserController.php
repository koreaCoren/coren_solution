<?php
namespace application\controllers;

class UserController extends Controller {

    // 회원등록
    public function ins_client(){
        $json = getJson();
        
        return $this->model->ins_client($json);            
    }

    // 마이페이지
    public function myPage(){
        $json = getJson();
        $token = $this->model->checkToken($json);
        if($token['result'] === 'ok'){
            return $this->model->myPage($json);            
        };

    }

    // 프로필 이미지 업로드
    public function profileInsImg(){
        $json = getJson(); //배열형
        $image_parts = explode(";base64,", $json['image']); //[0]파일명 및 타입 ;base 65 [1]이미지 로 나눔
        $image_type_aux = explode("image/", $image_parts[0]);  //[0]데이터 [1]파일확장자 로 나눔
        $image_type = $image_type_aux[1];      
        $image_base64 = base64_decode($image_parts[1]); //$image_parts[1] 이미지를 디코딩
        $dirPath = _IMG_PATH . "/" . $productId;
        $filePath = $dirPath . "/" . uniqid() . "." . $image_type; 
        //폴더 안에 파일 삭제 후에 새로운 파일 추가
        rmdirAll($dirPath);
        if(!is_dir($dirPath)) {
            mkdir($dirPath, 0777, true);
        }
        $filename = explode("/", $filePath);
        //$file = _IMG_PATH . "/" . $productId . "/" . $type . "/" . uniqid() . "." . $image_type;
        //$file = "static/" . uniqid() . "." . $image_type;
        $result = file_put_contents($filePath, $image_base64);
        if($result){
            $param = [
                'uuid' => $productId,
                'user_img' => $filename[3],
            ];
            $this->model->profileInsImg($param);
            return [_RESULT => $filePath];
        }
        return [_RESULT => 0];
    }


    // 회원가입
    public function ins_user() {
        $json = getJson();
        $checkId = $json['id'];
        $checkEmail = $json['email'];
        $result = [
            'id' => true,
            'email' => true,
        ];

        if($this->model->check_id($checkId) === 1){
            $result['id'] = false;
            return $result;
        }else if($this->model->check_email($checkEmail) === 1){
            $result['email'] = false;
            return $result;
        };
        return [_RESULT => $this->model->ins_user($json)];
    }
    // 로그인 체크
    public function sel_user(){
        $json = getJson();
        return $this->model->sel_user($json);
    }
    // 토큰 체크
    public function checkToken(){
        $json = getJson();
        return $this->model->checkToken($json);
    }

    // 로그아웃(토큰 삭제)
    public function break_token(){
        $json = getJson();
        return $this->model->break_token($json);
    }

    // 계정 삭제?
    public function del_user(){
        $json = getJson();
        return [_RESULT => $this->model->del_user($json)];
    }
    // 유저정보 변경
    public function upd_user(){
        $json = getJson();
        return [_RESULT => $this->model->upd_user($json)];
    }

    // 친구 찾기
    public function find_friend(){
        $json = getJson();
        return $this->model->find_friend($json);
    }

    // 친구 요청
    public function req_friend(){
        $json = getJson();
        return [_RESULT => $this->model->req_friend($json)];
    }

    // 친구 요청 중 화면 출력
    public function reqing_friend(){
        $json = getJson();
        return $this->model->reqing_friend($json);
    }
    
    // 친추 취소
    public function deny_friend(){
        $json = getjson();
        return $this->model->deny_friend($json);
    }

    // 친구 삭제
    public function delete_friend(){
        $json = getjson();
        return $this->model->delete_friend($json);
    }

    // 친구 수락
    public function accept_friend(){
        $json = getjson();
        return $this->model->accept_friend($json);
    }
    
}