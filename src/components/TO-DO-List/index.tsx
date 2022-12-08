import { useContext, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TaskContext } from "../../context/TasksProvider";
import { IToDoList } from "../../types";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { CARDS_COLUMNS } from "./constats";
import { Card, CardItem, CardList, CardsContainer } from "./styles";

export default function ToDoList() {
  const { toDoLists, setToDoLists } = useContext(TaskContext);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState({
    open: false,
    task: { id: "", content: "" },
    columnId: "",
  });

  const changeOrderSameColumn = (
    columnName: string,
    source: number,
    destination: number
  ) => {
    const newList = Array.from(toDoLists[columnName as keyof IToDoList]);
    const [removed] = newList.splice(source, 1);
    newList.splice(destination, 0, removed);
    setToDoLists((prevState) => ({
      ...prevState,
      [columnName as keyof IToDoList]: newList,
    }));
  };

  const changeItemColumn = (
    sourceColumnName: string,
    destinationColumnName: string,
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const newSourceList = Array.from(
      toDoLists[sourceColumnName as keyof IToDoList]
    );
    const [removed] = newSourceList.splice(sourceIndex, 1);

    const newDestinationList = Array.from(
      toDoLists[destinationColumnName as keyof IToDoList]
    );

    newDestinationList.splice(destinationIndex, 0, removed);

    setToDoLists((prevState) => ({
      ...prevState,
      [sourceColumnName as keyof IToDoList]: newSourceList,
      [destinationColumnName as keyof IToDoList]: newDestinationList,
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      const columnName = CARDS_COLUMNS.find(
        (col) => col.columnId === source.droppableId
      )?.code;

      if (columnName) {
        changeOrderSameColumn(columnName, source.index, destination.index);
      }
    }

    if (destination.droppableId !== source.droppableId) {
      const sourceColumnName = CARDS_COLUMNS.find(
        (col) => col.columnId === source.droppableId
      )?.code;

      const destinationColumnName = CARDS_COLUMNS.find(
        (col) => col.columnId === destination.droppableId
      )?.code;

      if (sourceColumnName && destinationColumnName) {
        changeItemColumn(
          sourceColumnName,
          destinationColumnName,
          source.index,
          destination.index
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CardsContainer>
        {CARDS_COLUMNS.map(({ display, code, columnId }) => (
          <Card key={code}>
            <div>
              <h1>{display}</h1>
            </div>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <CardList ref={provided.innerRef} {...provided.droppableProps}>
                  {toDoLists[code as keyof IToDoList].map((task, index) => (
                    <Draggable
                      key={`${task.id}`}
                      draggableId={`${task.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <CardItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <p>{task.content}</p>
                          <span
                            style={{
                              position: "absolute",
                              right: "5px",
                              cursor: "pointer",
                              color: "red",
                            }}
                            className="material-symbols-outlined"
                            onClick={() =>
                              setOpenConfirmDeleteModal({
                                open: true,
                                task,
                                columnId,
                              })
                            }
                          >
                            delete
                          </span>
                        </CardItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </CardList>
              )}
            </Droppable>
          </Card>
        ))}
        <ConfirmDeleteModal
          taskState={openConfirmDeleteModal}
          setTaskState={setOpenConfirmDeleteModal}
        />
      </CardsContainer>
    </DragDropContext>
  );
}
