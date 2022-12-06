import { useState } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import "./App.css";

const CARDS_COLUMNS = [
  { code: "board", display: "BOARD", columnId: "1" },
  { code: "monday", display: "SEGUNDA-FEIRA", columnId: "2" },
  { code: "tuesday", display: "TERÇA-FEIRA", columnId: "3" },
  { code: "wednesday", display: "QUARTA-FEIRA", columnId: "4" },
  { code: "thursday", display: "QUINTA-FEIRA", columnId: "5" },
  { code: "friday", display: "SEXTA-FEIRA", columnId: "6" },
];

type ContentFormat = {
  content: String;
  id: String;
};

interface IToDoList {
  board: ContentFormat[];
  monday: ContentFormat[];
  tuesday: ContentFormat[];
  wednesday: ContentFormat[];
  thursday: ContentFormat[];
  friday: ContentFormat[];
}

const CardsContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  gap: 0px 15px;
  color: #2c3333;
`;

const DefaultPage = styled.div`
  min-height: 100vh;
  background-color: #e7f6f2;
`;

const Card = styled.div`
  h1 {
    font-size: 20px;
  }

  margin-top: 100px;
  display: flex;
  width: 16%;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  min-height: 500px;
  flex-direction: column;
  gap: 5px;
`;

const CardList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardItem = styled.li`
  list-style: none;
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  background-color: #a5c9ca;
  margin: 3px 0px;
`;

function App() {
  const [toDoLists, setToDoLists] = useState<IToDoList>({
    board: [
      { content: "example 1", id: `board-${1}` },
      { content: "example 2", id: `board-${2}` },
      { content: "example 3", id: `board-${3}` },
    ],
    monday: [
      { content: "segunda 1", id: `monday-${1}` },
      { content: "segunda 2", id: `monday-${2}` },
      { content: "segunda 3", id: `monday-${3}` },
    ],
    tuesday: [{ content: "terça", id: `tuesday-${1}` }],
    wednesday: [{ content: "quarta", id: `wednesday-${1}` }],
    thursday: [{ content: "quinta", id: `thursday-${1}` }],
    friday: [{ content: "sexta", id: `friday-${1}` }],
  });

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
      <DefaultPage>
        <CardsContainer>
          {CARDS_COLUMNS.map(({ display, code, columnId }) => (
            <Card key={code}>
              <h1>{display}</h1>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <CardList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {toDoLists[code as keyof IToDoList].map((item, index) => (
                      <Draggable
                        key={`${item.id}`}
                        draggableId={`${item.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <CardItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => console.log("hahaha")}
                          >
                            {item.content}
                          </CardItem>
                        )}
                      </Draggable>
                    ))}
                  </CardList>
                )}
              </Droppable>
            </Card>
          ))}
        </CardsContainer>
      </DefaultPage>
    </DragDropContext>
  );
}

export default App;
