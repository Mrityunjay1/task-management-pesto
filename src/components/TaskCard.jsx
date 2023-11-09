/* eslint-disable react/prop-types */
const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-2">
      <div className="font-bold text-xl mb-2">{task.title}</div>
      <p className="text-gray-700 text-base">{task.description}</p>
    </div>
  );
};

export default TaskCard;
