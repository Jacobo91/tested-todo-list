import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todosSlice";
import generateUniqueId from "../utils/generateUniqueId";

export default function Form(){
    const [textInput, setTextInput] = useState("");
    const dispatch = useDispatch();

    const handleSumbission = (e) => {
        e.preventDefault();
        if(!textInput) return;
        const newTodo = {
            id: generateUniqueId(),
            description:  textInput,
        }
        dispatch(addTodo(newTodo));
        setTextInput("");
    }
    return(
    <form 
        action=""
        data-testid="form"
        onSubmit={handleSumbission}
        className="main-form center-elem"
    >
        <input 
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            data-testid="text-input"
            className="main-input text-indent"
            placeholder="Write task here..."
        />
        <button
            type="submit"
            data-testid="add-btn"
            className="add-btn"
        >
            <i className="fa-solid fa-plus"></i>
        </button>
    </form>
    );
}