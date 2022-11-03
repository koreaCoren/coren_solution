<?php
namespace application\models;
use PDO;

class UserModel extends Model {
    // 회원가입
    public function ins_user(&$param) {
        $pw = $param["pw"];
        $hashPw = password_hash($pw, PASSWORD_DEFAULT);
        $sql = "INSERT INTO member
                (
                    id, pw, email
                )
                VALUES
                (
                    :id, '$hashPw', :email
                )";
         $stmt = $this->pdo->prepare($sql);
         $stmt->bindValue(":id", $param["id"]);
         $stmt->bindValue(":email", $param["email"]);       
         $stmt->execute();
         return intval($this->pdo->lastInsertId());
    }

    // 로그인 체크
    public function sel_user(&$param){
        $userId = $param["id"];
        $sql = "SELECT * FROM member
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);
        $stmt->execute();
        $fail = ["fail"];
        $data = $stmt->fetch(PDO::FETCH_ASSOC);        
        $pwData = $data['pw'];
        if(!password_verify($param["pw"], $pwData)){
            return $fail;
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

            //신규유저 로그인시 수정이 되지 않으므로 체크

            $sql = "INSERT INTO token
                    (id , token)
                    VALUE
                    ('$userId', '$token')
                    ON DUPLICATE KEY
                    UPDATE id='$userId', token='$token'";
            $stmt2 = $this->pdo->prepare($sql);
            $stmt2->execute();
            $result = [
                'loginCheck' => "success",
                'userId' => $userId,
                'token' => $token
            ];
            return $result;
        }
        
    }

    //토큰 체크
    public function checkToken(&$param){
        $sql = "SELECT * FROM token WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue("id", $param["userId"]);
        // $stmt->bindValue("token", $param["token"]);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $tkData = $data['token'];

        if($param["token"] == $tkData){
            $result = [
                'result' => 'ok',
            ];
        }else {
            $result = [
                'result' => 'false',
            ];
        }
        
        return $result;
    }


    // 로그아웃(토큰삭제)
    public function break_token(&$param){
        $sql = "DELETE FROM token WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue("id", $param["userId"]);
        $stmt->execute();
        return intval($this->pdo->lastInsertId());
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

    // 친구 찾기
    public function find_friend(&$param){
        $search = $param["searchUser"];
        $sql = "SELECT id FROM member WHERE id LIKE '%$search%'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    
    // 친구 요청
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

    //친구 요청 중 화면 출력
    public function reqing_friend(&$param){
        $user = $param["user"];
        $sql = "SELECT * FROM friends WHERE reqFri = '$user' OR resFri = '$user'";
        $stmt = $this->pdo->prepare($sql);
        // $stmt->bindValue("user", $param["user"]);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    
    //친구 요청 취소
    public function deny_friend(&$param){
        $sql = "DELETE FROM friends 
                WHERE reqFri = :reqUser 
                AND resFri = :resUser";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindvalue("reqUser", $param["requestUser"]);
        $stmt->bindvalue("resUser", $param["responseUser"]);
        $stmt->execute();
        return intval($this->pdo->lastInsertId());
    }

    //친구 삭제
    public function delete_friend(&$param){
        $reqUser = $param["requestUser"];
        $resUser = $param["responseUser"];
        $sql = "DELETE FROM friends 
                WHERE reqFri = '$reqUser' AND resFri = '$resUser'
                OR reqFri = '$resUser' AND resFri = '$reqUser'";
        $stmt = $this->pdo->prepare($sql);
        // $stmt->bindvalue("reqUser", $param["requestUser"]);
        // $stmt->bindvalue("resUser", $param["responseUser"]);
        $stmt->execute();
        return intval($this->pdo->lastInsertId());
    }

    //친구 수락 or 거절
    public function accept_friend(&$param){
        if($param["isFriend"] === true ){
            $sql = "UPDATE friends
                SET onfriend = '1'
                WHERE resFri = :user AND reqFri = :reqUser";
        } else {
            $sql = "DELETE FROM friends 
                    WHERE reqFri = :reqUser 
                    AND resFri = :user";
        }
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindvalue("user", $param["requestUser"]);
        $stmt->bindvalue("reqUser", $param["responseUser"]);
        $stmt->execute();
        return intval($this->pdo->lastInsertId());
    }
   
}