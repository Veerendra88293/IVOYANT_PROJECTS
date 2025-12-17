import React from 'react';
import type { Task } from '../types/TaskType';


interface List {
  taskList: Task[];
  handleDelete :(id:number)=>void;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  
  
}

function ListElements({taskList,handleDelete ,setTaskList}: List){
  const pendingTasks = taskList.filter(task => task.completed===false);
  const completedTasks = taskList.filter(task => task.completed===true);
  console.log(taskList);
  console.log(completedTasks)
  const toggleTask =(id:number)=>{
    setTaskList((prev)=>
    prev.map(task=>{
        if(typeof task.completedTime==='string'){
                return task.id===id?{...task,completed:!task.completed,completedTime:undefined}:{...task,completedTime:new Date().toLocaleString()}
        } 
        return task.id===id?{...task,completed:!task.completed,completedTime:new Date().toLocaleString()}:{...task,completedTime:undefined}
})
    )  
  
}

  return (
    <div className="todo-lists-section">
      <div className="card1">
        <h2 className="pendingHeading">Pending Tasks</h2>
        <ul>
          {pendingTasks.length>0?(pendingTasks.map((task) => (
            <li key={task.id} className="AllList">
              <span style={{backgroundColor:'red',borderRadius:'10px'} }>-</span>
              <div  className='divv'>
                <input className='pointer inputt' 
                  type="checkbox"
                  id={task.id.toString()}
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                
                <label className='pointer' htmlFor={task.id.toString()} style={{textDecoration:task.completed?'line-through':'none'}}>{task.text}</label>
              </div>
              <p className="task-time">
  Due Date: {new Date(task.dueDate).toLocaleString()}
</p>           
              <button id={task.id.toString()} onClick={()=>handleDelete(task.id)}>Delete</button>
            </li>
          ))):(
            <h1 style={{backgroundColor:'#f9f9f9',color:'grey',fontSize:'20px',textAlign:'center'}}>there are no pending Tasks</h1>
          )}
        </ul>
      </div>

      <div className="card2">
        <h2 className="pendingHeading">Completed Tasks</h2>
        <ul>
          {completedTasks.length<1?<h1 style={{backgroundColor:'#f9f9f9',color:'grey',fontSize:'20px',textAlign:'center'}}>there are no Completed Tasks</h1>:completedTasks.map((task) => (
            <li key={task.id} className="AllList">
              <span style={{backgroundColor:'red',borderRadius:'10px'} }>-</span>
              <div className='divv'>
                <input className='pointer inputt'
                  type="checkbox"
                  id={task.id.toString()}
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <label className='pointer' htmlFor={task.id.toString()} style={{textDecoration:task.completed?'line-through':'none'}}>{task.text}</label>
              </div>
              <p className="task-time">Completed Time:{task.completedTime}</p>
              

              <button id={task.id.toString()} onClick={()=>handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    
  );
}

export default ListElements;
