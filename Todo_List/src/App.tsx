import { useEffect, useState } from "react"
import InputElement from "./component/inputElement"
import ListElements from "./component/ListElements";

import type {Task} from "./types/TaskType"

function App() {
  const [inputTask,Settask]=useState<string>('')
  const [inputDate, setInputDate] = useState("");
  
  console.log(inputDate)
  const stored =  localStorage.getItem('todo')
   const [taskList, setTaskList] = useState<Task[]>(stored?JSON.parse(stored):[]);
   useEffect(()=>{
      localStorage.setItem('todo',JSON.stringify(taskList))
   },[taskList])
   useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setTaskList(prev =>
        prev.map(task => {
          const taskDue = new Date(task.dueDate);
          if (!task.completed && taskDue <= now) {
            return {
              ...task,
              completed: true,
              completedTime: now.toLocaleString(),
            };
          }
          return task;
        })
      );
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, []);

  const handleCLick =()=>{
    if(inputTask===''|| inputDate === "") {
        alert('Missing details');
        return
    }
    const newtaskList={
        id:Date.now()+Math.random(),
        text:inputTask,
        completed:false,
        time:new Date().toLocaleString(),
        completedTime:undefined,
         dueDate: inputDate,
}
   setTaskList((p)=>[...p,newtaskList])
   Settask("")
}
   
  const handleDelete = (id: number) => {
  setTaskList((prev) => prev.filter((task) => task.id !== id));
};
  return (
    <>
      <h1 className="app-title">Todo List App</h1>
      <InputElement  inputTask={inputTask}Settask={Settask} handleCLick={handleCLick} setInputDate={setInputDate}/>
      <ListElements taskList={taskList} handleDelete ={handleDelete} setTaskList={setTaskList}/>
    </>
  )
}

export default App
