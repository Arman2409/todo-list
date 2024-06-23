import Spinner from "./_components/common/Loading/Loading";
import TasksButtons from "./_components/pages/main/TasksButtons/TasksButtons";
import TasksList from "./_components/common/TasksList/TasksList";

const HomePage = () => (
    <>
      <Spinner windowLoad={true} />
      <TasksButtons />
      <TasksList isTrash={false} />
    </>
);

export default HomePage;