<?php
    //생성하려는 문자 길이를 넣으면 세 가지 타입의 문자가 길이만큼 랜덤생성됨
    function getToken($length) {        
        $characters  = "0123456789";
        $characters .= "abcdefghijklmnopqrstuvwxyz";
        $characters .= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $characters .= "_";
        $string_generated = "";
        $nmr_loops = $length;
            while ($nmr_loops--){
            $string_generated .= $characters[mt_rand(0, strlen($characters) - 1)];
            }               
        return $string_generated;
    }
    