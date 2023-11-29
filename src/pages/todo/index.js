import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Todo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faPlus, faCircleCheck, faBan } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Todo() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [editTask, setEditTask] = useState(0);
  const [taskNameUpdate, setTaskNameUpdate] = useState('');
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos((prevTodos) => [...prevTodos, ...storedTodos]);
  }, []);
  useEffect(() => {
    // Save todos to local storage whenever the todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  let handleAddTask = () => {
    setEditTask(0);
    console.log('call here');
    if (taskName.trim() !== '') {
      let newTaskId;
      if (todos.length > 0) {
        let lastTask = todos.slice(-1);
        newTaskId = lastTask[0].taskid + 1;
      } else {
        newTaskId = 1;
      }
      let list = [...todos, { taskid: newTaskId, taskName: taskName }];
      setTodos(list);
      setTaskName('');
    } else {
      alert('pls input task name first');
      setTaskName('');
    }
  };

  let handleInputTaskName = (e) => {
    setTaskName(e.target.value);
  };

  let handleDeleteTask = (task) => {
    console.log('call delete taskid = ', task.taskid);
    let newList = todos.filter((todo) => todo.taskid !== task.taskid);
    // console.log(newList);
    setTodos(newList);
  };
  let handleUpdateTask = (updateID) => {
    let newList = todos.map((todo) => {
      if (todo.taskid === updateID && taskNameUpdate !== '') {
        todo.taskName = taskNameUpdate;
      }
      return todo;
    });
    // console.log(newList);
    setTodos(newList);
    setEditTask(0);
  };
  return (
    <div className={cx('todo-app')}>
      {/* add new task */}
      <div className={cx('add-task')}>
        <h1>Add new task</h1>
        <div className={cx('add-task_input')}>
          <input type="text" name="" id="" value={taskName} onChange={handleInputTaskName} />{' '}
          <button onClick={handleAddTask}>
            Add <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      {/* list task todo */}
      <div className={cx('todo-list')}>
        <h1>Task list</h1>
        {todos.map((todo) => {
          return todo.taskid === editTask ? (
            <div className={cx('todo-item')} key={todo.taskid}>
              <input
                type="text"
                name=""
                id=""
                value={taskNameUpdate === '' ? todo.taskName : taskNameUpdate}
                onChange={(e) => setTaskNameUpdate(e.target.value)}
              />
              <span className={cx('save-task')} onClick={() => handleUpdateTask(todo.taskid)}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              <span className={cx('cancle-edit-task')} onClick={() => setEditTask(0)}>
                <FontAwesomeIcon icon={faBan} />
              </span>
            </div>
          ) : (
            <div className={cx('todo-item')} key={todo.taskid}>
              <span className={cx('task-name')}>{todo.taskName}</span>
              <span className={cx('edit-task')} onClick={() => setEditTask(todo.taskid)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              <span className={cx('delete-task')} onClick={() => handleDeleteTask(todo)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
