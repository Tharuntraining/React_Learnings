import React, { useEffect, useState } from 'react';
import CreateTaskPopup from '../modal-popups/createTaskPopup';
import Card from './Card';
import TaskCard from './Card';
interface TaskObject {
    taskName: string;
    description: string;
    taskStatus: number
}
const ViewTasks = () => {
    const [taskList, setTaskList] = useState<TaskObject[]>([]);


    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj)
        }
    }, [])
    const deleteTask = (index: any) => {
        let tempList = taskList;
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList)
        window.location.reload()
    }
    const updateTaskList = (obj: any, index: any) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList)
        window.location.reload()
    }


    return (
        <>

            <div className='task-container'>
                {taskList && taskList.map((obj, index) => <TaskCard taskObject={obj} index={index} deleteTask={deleteTask} updateTaskList={updateTaskList} />)}
            </div>

        </>
    );
};

export default ViewTasks;