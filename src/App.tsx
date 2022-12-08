import "./App.css";
import ToDoList from "./components/TO-DO-List";
import styled from "styled-components";

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
  return (
    <HomeContainer>
      <TitleContainer>
        <h1>To-Do Semanal</h1>
        <p>Adicione uma tarefa ao board</p>
        <InputContainer>
          <input placeholder="Dê um título a tarefa" />
          <button>Enviar ao board</button>
        </InputContainer>
      </TitleContainer>
      <ToDoList />
    </HomeContainer>
  );
}

export default App;
