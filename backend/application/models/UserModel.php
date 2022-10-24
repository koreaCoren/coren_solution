<?php
namespace application\models;
use PDO;

class UserModel extends Model {
    //테스트용
    public function ins_user(&$param) {
        $sql = "INSERT INTO member
                (
                    id, pw, email
                )
                VALUES
                (
                    :id, :pw, :email
                )";
         $stmt = $this->pdo->prepare($sql);
         $stmt->bindValue(":id", $param["id"]);
         $stmt->bindValue(":pw", $param["pw"]);
         $stmt->bindValue(":email", $param["email"]);       
         $stmt->execute();
         return intval($this->pdo->lastInsertId());
    }

    public function sel_user(&$param){
        $sql = "SELECT * FROM member
                WHERE id = :id AND pw = :pw";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);
        $stmt->bindValue(":pw", $param["pw"]);
        $stmt->execute();
        $result = [
            'loginCheck' => "success",
            'id' => $param["id"]
        ];
        if(empty($stmt->fetchAll(PDO::FETCH_OBJ))){
            return "fail";
        } else {
            return json_encode($result);
        }
        
        //return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function upd_user(&$param){
        $sql = "UPDATE member SET id = :cid
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":cid", $param["cid"]);
        $stmt->bindValue(":id", $param["id"]);           
        $stmt->execute();
        return $stmt->rowcount();
    }

    public function del_user(&$param){
        $sql = "DELETE FROM member WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);        
        $stmt->execute();
        return $stmt->rowcount();
    }
    //
}
