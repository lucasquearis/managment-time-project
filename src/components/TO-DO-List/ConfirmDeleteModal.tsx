import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { TaskContext } from "../../context/TasksProvider";
import { IConfirmDeleteModal, IToDoList, TaskFormat } from "../../types";
import { CARDS_COLUMNS } from "./constats";

export default function ConfirmDeleteModal({
  taskState,
  setTaskState,
}: IConfirmDeleteModal) {
  const { toDoLists, setToDoLists } = useContext(TaskContext);

  const removeTask = (task: TaskFormat, columnId: string) => {
    const newList = toDoLists[columnId as keyof IToDoList].filter(
      ({ id }) => id !== task.id
    );
    setToDoLists((prevState) => ({
      ...prevState,
      [columnId as keyof IToDoList]: newList,
    }));
  };

  return (
    <Dialog
      open={taskState.open}
      onClose={() =>
        setTaskState({
          open: false,
          task: { id: "", content: "" },
          columnId: "",
        })
      }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{ display: "inline-block", wordBreak: "break-word" }}
        id="alert-dialog-title"
      >
        {`Apagar a tarefa ${taskState.task.content} ?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{ display: "inline-block", wordBreak: "break-word" }}
          id="alert-dialog-description"
        >
          {`Você está prestes a apagar todos os registros da tarefa "${
            taskState.task.content
          }" da tabela de ${
            CARDS_COLUMNS.find(
              (column) => column.columnId === taskState.columnId
            )?.display
          }, essa ação é irreversível.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            setTaskState({
              open: false,
              task: { id: "", content: "" },
              columnId: "",
            })
          }
        >
          Não apagar
        </Button>
        <Button
          onClick={() => {
            removeTask(taskState.task, taskState.columnId);
            setTaskState({
              open: false,
              task: { id: "", content: "" },
              columnId: "",
            });
          }}
          autoFocus
        >
          Apagar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
