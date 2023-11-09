import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./views/LoginPage.jsx";

import { useSelector } from "react-redux";
import TasksPage from "./views/TasksPage.jsx";
import CreateTask from "./views/CreateTask.jsx";
import TaskPage from "./views/TaskPage.jsx";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user.currentUser ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="add-task" element={<CreateTask />} />
            <Route path=":id" element={<TaskPage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
