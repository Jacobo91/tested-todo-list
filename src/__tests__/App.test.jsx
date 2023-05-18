import { renderWithProviders } from "../utils/utils-for-tests";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../app/App";
import Form from "../components/Form";
import List from "../components/List";


describe("App.jsx", () => { 
    it("renders App", () => { 
        renderWithProviders(<App />);
    });

    it("Form.jsx is rendered in the app", () => { 
        renderWithProviders(<App />);
        const Form = screen.getByTestId("form");
        expect(Form).toBeInTheDocument();
    });

    it("List.jsx is not rendered on App initialization", () => { 
        renderWithProviders(<App />);
        const List = screen.queryByTestId("list");
        expect(List).toBeNull();
    });
})

describe("Form.jsx", () => { 
    it("text input value initialize with value='' ", () => { 
        renderWithProviders(<Form />);
        const input = screen.getByDisplayValue("");
        expect(input).toBeInTheDocument();
    });

    it("when user types in the input Form's local state changes", () => { 
        renderWithProviders(<Form />);
        const input = screen.getByDisplayValue("");

        fireEvent.change(input, {target: {value: 'Hello'}})
        expect(input.value).toBe("Hello")
    });
})

describe("List.jsx", () => { 
    it("no todo element is rendered on initialization", () => { 
        renderWithProviders(<List />);
        const todo = screen.queryByTestId("todo");
        expect(todo).toBeNull();
    });
})

describe("List.jsx", () => { 

    it("when Form is submitted a new todo is rendered in the List containing a remove button and todo gets remove after clicking it", async () => { 
        renderWithProviders(<App />);
        const input = screen.getByTestId("text-input");
        const addBtn = screen.getByTestId("add-btn");

        fireEvent.change(input, { target: { value: "visit grand ma"}});
        fireEvent.click(addBtn);

        const todo = await screen.findByTestId("todo");
        expect(todo).toBeInTheDocument();

        const removeBtn = screen.getByTestId("remove-btn");
        expect(removeBtn).toBeInTheDocument();
        
        fireEvent.click(removeBtn);
        await waitFor(() => { 
            const todoItem = screen.queryByTestId("todo");
            expect(todoItem).toBeNull();
        })
        
    });

    it("when todo renders it contains an edit button, when it is clicked todo-form appears, after this form is submitted todo gets updated", async () => { 
        renderWithProviders(<App />);
        const input = screen.getByTestId("text-input");
        const addBtn = screen.getByTestId("add-btn");

        fireEvent.change(input, { target: { value: "visit grand ma"}});
        fireEvent.click(addBtn);

        const todo = await screen.findByTestId("todo");
        expect(todo).toBeInTheDocument();

        const editBtn = screen.getByTestId("edit-btn");
        expect(editBtn).toBeInTheDocument();

        fireEvent.click(editBtn);
        const editForm = await screen.findByTestId("todo-form");
        expect(editForm).toBeInTheDocument();

        const todoInput = screen.getByTestId("todo-input");
        const todoSubmit = screen.getByTestId("todo-submit");
        fireEvent.change(todoInput, { target: { value: "updated todo" } });
        fireEvent.click(todoSubmit);

        const updatedTodo = await screen.findByText("updated todo");
        expect(updatedTodo).toBeInTheDocument();

    });

});