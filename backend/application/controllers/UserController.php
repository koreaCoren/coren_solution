<?php
namespace application\controllers;

class UserController extends Controller {
    //테스트용
    public function ins_user() {
        $json = getJson();
        return [_RESULT => $this->model->ins_user($json)];
    }

    public function sel_user(){
        $json = getJson();
        return [_RESULT => $this->model->sel_user($json)];
    }

    public function del_user(){
        $json = getJson();
        return [_RESULT => $this->model->del_user($json)];
    }

    public function upd_user(){
        $json = getJson();
        return [_RESULT => $this->model->upd_user($json)];
    }
    //
}