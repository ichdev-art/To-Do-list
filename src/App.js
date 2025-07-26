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
      setTasks([...tasks, {text :task, done: false}]);
      setTask("");
    }
  };
  const handleDelete = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };
  return (
    <div className="App">
      <h1 className="todo">To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button type="submit">Ajouter</button>
        
      </form>
      
      <h2 class="list">Liste des tâches</h2>
      <section className="task-list">
        {tasks.length === 0 && <p>Aucune tâche à afficher</p>}
        <div className="task-count">
          <p>Tâches terminées : {tasks.filter(t => t.done).length}</p>
        </div>
        <div className="task-count">
          <p>Tâches en cours : {tasks.filter(t => !t.done).length}</p>
        </div>
        <div className="task-count">
          <p>Tâches totales : {tasks.length}</p>
        </div>
        </section>        
      <ul>
          {tasks.map((t, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => {
                  const updatedTasks = [...tasks];
                  updatedTasks[index].done = !updatedTasks[index].done;
                  setTasks(updatedTasks);
                }}
              />
              {t.done ? "✔️" : "❌"} <span className={`task-text ${t.done ? "done" : ""}`}>{t.text}</span>
              <button onClick={() => handleDelete(index)}>❌</button>
            </li>
          ))}
        </ul>
    </div>
  );
  
}

export default App;
