interface Task {
  id: number;    
  text: string;
  completed?: boolean;
  time:string;
  completedTime:string|undefined;
  dueDate:string;
}
export type {Task}