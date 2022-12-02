import React, { useState, useEffect } from "react";

const urlBase = "https://assets.breatheco.de/apis/fake/todos/user";
const initialState = {
  label: "",
  done: false,
};
const TodoList = () => {
  const [tasksList, setTaskList] = useState([]);
  const [task, setTask] = useState(initialState);

  const handlerTask = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handlerKeyPress = (event) => {
    if (event.key == "Enter") {
      if (task != "") {
        crearTarea();
      }
    }
  };
  // primer fetch traer tarea
  const traeTareas = async () => {
    try {
      const respuesta = await fetch(`${urlBase}/miguelgilf`);
      const data = await respuesta.json();
      console.log(data);
      if (respuesta.status != 404) {
        setTaskList(data);
      } else {
        crearUsuario();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // tercer fetch crear tarea
  const crearTarea = async () => {
    try {
      const respuesta = await fetch(`${urlBase}/miguelgilf`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...tasksList, task]),
      });
      if (respuesta.ok) {
        traeTareas();
        setTask(initialState);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // segundo fetch crear usuario
  const crearUsuario = async () => {
    try {
      const respuesta = await fetch(`${urlBase}/miguelgilf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });
      if (respuesta.ok) {
        traeTareas();
      }
    } catch (error) {
      console.log(error);
    }
  };
// cuarto fetch borrar tarea
  const handlerButtomDelete = async (indexid) => {
    let updatedTaskList = tasksList.filter((tarea, index) => indexid != index);
    const respuesta = await fetch(`${urlBase}/miguelgilf`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTaskList),
    });
    if (respuesta.ok) {
      traeTareas();
    }
  };

  useEffect(() => {
    traeTareas();
  }, []);
  return (
    <div className="card" id="card">
      <div className="form-floating mb-3">
        <input
          onChange={handlerTask}
          value={task.label}
          name="label"
          onKeyDown={handlerKeyPress}
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Put Task"
        />
        <label htmlFor="floatingInput">Put Task</label>
        {tasksList.map((tarea, i) => {
          return (
            <div className="Card card m-1" key={i}>
              <div className="modal-header d-flex justify-content-between">
                <h4 className="modal-title">{tarea.label}</h4>
                <button
                  type="button"
                  className="btn-close btn-danger"
                  value={task.label}
                  name="label"
                  onClick={(event) => handlerButtomDelete(i)}
                ></button>
              </div>
            </div>
          );
        })}
        <div className="card m-1">{tasksList.length} pending items</div>
      </div>
    </div>
  );
};

export default TodoList;
