import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "All" | "Completed" | "Active"
function App() {
    const todolistTitle: string = "Menu"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "TypeScript", isDone: true},
        {id: v1(), title: "Native", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValueType>("All")

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }
    const changeFilter = (value:FilterValueType) => {
        setFilter(value)
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
      const nextState = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks(nextState)
    }

    let tasksForTodolist = tasks;
    if (filter === "Completed"){
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === "Active"){
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                filter={filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                title={todolistTitle}
                tasks={tasksForTodolist}
                changeStatus={changeStatus}
            />
        </div>
    );
};

export default App;
