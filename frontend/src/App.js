import { useState } from "react";
import axios from "axios";

//MVC 테스트용

const App = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  //insert
  const insert = async () => {
    const param = {
      'id' : {id}.id,
      'pw' : {pw}.pw
    }
    console.log(param);
    try {
      const result = await axios.post("backend/user/ins_user", param);
      setId('');
      setPw('');
      console.log(result);
    } catch {
      console.error("통신 실패");
    }
  };

  //select
  const select = async () => {
    try {
      const result = await axios.get("MVC/backend/user/sel_user", );
      const data = result.data.result;
      console.log(data);
    } catch {
      console.error("통신 실패");
    }
  };
  
  //update
  const update = async () => {
    const param = {
      'id' : {id}.id,
      'cid' : {pw}.pw
    }
    try {
      //console.log(`${{id}.id} ${{pw}.pw}`);
      if(!{id}.id == '' && !{pw}.pw == ''){
        const result = await axios.post("MVC/backend/user/upd_user", param);
        console.log(result);
        setId('');
        setPw('');
      } else {
        alert("두 값을 모두 입력하세요.");
      }
    } catch {
      console.error("통신 실패");
    }
  }

  //delete
  const deldata = async () => {
    try {
      const param = {
        'id' : {id}.id
      }
      console.log(param);
      const result = await axios.put("MVC/backend/user/del_user", param);
      console.log(result);
    } catch {
      console.error("통신 실패");
    }
  };
  

  return (
    <div>
      <input type="text" value={id} onChange={(e) => {
        e.preventDefault();
        setId(e.target.value);
      }}></input>

      <input type="password" value={pw} onChange={(e) => {
        e.preventDefault();
        setPw(e.target.value);
      }}></input>
      <div><button onClick={insert}>insert</button></div> 
      <div><button onClick={select}>select</button></div>
      <div><button onClick={update}>update</button></div>
      <div><button onClick={deldata}>delete</button></div>
    </div>
  );
}

export default App;