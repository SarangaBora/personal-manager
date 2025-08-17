import { useEffect, useState } from "react";
import { useDate } from "../contexts/selectedDateContext";
import { useLogin } from "../contexts/loginContext";

// function Notes() {
//     const { selectedDate } = useDate()// Reminder: useDate is a defined function to call useContext(DateProvider)

//     const hours = () => {
//         const notesByHours = []
//         for (let hr = 0; hr < 24; hr++) {
//             notesByHours.push(<div className={`timeSlot ${hr}`} >
//                 <div className="time-hr" key={`hr-${hr}`}>{hr}:00</div>
//                 <div className="note-hr" key={`text-${hr}`}>Text wrt to {hr}</div>
//             </div>)
//         }
//         return notesByHours
//     }
//     return (
//         <div className="notes">Notes to be set here
//             {console.log(`Message from NOTES- ${selectedDate.getDate()}`)}

//             {hours()}
//         </div>

//     )
// }


function Notes() {
    const [newTask,setNewTask]=useState({
        task:"",
        start:"",
        end:""
    })
    const [tasks,setTasks]= useState([])

 
    //context
    const {selectedDate} =useDate()
    

    useEffect(()=>{
       
        const fetchTasks= async() =>{
            const res = await fetch("",
            {
                method:"GET",
                credentials:"include",
            
            }.then(res=>res.json())
            .then(data=>{
                setTasks(tasks.append(data))
            })
         )
         if(!res.ok)
         {
            throw new Error("Error fetching tasks from the server! Try again")
         }
        }
       
       
       try{
         fetchTasks()
       }
       catch (e)
       {
        console.log(e)
       }
         
       
    },[selectedDate])




    const handleAddTask=(e)=>{
        e.preventDefault()

        if(newTask.task=="")
        {
            alert("Enter a task!")
            return
        }
        if(newTask.task && newTask.start && newTask.end && newTask.start<newTask.end){

            setTasks((prev)=>[...prev,newTask])
            setNewTask({task:"",start:"",end:""})

        }
        else{
            alert("Please enter valid details.")
        }

    }

    const renderTasks=(tasks)=>{
        
        return tasks.map((task,index) => (
            <div className="task-box">Task:{task.task} ; Start: {task.start};end :{task.end} </div>
            
        ));
    }

    return (
        <div className="notes">
            <div className="add-note">
                <input type="text" 
                    placeholder="Enter task"
                    value={newTask.task}
                    onChange={(e)=>setNewTask({...newTask,task:e.target.value})}
                    />
                <input type="time" 
                    placeholder="Enter start time"
                    value={newTask.start}
                    onChange={(e)=>setNewTask({...newTask,start:e.target.value})}
                    />
                <input type="time" 
                    placeholder="Enter task"
                    value={newTask.end}
                    onChange={(e)=>setNewTask({...newTask,end:e.target.value})}
                    />
                <button onClick={handleAddTask}>Add a new task</button>
            </div>
            {console.log(tasks)}

            <div className="note-list">
                {renderTasks(tasks)}
            </div>
        </div>
    )

}
export default Notes;