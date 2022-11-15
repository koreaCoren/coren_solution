<?php
    
    function getJson() {
        $reqBody = file_get_contents('php://input');        
        $data = json_decode(stripcslashes($reqBody), true);
        return $data;
    }
    function getJson2() {
        $test = file_get_contents('php://input');
        
        return print_r($test);
    }
    
    function getParam($key) {
        return isset($_GET[$key]) ? $_GET[$key] : "";
    }

    function getUrl() {
        return isset($_GET['url']) ? rtrim($_GET['url'], '/') : "";
    }

    function getUrlPaths() {
        $getUrl = getUrl();        
        return $getUrl !== "" ? explode('/', $getUrl) : "";
    }

    function getMethod() {        
        return $_SERVER['REQUEST_METHOD'];
    }

    function isGetOne() {
        $urlPaths = getUrlPaths();
        if(isset($urlPaths[2])) { //one
            return $urlPaths[2];
        }
        return false;
    }
