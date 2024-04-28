import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    title: string
    id: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        // const filteredTasks = tasks.filter((task) => {
        // 	return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(el => el.id !== todolistId)])

        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
        })
        // const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        // setTasks(newState)
    }
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: filterValue} : el))

        // const currentTodolist=todolists.find(t => t.id == todolistId)
        // if(currentTodolist) {
        // 	currentTodolist.filter=filterValue
        // 	setTodolists([...todolists])
        // }
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {
            id: todolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }
    const updateTaskTitle = (todolistId:string,taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id===taskId
            ?{...el, title: newTitle}
            : el
            )
        })
    }
    const updateTodolistTitle=(todolistId:string,newTitle:string) => {
        setTodolists([...todolists].map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((t) => {
                return <Todolist
                    key={t.id}
                    todolistId={t.id}
                    title={t.title}
                    tasks={tasks[t.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={t.filter}
                    removeTodolist={removeTodolist}
                    updateTaskTitle={updateTaskTitle}
                    updateTodolistTitle={updateTodolistTitle}
                />
            })}
        </div>
    );
}

// setTodolists(todolists.map(el=> el.id===todolistId ?{...el, filter:filterValue} :el))
// setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el=>el.id!==taskId)})
// 1.      Плюсы Реакта: 1. Производительность (без Реакта перерисовывается весь DOM, благодаря сравнению Виртуальных DOMов перерисовывается только необходимая часть DOM). 2. Масштабируемость (компоненты)
// 1.      Как работает Реакт (рендер-т.е. первый запуск, затем уже ререндеры): запускаем yarn start-> начнет отрисовываться index.html, запускается script->index.tsx->App.tsx (компоненты возвращают JSX)-> babel транспилятор превращает JSX в JS->создается Virtual DOM (это объект, легковесная версия DOM, у него есть только СВОЙСТВА, но нет методов, и к СВОЙСТВАМ мы доступа не имеем. DOM хранится в браузере, а Virtual DOM
// в оперативной памяти компьютера )->на основе Virtual DOM создается DOM, который отрисовывается в браузере. (Когда React создает новый виртуальный дом, он заменяет старый виртуальный дом ссылкой на новый объект в памяти. Garbage collector удаляет старый неактуальный виртуальный дом из-за отсутствия ссылок на него.)
export default App;
