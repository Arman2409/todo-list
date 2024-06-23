import TasksList from "../_components/common/TasksList/TasksList";
import GoBackButton from "../_components/pages/trash/GoBackButton/GoBackButton";

const TrashPage = () => (
  <>
    <GoBackButton />
    <TasksList isTrash />
  </>
)

export default TrashPage;