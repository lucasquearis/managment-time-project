import { useContext } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TaskContext } from "../../context/TasksProvider";
import { IToDoList } from "../../types";
import { CARDS_COLUMNS } from "./constats";
import { Card, CardItem, CardList, CardsContainer } from "./styles";

export default function ToDoList() {
  const { toDoLists, setToDoLists } = useContext(TaskContext);

  const changeOrderSameColumn = (
    columnName: String,
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
    sourceColumnName: String,
    destinationColumnName: String,
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
                  {toDoLists[code as keyof IToDoList].map((item, index) => (
                    <Draggable
                      key={`${item.id}`}
                      draggableId={`${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <CardItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => console.log("hahaha")}
                          isDragging={snapshot.isDragging}
                        >
                          {item.content}
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
      </CardsContainer>
    </DragDropContext>
  );
}
