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
        if(empty($stmt->fetchAll(PDO::FETCH_OBJ))){
            return "fail";
        } else {
            function GenerateString($length){
                $characters  = "0123456789";
                $characters .= "abcdefghijklmnopqrstuvwxyz";
                $characters .= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                $characters .= "_";
                $string_generated = "";
                $nmr_loops = $length;
                    while ($nmr_loops--){
                    $string_generated .= $characters[mt_rand(0, strlen($characters) - 1)];
                    }               
                return $string_generated;}
            $token = GenerateString(100);
            // $sql = "INSERT INTO token
            //         (id , token)
            //         VALUE
            //         (:id , $token)";
            // $stmt = $this->pdo->prepare($sql);
            // $stmt->bindValue(":id", $param["id"]);
            // $stmt->execute();
            $result = [
                'loginCheck' => "success",
                'userId' => $userId,
                // 'token' => $token
            ];
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