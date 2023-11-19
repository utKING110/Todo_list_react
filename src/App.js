import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoForm from './components /Todos /TodoForm';
import TodoList from './components /Todos /TodoList';
import TodosActions from './components /Todos /TodosActions';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodoHandler = (text) => {
    const newTodo = {
      text,
      isCompetede: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };
  const deleteTodoHendler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompetede: !todo.isCompetede }
          : { ...todo }
      )
    );
  };
  const resetTodoHandler = () => {
    setTodos([]);
  };
  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompetede));
  };
  const completedTodosCounte = todos.filter((todo) => todo.isCompetede).length;

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodoHandler} />
      {todos.length > 0 && (
        <TodosActions
          completedTodosExist={!!completedTodosCounte}
          resetTodos={resetTodoHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodoHendler}
        toggleTodo={toggleTodoHandler}
      />
      {completedTodosCounte > 0 && (
        <h2>{`You have completed ${completedTodosCounte} ${
          completedTodosCounte > 1 ? 'todos' : 'todo'
        }`}</h2>
      )}
    </div>
  );
}

export default App;
