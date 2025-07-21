import { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("myTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };
  const handleDelete = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };
  return (
    <div className="App">
      <h1>Ma To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button type="submit">Ajouter</button>
        
      </form><ul>
          {tasks.map((t, index) => (
            <li key={index}>
              {t}
              <button onClick={() => handleDelete(index)}>❌</button>
            </li>
          ))}
        </ul>
    </div>
  );
  
}

export default App;
