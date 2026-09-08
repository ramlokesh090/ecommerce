import { useState, useRef } from "react";

export default function Todolist({onBack}) {
  const [value, setvalue] = useState("");
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(false);
  const [update, setupdate] = useState("");
  const [isUpdate, setIsupdate] = useState(false);
  const [index1, setIndex1] = useState(null);
  const inputref = useRef();
  const handleClick = () => {
    setList([...list, { completed: false, value: value }]);
    setvalue("");
    inputref.current.value = "";
  };
  return (
    <div>
      <button onClick={onBack}>back</button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 10,
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        <input
          ref={inputref}
          placeholder="enter todolist"
          onChange={(e) => setvalue(e.target.value)}
        />
        <button disabled={value === ""} onClick={handleClick}>
          Submit
        </button>
      </div>
      <div style={{display:"flex",alignItems:"flex-start",flexDirection:"column"}}>
        {list.length === 0 &&<h3 style={{display:"flex",justifyContent:"center",alignItems:"center"}}>list is Empty</h3>}
        {list.length > 0 &&
          list.map((item, index) => (
            <div
              key={item}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                margin: "20px",
                justifyContent: "center",
              }}
            >
              {index !== index1 && (
                <button
                  onClick={() => {
                    if (!item.completed) {
                      const updatedabc = [...list];
                      updatedabc[index] = {
                        completed: true,
                        value: item.value,
                      };
                      setList(updatedabc);
                    } else if (item.completed) {
                      const updatedabc1 = [...list];
                      updatedabc1[index] = {
                        completed: false,
                        value: item.value,
                      };
                      setList(updatedabc1);
                    }
                  }}
                >
                  {item.completed ? "Uncomplete" : "complete"}
                </button>
              )}
              {!item.completed && <p>{index+1} : {item.value}</p>}
              {item.completed && (
                <p>
                  <s>{index+1} : {item.value}</s>
                </p>
              )}
              {index !== index1 && !item.completed && (
                <button
                  onClick={() => setList(list.filter((abc, i) => i != index))}
                >
                  remove
                </button>
              )}
              {!isUpdate && !item.completed && (
                <button
                  onClick={() => {
                    setIsupdate(true);
                    setIndex1(index);
                    setupdate(item.value)
                  }}
                >
                  update
                </button>
              )}
              {isUpdate && index1 === index && !item.completed && (
                <div
                  style={{ display: "flex", flexDirection: "row", margin: 10 }}
                >
                  <input
                    key={index}
                    placeholder="enter updated todo"
                    onChange={(e) => setupdate(e.target.value)}
                    value={update}
                  />
                  <button
                    onClick={() => {
                      const updatedlist = [...list];
                      updatedlist[index] = {
                        completed: item.completed,
                        value: update,
                      };
                      (setList(updatedlist),
                        setIsupdate(false),
                        setupdate(""),
                        setIndex1(null));
                    }}
                  >
                    update
                  </button>
                  <button
                    onClick={() => {
                      (setIsupdate(false), setIndex1(null), setupdate(""));
                    }}
                  >
                    cancel
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
