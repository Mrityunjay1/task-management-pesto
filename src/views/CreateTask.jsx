import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [formValues, setFormValues] = useState({
    title: null,
    description: null,
    status: null,
    assignedUser: null,
    deadline: null,
  });
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    getUserList();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add task to database
      await addDoc(collection(db, "tasks"), {
        title: formValues.title,
        description: formValues.description,
        status: formValues.status,
        assignedUser: formValues.assignedUser,
        deadline: formValues.deadline,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
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
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          onChange={handleChange}
          name="description"
        />
        <select
          className="border p-2 w-full"
          onChange={handleChange}
          name="status"
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
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
