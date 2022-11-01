<?php
namespace application\models;
use PDO;

class BoardModel extends Model {
    public function sel_board(){
        $sql = "SELECT * FROM board";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function ins_board(&$param){
        $sql = "INSERT INTO board
                (
                    id, title, ctnt
                )
                VALUES
                (
                    :id, :title, :ctnt
                )";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);
        $stmt->bindValue(":title", $param["title"]);
        $stmt->bindValue(":ctnt", $param["content"]);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

}
