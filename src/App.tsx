import "./App.css";
import ToDoList from "./components/TO-DO-List";
import styled from "styled-components";
import { useContext, useState } from "react";
import { TaskContext } from "./context/TasksProvider";
import { v4 } from "uuid";

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

const InputContainer = styled.div`
  display: flex;
  gap: 5px;
  input {
    text-align: center;
    :focus-visible {
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
  }
`;

function App() {
  const { toDoLists, setToDoLists } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");

  const addTaskOnBoard = (taskName: String) => {
    console.log({ taskName });
    console.log({ toDoLists });
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
            onChange={({ target: { value } }) => setTaskName(value)}
            placeholder="Dê um título a tarefa"
          />
          <button onClick={() => addTaskOnBoard(taskName)}>
            Enviar ao board
          </button>
        </InputContainer>
      </TitleContainer>
      <ToDoList />
    </HomeContainer>
  );
}

export default App;
