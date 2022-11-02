<?php
namespace application\controllers;

class BoardController extends Controller {
    //게시글 불러오기
    public function sel_board(){
        $json = getJson();
        return $this->model->sel_board($json);
    }
    //게시글 등록
    public function ins_board() {
        $json = getJson();
        return [_RESULT => $this->model->ins_board($json)];
    }
    //게시글 삭제
    public function del_board(){
        $json = getJson();
        return [_RESULT => $this->model->del_board($json)];
    }
    //게시글 수정
    public function upd_board(){
        $json = getJson();
        return [_RESULT => $this->model->upd_board($json)];
    }
}