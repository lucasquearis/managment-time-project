import { Dispatch, SetStateAction } from "react";

type TaskFormat = {
  content: string;
  id: string;
};

export interface IToDoList {
  board: TaskFormat[];
  monday: TaskFormat[];
  tuesday: TaskFormat[];
  wednesday: TaskFormat[];
  thursday: TaskFormat[];
  friday: TaskFormat[];
}

export interface ICardItem {
  isDragging: boolean;
}

export interface IConfirmDeleteModal {
  taskState: { open: boolean; task: TaskFormat; columnId: string };
  setTaskState: Dispatch<
    SetStateAction<{
      open: boolean;
      task: TaskFormat;
      columnId: string;
    }>
  >;
}
