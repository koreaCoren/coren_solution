<?php
namespace application\controllers;

class BoardController extends Controller {
    public function sel_board(){
        $json = getJson();
        return $this->model->sel_board($json);
    }

}