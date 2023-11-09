import { Link } from "react-router-dom";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const TasksPage = () => {
  const [taskList, setTaskList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getAllTasks = async () => {
    const tasksCollectionRef = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollectionRef);

    if (!tasksSnapshot.empty) {
      const tasks = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Tasks:", tasks);
      setTaskList(tasks);
    } else {
      console.log("No tasks found!");
    }
  };

  const filteredTasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "inprogress"
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "done");
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div className="container">
      <Header pageTitle="All Tasks" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex justify-between max-w-4xl m-auto mt-4">
        <div>
          <div className="bg-black px-3 py-2 rounded text-white">TODO</div>
          {todoTasks.map((task) => (
            <Link to={`/${task.id}`} key={task.id}>
              <TaskCard task={task} />
            </Link>
          ))}
        </div>
        <div>
          <div className="bg-yellow-500 px-3 py-2 rounded text-white">
            IN-PROGRESS
          </div>
          {inProgressTasks.map((task) => (
            <Link to={`/${task.id}`} key={task.id}>
              <TaskCard task={task} />
            </Link>
          ))}
        </div>
        <div>
          <div className="bg-green-500 px-3 py-2 rounded text-white">DONE</div>
          {doneTasks.map((task) => (
            <Link to={`/${task.id}`} key={task.id}>
              <TaskCard task={task} />
            </Link>
          ))}
        </div>
        <div>
          <Link to="/add-task">
            <button className="focus:outline-none bg-pink-300 text-black font-medium tracking-wide px-4 py-2 rounded-md hover:bg-pink-200">
              ADD NEW TASK
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
