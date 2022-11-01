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
                    id, title, ctnt, cre_date
                )
                VALUES
                (
                    :id, :title, :ctnt, :cre_date
                )";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);
        $stmt->bindValue(":title", $param["title"]);
        $stmt->bindValue(":ctnt", $param["content"]);
        $stmt->bindValue(":cre_date", $param["date"]);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

}
