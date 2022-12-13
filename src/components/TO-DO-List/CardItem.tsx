import { Button, Checkbox, Modal, Typography } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import moment from "moment";
import { FormEvent, useContext, useState } from "react";
import { ICardItem, IToDoList } from "../../types";
import {
  CardContainer,
  FooterCard,
  IconsContainer,
  MoreInfosTaskContainer,
  TaskName,
} from "./styles";
import { TaskContext } from "../../context/TasksProvider";

export default function CardItem({
  dragRef,
  draggableProps,
  dragHandleProps,
  isDragging,
  task,
  setConfirmDeleteModal,
  columnId,
}: ICardItem) {
  const { setToDoLists, toDoLists } = useContext(TaskContext);
  const [isChecked, setIsChecked] = useState(false);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [moreInfoTask, setMoreInfoTask] = useState({
    editing: true,
    content: "",
  });

  const onEditTask = (event: FormEvent) => {
    event.preventDefault();
    if (moreInfoTask.editing) {
      setMoreInfoTask((prevState) => ({
        ...prevState,
        editing: false,
      }));
      const newList = Array.from(toDoLists[columnId as keyof IToDoList]);
      const indexEditedTask = newList.findIndex((item) => item.id == task.id);
      newList[indexEditedTask].moreInfos = moreInfoTask.content;

      setToDoLists((prevState) => ({ ...prevState, [columnId]: newList }));
      return;
    }
    setMoreInfoTask((prevState) => ({
      ...prevState,
      editing: true,
    }));
  };

  return (
    <>
      <CardContainer
        ref={dragRef}
        isDragging={isDragging}
        {...draggableProps}
        {...dragHandleProps}
      >
        <TaskName isChecked={isChecked}>
          <Checkbox
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
            style={{ padding: 0, paddingRight: 9 }}
          />
          <p>{task.content}</p>
        </TaskName>
        <FooterCard>
          <p>{`Inicio: ${moment(task.date).format("DD/MM/YY - hh:mm")}`}</p>
          <IconsContainer>
            <span
              className="material-symbols-outlined more"
              onClick={() => setOpenMoreInfo(true)}
            >
              more_horiz
            </span>
            <span
              className="material-symbols-outlined delete"
              onClick={() =>
                setConfirmDeleteModal({
                  open: true,
                  task,
                  columnId,
                })
              }
            >
              delete
            </span>
          </IconsContainer>
        </FooterCard>
      </CardContainer>
      <Modal
        open={openMoreInfo}
        onClose={() => setOpenMoreInfo(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MoreInfosTaskContainer>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Informações complementares - ${task.content}`}
          </Typography>
          <form onSubmit={onEditTask}>
            {moreInfoTask.editing ? (
              <Textarea
                minRows={2}
                placeholder={`Digite as informações complementares da tarefa "${task.content}"...`}
                size="md"
                variant="outlined"
                required
                value={moreInfoTask.content}
                sx={{ my: 1 }}
                autoFocus
                onChange={({ target: { value } }) =>
                  setMoreInfoTask((prevState) => ({
                    ...prevState,
                    content: value,
                  }))
                }
              />
            ) : (
              <p>{moreInfoTask.content}</p>
            )}
            <Button type="submit">
              {moreInfoTask.editing ? "Enviar" : "Editar"}
            </Button>
          </form>
        </MoreInfosTaskContainer>
      </Modal>
    </>
  );
}
