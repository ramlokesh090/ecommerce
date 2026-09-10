import React, { useState, useRef } from "react";
// import {Text} from "react";
import "./css/App.css";
// import { ScrollView, View } from "react-native";
 import { useNavigate } from "react-router-dom";

const users = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
  { id: 3, name: "Bob", age: 35 },
];
export default function App() {
  const [text, setText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [number, setNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [password, setPassword] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    setText("");
    setCheckbox(false);
    setNumber(null);
    setDate(null);
    setPassword(null);
    setSelectedUser(null);
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = null;
    }
  };

const handleRoute = () => {
  navigate("/Newpage");
};
  return (
    <div style={{ display: "flex", minHeight:"100vh", flexDirection: "column",overflow:"scroll" }}>
      <div
        style={{ marginTop: "20px", display: "flex" }}
        width="100%"
        height="100%"
      >
        <p className="abc">Hello, World!</p>
        <p className="def">World, hello!!</p>
      </div>
      <div className="container">
        <div>
          <input
            value={text || ""}
            placeholder="Enter text here..."
            onChange={(e) => setText(e.target.value)}
            // onBlur={() => alert("Text field blurred")}
            onFocus={() => setText("Text field focused")}
            minHeight="20%"
          />
          <button onClick={() => alert(text)}>Click</button>
        </div>
        <div>
          <select
            value={selectedUser?.id || ""}
            onChange={(e) =>
              setSelectedUser(
                users.find((user) => user.id === parseInt(e.target.value)),
              )
            }
          >
            <option>Select a value</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => alert(selectedUser?.name || "No user selected")}
          >
            Click
          </button>
        </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              value={checkbox || ""}
              type="checkbox"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
            />
            <p>Accept terms and conditions</p>
            <button onClick={() => alert(checkbox)}>Click</button>
        </div>
        <div>
          <input
            value={number || ""}
            type="number"
            placeholder="Enter a number..."
            onChange={(e) => setNumber(e.target.value)}
            height="20%"
          />
          <button onClick={() => alert(number)}>Click</button>
        </div>
        <div>
          <input
            value={date || ""}
            type="date"
            placeholder="Enter a date..."
            onChange={(e) => setDate(e.target.value)}
            height="20%"
            // readOnly={true}
          />
          <button onClick={() => alert(date)}>Click</button>
        </div>
        <div>
          <input
            value={password || ""}
            type="password"
            placeholder="Enter a password..."
            onChange={(e) => setPassword(e.target.value)}
            height="20%"
            // disabled={true}
          />
          <button onClick={() => alert(password)}>Click</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <input
          // value={file || ""}
            ref={fileRef}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={() => {
              setFile(null);
              fileRef.current.value = null;
            }}
          >
            remove
          </button>
          <button onClick={() => alert(file?.name || "No file selected")}>
            Click
          </button>
          {/* eg: {name: "resume.pdf",size: 20000,type: "application/pdf"} like this it is stored */}
          {/*
          fileInputRef.current = {
   type: "file",
   value: "C:\\fakepath\\lokesh.pdf",
   files: [...]
}*/}
          {/*  every react component have its own ref value okay that in the remove button we used the value to remove the value from the browser*/}
          {/* {file && (
            <div>
              <p>Name: {file.name}</p>
              <p>Size: {file.size}</p>
              <p>Type: {file.type}</p>
            </div>
          )} */}
        </div>
      </div>
      <div style={{ marginTop: "20px",display: "flex",gap:"10px",alignSelf:"center" }}>
        <button
          style={{
            background: "grey",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={handleForm}
        >
          Reset
        </button>
        <button
          style={{
            background: "blue",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
           onClick={handleRoute}
        >
          Submit
        </button>
        <button
          style={{
            background: "blue",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
           onClick={() => {
            setCount(count + 1);
          }}
        >
          Count
        </button>
      </div>
      <div>
        <p>Count: {count}</p>
      </div>
    </div>
  );
}
