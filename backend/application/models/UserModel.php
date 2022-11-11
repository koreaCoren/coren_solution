<?php
namespace application\models;
use PDO;

class UserModel extends Model {
    public function myPage(&$param){
        $sql = "SELECT * FROM member
                WHERE id = BINARY :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param['userId']);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $result = [
            'id' => $data['id'],
            'email' => $data['email'],
            'belong' => $data['belong'],
            'address' => $data['address'],
            'tell' => $data['tell'],
        ];
        
        return $result;
    }

    // 중복 체크
    public function check_id($checkId){
        $sql = "SELECT * FROM member
                WHERE id = BINARY :checkId";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":checkId", $checkId);
        $stmt->execute();
        $row = $stmt->rowCount();
        
        return $row;
    }

    public function check_email($checkEmail){
        $sql = "SELECT * FROM member
                WHERE email = BINARY :checkEmail";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":checkEmail", $checkEmail);
        $stmt->execute();
        $row = $stmt->rowCount();
        
        return $row;
    }

    // 회원가입
    public function ins_user(&$param) {
        $pw = $param["pw"];
        $hashPw = password_hash($pw, PASSWORD_DEFAULT);
        $sql = "INSERT INTO member
                (
                    id, pw, email, tell
                )
                VALUES
                (
                    :id, '$hashPw', :email, :tell
                )
                ON DUPLICATE KEY
                    UPDATE che = 1
                ";
         $stmt = $this->pdo->prepare($sql);
         $stmt->bindValue(":id", $param["id"]);
         $stmt->bindValue(":email", $param["email"]);       
         //$stmt->bindValue(":belong", $param["belong"]);       
         //$stmt->bindValue(":address", $param["address"]);       
         $stmt->bindValue(":tell", $param["tell"]);       
         $row = $stmt->execute();
         return intval($this->pdo->lastInsertId());
    }

    // 로그인 체크
    public function sel_user(&$param){
        $userId = $param["id"];
        $sql = "SELECT * FROM member
                WHERE id = BINARY :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);
        $stmt->execute();
        $fail = ["fail"];
        $data = $stmt->fetch(PDO::FETCH_ASSOC);        
        $pwData = $data['pw'];
        if(!password_verify($param["pw"], $pwData)){
            return $fail;
        } else {
            $token = getToken(100);

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
        $sql = "SELECT * FROM token WHERE id = BINARY :id";
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
        $sql = "DELETE FROM token WHERE id = BINARY :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue("id", $param["userId"]);
        $stmt->execute();
        return intval($this->pdo->lastInsertId());
    }

    public function upd_user(&$param){
        $sql = "UPDATE member SET id = BINARY :cid
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":cid", $param["cid"]);
        $stmt->bindValue(":id", $param["id"]);           
        $stmt->execute();
        return $stmt->rowcount();
    }

    public function del_user(&$param){
        $sql = "DELETE FROM member WHERE id = BINARY :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id", $param["id"]);        
        $stmt->execute();
        return $stmt->rowcount();
    } 

    // 친구 찾기 //본인 제외
    public function find_friend(&$param){
        $search = $param["searchUser"];
        $id = $param['userId'];
        $sql = "SELECT id FROM (SELECT id FROM member WHERE id NOT LIKE BINARY '$id') AS t1 WHERE id LIKE BINARY '%$search%'";
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