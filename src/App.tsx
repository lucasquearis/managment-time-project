import "./App.css";
import ToDoList from "./components/TO-DO-List";
import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "./context/TasksProvider";
import { v4 } from "uuid";
import { Button } from "@mui/material";

const HomeContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  color: #2c3333;
  min-height: 100vh;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 30px;
  flex-direction: column;
  gap: 10px;
`;

const InputContainer = styled.form`
  display: flex;
  gap: 5px;
  input {
    :focus-visible {
      outline: none;
    }
    padding: 5px;
  }
`;

function App() {
  const { toDoLists, setToDoLists } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");

  const addTaskOnBoard = (taskName: string) => {
    const newBoard = Array.from(toDoLists.board);
    newBoard.push({ content: taskName, id: v4() });
    setToDoLists((prevState) => ({ ...prevState, board: newBoard }));
  };

  return (
    <HomeContainer>
      <TitleContainer>
        <h1>To-Do Semanal</h1>
        <p>Adicione uma tarefa ao board</p>
        <InputContainer>
          <input
            value={taskName}
            onChange={({ target: { value } }) => setTaskName(value)}
            placeholder="Dê um título a tarefa"
            autoFocus
          />
          <Button
            type="submit"
            disabled={taskName.length <= 0}
            onClick={() => {
              addTaskOnBoard(taskName);
              setTaskName("");
            }}
            variant="contained"
          >
            Enviar ao board
          </Button>
        </InputContainer>
      </TitleContainer>
      <ToDoList />
    </HomeContainer>
  );
}

export default App;
