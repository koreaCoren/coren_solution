<?php
    //비교하려는 테이블, 찾기시 사용될 id값, 비교하려는 입력값, db에 있는 값 
    /*
    function check_Id($table, $idValue, $inputValue, $dbValue) {        
        $sql = "SELECT * FROM $table WHERE id = BINARY $idValue";      
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);
        $stmt->execute();
        $fail = ["fail"];
        $data = $stmt->fetch(PDO::FETCH_ASSOC);        
        $pwData = $data['pw'];
        return ;
    }
    */