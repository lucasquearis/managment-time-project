import ReactDOM from "react-dom/client";
import App from "./App";
import TasksProvider from "./context/TasksProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TasksProvider>
    <App />
  </TasksProvider>
);
