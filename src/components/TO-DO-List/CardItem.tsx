import { ICardItem } from "../../types";
import { CardContainer } from "./styles";

export default function CardItem({
  dragRef,
  draggableProps,
  dragHandleProps,
  isDragging,
  task,
  setConfirmDeleteModal,
  columnId,
}: ICardItem) {
  return (
    <CardContainer
      ref={dragRef}
      {...draggableProps}
      {...dragHandleProps}
      isDragging={isDragging}
    >
      <p>{task.content}</p>
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
