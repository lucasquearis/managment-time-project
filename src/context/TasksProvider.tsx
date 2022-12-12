import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
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
    board: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  useEffect(() => {
    const toDoBoard = localStorage.getItem("board-todo");
    if (toDoBoard) {
      setToDoLists(JSON.parse(toDoBoard));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("board-todo", JSON.stringify(toDoLists));
  }, [toDoLists]);

  const value = { toDoLists, setToDoLists };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
