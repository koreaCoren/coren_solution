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

}
