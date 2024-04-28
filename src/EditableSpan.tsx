import {ChangeEvent, useState} from "react";


type Props = {
    oldTitle: string
    updateTitle: (newTitle: string) => void

};
export const EditableSpan = ({oldTitle, updateTitle}: Props) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(oldTitle)
    // const activateEditModeHandler=()=>{
    //     setEdit(true)
    // }
    // const deactivateEditModeHandler=()=>{
    //     setEdit(false)
    // }
    const editModeHandler=()=> {
        setEdit(!edit)
        if(edit){
            updateTitleHandler()
        }
    }
    const changeTitleHandler=(e: ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }
    const updateTitleHandler = () => {
            updateTitle(newTitle.trim())

    }

    return (
        edit
            ? <input value={newTitle} onBlur={editModeHandler} autoFocus onChange={changeTitleHandler}/>
            : <span onDoubleClick={editModeHandler}>{oldTitle}</span>

    );
};