import "./Workspace.css";
import serverInfo from "../../literals/serverInfo";
import Navbar from "./Components/Navbar.js";
import { useState, useEffect, useRef } from "react";
import WorkspaceNavigationPanel from "./Components/WorkspaceNavigationPanel";
import Lists from "./Components/Lists";
import { useAuth } from "../../contexts/AuthContext";

const Axios = require("axios");

function Workspace() {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const { currentUser } = useAuth();
  console.log(currentUser);
  const currentBoardRef = useRef(null);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = () => {
    Axios.get(`${serverInfo.url}/boards`, {
      params: { username: currentUser },
    }).then((res) => {
      parseBoardDataToJSON(res.data);
      setBoards(res.data);
      getLastUsedBoard(res.data);
      console.log("Fetched Boards");
      console.log(res.data);
    });
  };
  const parseBoardDataToJSON = (boards) => {
    boards.map((board) => {
      console.log(board.data);
      board.data = JSON.parse(board.data);
    });
  };

  const getLastUsedBoard = (boards) => {
    //TODO NOT YET IMPLEMENTED: for now we are just settting the last used board to the first board in the list.
    //in the future we want to have a database for each of the users and store the their last used board there.
    if (boards.length === 0) {
      setCurrentBoard(null);
    } else {
      const board = boards[0];
      setCurrentBoard(board);
      currentBoardRef.current = board;
    }
  };

  const updateBoards = () => {
    console.log("All boards updated ");
    fetchBoards();
  };
  const updateCurrentBoard = (board) => {
    //Stops board from being updated more then once per second
    const oldDate = new Date(currentBoardRef.current.updated_at);
    const newDate = new Date();
    if (oldDate.getSeconds() === newDate.getSeconds()) return;

    console.log("board updated");
    console.log(board);
    setCurrentBoard(board);
    saveBoard();
    currentBoardRef.current = board;
    currentBoardRef.current.updated_at = new Date(newDate).toISOString();
  };
  const saveBoard = () => {
    const id = currentBoard.id;
    const boardData = JSON.stringify(currentBoard.data);
    Axios.post(`${serverInfo.url}/save`, {
      id: id,
      data: boardData,
    }).then((res) => {
      console.log("saved board");
    });
  };
  const addBoard = (callback) => {
    setBoards((prev) => [...prev, callback]);
  };

  //if the boards list is empty then route the user to a create
  //board page...
  //otherwise load the previous board...
  return (
    <div className="Workspace">
      <div className="main-container">
        <WorkspaceNavigationPanel
          boards={boards}
          addBoard={addBoard}
          updateBoards={updateBoards}
          updateCurrentBoard={updateCurrentBoard}
        />
        <div className="work-space-wrapper">
          <div className="work-space-container">
            <Navbar currentBoard={currentBoard} saveBoard={saveBoard} />
            <div className="board-canvas">
              <div className="board-scroll">
                {/*Lists*/}
                <Lists
                  currentBoard={currentBoard}
                  updateCurrentBoard={updateCurrentBoard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
