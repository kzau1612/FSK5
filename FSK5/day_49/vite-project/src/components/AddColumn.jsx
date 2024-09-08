import "../assets/scss/AddColumn.scss";
import PlusIcon from "../Icons/PlusIcon";

const AddColumn = ({ createNewColumn }) => {
  return (
    <button className="add-column__btn" onClick={createNewColumn}>
      <PlusIcon /> <span>Add Column</span>
    </button>
  );
};

export default AddColumn;
