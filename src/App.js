import "./App.css";
import Navbar from "./Components/Navbar.js";
import Card from "./Components/List.js";
import { useState, useEffect } from "react";
import WorkspaceNavigationPanel from "./Components/WorkspaceNavigationPanel";
const Axios = require("axios");

function App() {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({});

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = () => {
    Axios.get("http://localhost:3001/boards").then((res) => {
      setBoards(res.data);
      console.log(res.data[0].board);
    });
  };

  const updateBoards = () => {
    console.log("boards updated ");
    fetchBoards();
  };
  const updateCurrentBoard = (callback) => {
    setCurrentBoard(callback);
  };
  const addBoard = (callback) => {
    setBoards((prev) => [...prev, callback]);
  };

  //if the boards list is empty then route the user to a create
  //board page...
  //otherwise load the previous board...
  return (
    <div className="App">
      <div className="main-container">
        <WorkspaceNavigationPanel
          boards={boards}
          addBoard={addBoard}
          updateBoards={updateBoards}
          updateCurrentBoard={updateCurrentBoard}
        />
        <div className="work-space-container">
          <Navbar workSpaceName={"projectName"} currentBoard={currentBoard} />
          <div className="list-container">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
