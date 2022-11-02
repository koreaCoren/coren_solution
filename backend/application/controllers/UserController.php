<?php
namespace application\controllers;

class UserController extends Controller {
    // 회원가입
    public function ins_user() {
        $json = getJson();
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

    //토큰 체크
    public function check_token(){
        $json = getJson();
        return $this->model->check_token($json);
    }
}