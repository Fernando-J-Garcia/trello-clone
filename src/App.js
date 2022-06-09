import "./App.css";
import Navbar from "./Components/Navbar.js";
import Card from "./Components/List.js";
import { useState } from "react";
import WorkspaceNavigationPanel from "./Components/WorkspaceNavigationPanel";

function App() {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({});

  //if the boards list is empty then route the user to a create
  //board page...
  //otherwise load the previous board...
  return (
    <div className="App">
      <div className="main-container">
        <WorkspaceNavigationPanel boards={boards} />
        <div className="work-space-container">
          <Navbar workSpaceName={"projectName"} />
          <div className="list-container">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
