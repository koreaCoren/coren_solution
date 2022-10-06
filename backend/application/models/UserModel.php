<?php
namespace application\models;
use PDO;

class UserModel extends Model {
    //테스트용
    public function ins_user(&$param) {
        $sql = "INSERT INTO test
                (
                    id, pw
                )
                VALUES
                (
                    :id, :pw
                )";
         $stmt = $this->pdo->prepare($sql);
         $stmt->bindValue(":id", $param["id"]);
         $stmt->bindValue(":pw", $param["pw"]);         
         $stmt->execute();
         return intval($this->pdo->lastInsertId());
    }

    public function sel_user(){
        $sql = "SELECT * FROM test";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function upd_user(&$param){
        $sql = "UPDATE test SET id = :cid
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":cid", $param["cid"]);
        $stmt->bindValue(":id", $param["id"]);           
        $stmt->execute();
        return $stmt->rowcount();
    }

    public function del_user(&$param){
        $sql = "DELETE FROM test WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);        
        $stmt->execute();
        return $stmt->rowcount();
    }
    //
}