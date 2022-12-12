import { Checkbox } from "@mui/material";
import { useState } from "react";
import { ICardItem } from "../../types";
import { CardContainer, TaskName } from "./styles";

export default function CardItem({
  dragRef,
  draggableProps,
  dragHandleProps,
  isDragging,
  task,
  setConfirmDeleteModal,
  columnId,
}: ICardItem) {
  const [isChecked, setIsChecked] = useState(false);
  return (
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
        />
        <p>{task.content}</p>
      </TaskName>
      <span
        className="material-symbols-outlined"
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
    </CardContainer>
  );
}
