/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import Header from "../components/Header";
import { db } from "../firebase/config";
import { useNavigate, useParams } from "react-router-dom";

const TaskPage = () => {
  const [formValues, setFormValues] = useState({
    title: null,
    description: null,
    status: null,
    assignedUser: null,
    deadline: null,
  });
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getUserList = async () => {
    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);

    if (!usersSnapshot.empty) {
      const users = usersSnapshot.docs.map((doc) => doc.data());
      setUserList(users);
      console.log("Users:", users);
    } else {
      console.log("No users found!");
    }
  };

  const getTaskDetails = async () => {
    const taskRef = doc(db, "tasks", id);
    const taskSnapshot = await getDoc(taskRef);

    if (taskSnapshot.exists()) {
      const task = { id: taskSnapshot.id, ...taskSnapshot.data() };
      setFormValues(task);
      console.log("Task:", task);
    } else {
      console.log("No task found!");
    }
  };

  useEffect(() => {
    getUserList();
    getTaskDetails();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskRef = doc(db, "tasks", id);
      await setDoc(
        taskRef,
        {
          title: formValues.title,
          description: formValues.description,
          status: formValues.status,
          assignedUser: formValues.assignedUser,
          deadline: formValues.deadline,
        },
        { merge: true }
      );
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
      navigate("/");
    } catch (err) {
      console.error("Error deleting task: ", err);
    }
  };

  return (
    <div className="container">
      <Header pageTitle="Create Task" />
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={formValues.title}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={formValues.description}
        />
        <select
          className="border p-2 w-full"
          onChange={handleChange}
          name="status"
          value={formValues.status}
        >
          <option value="">Select status</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          className="border p-2 w-full"
          onChange={handleChange}
          name="assignedUser"
          value={formValues.assignedUser}
        >
          <option value="">Assign user</option>
          {/* Replace with actual user options */}
          {userList.map((user) => (
            <option key={user.uid} value={user.uid}>
              {user.email}
            </option>
          ))}
        </select>
        <input
          className="border p-2 w-full"
          type="date"
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          name="deadline"
          value={formValues.deadline}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Task
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => deleteTask(id)}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default TaskPage;
