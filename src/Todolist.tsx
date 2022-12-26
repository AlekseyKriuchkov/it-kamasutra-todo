import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from "./App";


type TodolistPropsType = {
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.map((task: TaskType) => {
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(task.id, e.currentTarget.checked)
    }
    const isDoneClasses = task.isDone ? "isDone" : "notIsDone"
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeTaskStatus}
                />
                <span className={isDoneClasses}>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const trimTittle = title.trim()
        if (trimTittle){
            props.addTask(trimTittle);
        } else {
            setError(true)
        }
        setTitle("")
    };
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    };
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask();

    const getOnClickFilterTasks = (filter: FilterValueType) => () => {props.changeFilter(filter)}

    const errorMessageStyle = {color: "red", margin: 0, marginTop: 5}
    const errorMessage = <div style={errorMessageStyle}>Please Enter Task Tittle</div>
return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={setLocalTitle}
                onKeyDown={onKeyDown}
                className={error ? "inputError" : undefined}
            />
            <button onClick={addTask}>+</button>
            {error && errorMessage}
        </div>
        <ul>
            {tasksItems}
        </ul>
        <div>
            <button className={props.filter === "All" ? "activeFilter" : ""} onClick={getOnClickFilterTasks("All")}>All</button>
            <button className={props.filter === "Active" ? "activeFilter" : ""} onClick={getOnClickFilterTasks("Active")}>Active</button>
            <button className={props.filter === "Completed" ? "activeFilter" : ""} onClick={getOnClickFilterTasks("Completed")}>Completed</button>
        </div>
    </div>
)};

export default Todolist;