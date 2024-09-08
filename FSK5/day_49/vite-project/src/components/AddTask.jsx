import "../assets/scss/AddTask.scss";
import PlusIcon from "../Icons/PlusIcon";

const AddTask = ({ createTask, id }) => {
  return (
    <button className="add-task__btn" onClick={() => createTask(id)}>
      <PlusIcon /> Add Task
    </button>
  );
};

export default AddTask;
