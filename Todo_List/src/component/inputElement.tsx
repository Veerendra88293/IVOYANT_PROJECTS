
interface inputElement{
    inputTask?:string;
    Settask?:(e:string)=>void;//React.Dispatch<React.SetStateAction<string>>
    handleCLick:()=>void;
    setInputDate:(e:string)=>void   
}
function InputElement({Settask,inputTask,handleCLick,setInputDate}:inputElement) {
  return (
    <div>
        <div className="todo-input-section">
          { <input type="text" placeholder="Add a new task" value={inputTask} onChange={(e)=>Settask?.(e.target.value)}/>/*e: React.ChangeEvent<HTMLInputElement> */}
       
          <input type="datetime-local" onChange={(e) => setInputDate(e.target.value)} />
          <button onClick={handleCLick}>Add Task</button>
      </div>
      
    </div>
  )
}

export default InputElement
