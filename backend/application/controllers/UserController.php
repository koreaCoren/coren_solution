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

    // 프로필 이미지 업로드//
    public function profileInsImg(){
        $json = getjson();
        $imgName = $json['imgName'];
        $file = create_b64_img($json['userId'], $json['imgName'], "profileImg");
        $param = [
            'userId' => $json['userId'],
            'imgName' => $file
        ];
        return $this->model->profileInsImg($param);
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
    
    //회원정보 리스트
    public function clients_list(){
        $json = getjson();
        return $this->model->clients_list($json);
    }

    //회원 이미지
    public function ins_clients_img(){
        $json = getjson();
        create_b64_img($json['cid'], $json['imgname'], "clientsImg");
        return $this->model->ins_clients_img($json);
    }
}