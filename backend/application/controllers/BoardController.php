<?php
namespace application\controllers;

class BoardController extends Controller {
    public function sel_board(){
        $json = getJson();
        return [_RESULT => $this->model->sel_board($json)];
    }

}