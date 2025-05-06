export type todoItemType = {
  id: number;
  note: string;
};

export type todoNoteType = {
  note: string;
};

export type todoAddedPropType = {
  inputSubmitted: boolean;
  clearTodoNote: () => void;
  todoNote: string;
};

export type todoCompletedPropType = {
  completedTodoItem: todoNoteType;
  addBackToTheTodoItemList: (todoItem: string) => void;
};

export type todoEditPropType = {
  edit: (id: number, note: string) => void;
  remove: (id: number) => void;
  close: () => void;
  opened: boolean;
  todoItem: todoItemType;
};
