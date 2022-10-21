<?php    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    require_once 'application/libs/Config.php';
    require_once 'application/libs/Autoload.php';
    new application\libs\Application();
