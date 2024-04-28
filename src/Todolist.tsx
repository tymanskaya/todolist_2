import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    todolistId: string
    updateTaskTitle:(todolistId:string,taskId: string, newTitle: string)=>void
    updateTodolistTitle:(todolistId:string,newTitle:string)=>void
}

export const Todolist = (props: PropsType) => {
    const getTasksForTodolist = (tasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {
        switch (nextFilterValue) {
            case 'active':
                return tasks.filter(t => t.isDone === false);
            case 'completed':
                return tasks.filter(t => t.isDone === true);
            default:
                return tasks;
        }
    }

    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        updateTaskTitle,
        updateTodolistTitle} = props
    const tasksForTodolist = getTasksForTodolist(tasks, filter)
    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    // const addTaskHandler = () => {
    // 	if (taskTitle.trim() !== '') {
    // 		addTask(todolistId, taskTitle.trim())
    // 		setTaskTitle('')
    // 	} else {
    // 		setError('Title is required')
    // 	}
    // }

    // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // 	setTaskTitle(event.currentTarget.value)
    // }

    // const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    // 	setError(null)
    // 	if (event.key === 'Enter') {
    // 		addTaskHandler()
    // 	}
    // }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(todolistId)

    }
    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }
    const updateTodolistTitleHandler=(newTitle: string)=>{
        updateTodolistTitle(todolistId,newTitle)
    }
    const updateTaskTitleHandler = (taskId: string, newTitle: string, ) => {
        updateTaskTitle(todolistId, taskId, newTitle)
    }



    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} updateTitle={updateTodolistTitleHandler}/>
            </h3>
            <Button title={'X'} onClick={removeTodolistHandler}/>
            <AddItemForm addItem={addTaskHandler}/>
            {/*<input*/}
            {/*	className={error ? 'error': ''}*/}
            {/*	value={taskTitle}*/}
            {/*	onChange={changeTaskTitleHandler}*/}
            {/*	onKeyUp={addTaskOnKeyUpHandler}*/}
            {/*/>*/}
            {/*<Button title={'+'} onClick={addTaskHandler}/>*/}
            {/*{error && <div className={'error-message'}>{error}</div> }*/}

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasksForTodolist.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolistId, task.id, newStatusValue)
                            }
                            // const updateTaskTitleHandler = (newTitle: string) => {
                            //     updateTaskTitle(todolistId,task.id, newTitle)
                            // }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan oldTitle={task.title} updateTitle={(newTitle  )=>updateTaskTitleHandler(task.id, newTitle)}/>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
