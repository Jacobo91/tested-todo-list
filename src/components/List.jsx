import { useSelector } from "react-redux";
import { selectTodosSlice } from "../features/todosSlice";
import Todo from "./Todo";



export default function List(){
    const todosArray = useSelector(selectTodosSlice);

    if(!todosArray || todosArray.length === 0){
        return <p></p>
    };

    return(
        <ul
            data-testid="list"
        >
            {
                todosArray.map(todo => {
                    const { id, description } = todo;
                    return(
                        <Todo key={id} id={id} description={description}/>
                    );
                })
            }
        </ul>
    );
}


