type ContentFormat = {
  content: String;
  id: String;
};

export interface IToDoList {
  board: ContentFormat[];
  monday: ContentFormat[];
  tuesday: ContentFormat[];
  wednesday: ContentFormat[];
  thursday: ContentFormat[];
  friday: ContentFormat[];
}

export interface ICardItem {
  isDragging: boolean;
}
