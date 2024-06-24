"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'antd';

import { statusPriorities } from '../../../../configs/main';
import { changeTaskStatus } from '../../../_store/slices/tasksSlice';
import isTaskOverdue from './helpers/isTaskOverdue';
import TaskItem from './components/TaskItem';
import type { StoreState } from '../../../_store/store';
import type { Task } from '../../../../types/store/tasksSlice';

const TasksList = ({ isTrash }: { isTrash: boolean }) => {
  const [tasksToShow, setTasksToShow] = useState<Task[]>([]);
  const { tasks, trash = [] } = useSelector((state: StoreState) => state.tasks);
  const dispatch = useDispatch();

  const sortTasks = (tasksToSort: Task[]) => tasksToSort.slice().sort(
    ({ status: status1 }: Task, { status: status2 }: Task) => {
      // Object for keeping the priority of tasks by their status 

      return (statusPriorities[status1 as keyof typeof statusPriorities] ?? 3)
        - (statusPriorities[status2 as keyof typeof statusPriorities] ?? 3);
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
  }, [tasks, dispatch, isTrash]);

  return (
    <List
      className="padding_10"
      itemLayout="horizontal"
      dataSource={!isTrash ? tasksToShow : trash}
      renderItem={(task: Task) => (
        <TaskItem isTrash={isTrash} {...task} />
      )}
    />
  );
};

export default TasksList;