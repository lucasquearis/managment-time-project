import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { IToDoList } from "../types";

interface IProps {
  toDoLists: IToDoList;
  setToDoLists: Dispatch<SetStateAction<IToDoList>>;
}

export const ResizeDefaultValue: IProps = {
  toDoLists: {
    board: [],
    monday: [],
    tuesday: [],
    thursday: [],
    wednesday: [],
    friday: [],
  },
  setToDoLists: () => 0,
};

export const TaskContext = createContext(ResizeDefaultValue);

export default function TasksProvider({ children }: { children: ReactNode }) {
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

  const value = { toDoLists, setToDoLists };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
