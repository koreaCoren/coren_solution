<?php
namespace application\models;
use PDO;

class UserModel extends Model {
    // 회원가입
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

    // 로그인 체크
    public function sel_user(&$param){
        $userId = $param["id"];
        $sql = "SELECT * FROM member
                WHERE id = :id AND pw = :pw";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);
        $stmt->bindValue(":pw", $param["pw"]);
        $stmt->execute();
        $result = [
            'loginCheck' => "success",
            'userId' => $userId
        ];
        if(empty($stmt->fetchAll(PDO::FETCH_OBJ))){
            return "fail";
        } else {
            return $result;
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

    public function find_friend(&$param){
        $search = $param["searchUser"];
        $sql = "SELECT id FROM member WHERE id LIKE '%$search%'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    
    public function req_friend(&$param){
        $sql = "REPLACE INTO friends
                (
                    reqFri, resFri, onFriend
                )
                VALUES
                (
                    :req, :res, 0
                )";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":req", $param["requestUser"]);
        $stmt->bindValue(":res", $param["responseUser"]);
        $stmt->execute();
        return $stmt->rowcount();
    }

    public function reqing_friend(&$param){
        $sql = "SELECT * FROM friends WHERE reqFri = :user";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue("user", $param["user"]);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
}