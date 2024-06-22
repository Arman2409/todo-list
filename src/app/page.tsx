import Spinner from "./_components/common/Loading/Loading";
import AddTaskButton from "./_components/pages/main/AddTaskButton.tsx/AddTaskButton";
import TaskList from "./_components/pages/main/TaskList/TaskList";

const HomePage = () => (
    <>
      <Spinner windowLoad={true} />
      <AddTaskButton />
      <TaskList/>
    </>
);

export default HomePage;