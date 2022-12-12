import { Dispatch, SetStateAction } from "react";
import { DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import { ITaskState, TaskFormat } from "../../types";

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

export interface ITaskState {
  open: boolean;
  task: TaskFormat;
  columnId: string;
}

export interface IConfirmDeleteModal {
  taskState: { open: boolean; task: TaskFormat; columnId: string };
  setTaskState: Dispatch<SetStateAction<ITaskState>>;
}

export interface ICardItem {
  dragRef: (HTMLElement) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  draggableProps: DraggableProvidedDraggableProps;
  isDragging: boolean;
  task: TaskFormat;
  setConfirmDeleteModal: Dispatch<SetStateAction<ITaskState>>;
  columnId: string;
}

export interface ITaskName {
  isChecked: boolean;
}
