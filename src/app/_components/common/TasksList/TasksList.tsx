"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'antd';

import TaskItem from './components/TaskItem';
import { changeTaskStatus } from '../../../_store/slices/tasksSlice';
import isTaskOverdue from './helpers/isTaskOverdue';
import type { StoreState } from '../../../_store/store';
import type { Task } from '../../../../types/store/tasksSlice';

const TasksList = ({ isTrash }: { isTrash: boolean }) => {
  const [tasksToShow, setTasksToShow] = useState<Task[]>([]);
  const { tasks: storeTasks = [], trash = [] } = useSelector((state: StoreState) => state.tasks);
  const dispatch = useDispatch();

  const tasks = isTrash ? trash : storeTasks;

  const sortTasks = (tasksToSort: Task[]) => tasksToSort.slice().sort(
    (a: Task, b: Task) => {
      const statusOrder = { overdue: 0, pending: 1, completed: 2 };
      
      return (statusOrder[a.status as keyof typeof statusOrder] ?? 3) - (statusOrder[b.status as keyof typeof statusOrder] ?? 3);
    }
  );

  useEffect(() => {
    if (!isTrash) {
      let isUpdating = false;

      // Check for each task if the status has to be updated to overdue 
      for (let i = 0; i < tasks.length; i++) {
        const { deadline, status, id } = tasks[i];
        if (deadline) {
          if (status === 'pending' && isTaskOverdue(deadline as Date)) {
            isUpdating = true;
            dispatch(changeTaskStatus({
              id,
              status: "overdue"
            }));
            break; // Exit the loop if a status update occurs
          }
        }
      }

      // Check if the there are no more tasks to update and update the state 
      if (!isUpdating) {
        setTasksToShow(sortTasks(tasks));
      }

    }

  }, [tasks, dispatch]);

  return (
    <List
      className="padding_10"
      itemLayout="horizontal"
      dataSource={tasksToShow}
      renderItem={(task: Task) => <TaskItem isTrash={isTrash} {...task} />}
    />
  );
};

export default TasksList;