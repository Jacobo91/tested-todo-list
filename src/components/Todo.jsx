import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todosSlice";
import { useState } from "react";



export default function Todo({ id, description }){

    const [update, setUpdate] = useState("");
    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeTodo(id));
    }

    const handleTodoUpdate = (e) => {
        e.preventDefault();
        if(!update) return;
        dispatch(updateTodo({ update, id }));
        setUpdate("");
        setEdit("");
    }

    return(
        <li key={id} data-testid="todo" id={id} className="center-elem">
            {description}
            {
                edit && (
                <form
                    action=""
                    data-testid="todo-form"
                    onSubmit={(e) => handleTodoUpdate(e, id)}
                >
                    <input
                        type="text"
                        placeholder="Rename todo..."
                        className="text-indent"
                        data-testid="todo-input"
                        onChange={(e) => setUpdate(e.target.value)}
                    />
                    <button
                        type="submit"
                        data-testid="todo-submit"
                        className="edit-btn"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </form>)
            }
            <div
                className="li-controls"
            >
                <button
                    data-testid="edit-btn"
                    onClick={() => setEdit(function(prev){ return prev = !prev})}
                >
                    {
                        !edit ? <i className="fa-solid fa-pen-to-square"></i> : <i className="fa-solid fa-xmark"></i>
                    }
                </button>
                <button
                    data-testid="remove-btn"
                    onClick={() => handleRemove(id)}
                >
                    {
                        !edit && (<i className="fa-solid fa-trash"></i>)
                    }
                </button>
            </div>
        </li>
    );
}