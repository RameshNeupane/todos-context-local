import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

const App = () => {
    const [todos, setTodos] = useState([]);

    // add todo
    const addTodo = (todo) => {
        setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos]);
    };

    // update todo
    const updateTodo = (id, todo) => {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        );
    };

    // delete todo
    const deleteTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== id)
        );
    };

    // toggle complete
    const toggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        );
    };

    // get todos from local storage
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    // set todos to local storage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider
            value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
        >
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                        Manage Your Todos
                    </h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3 w-full">
                        {todos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
};

export default App;
