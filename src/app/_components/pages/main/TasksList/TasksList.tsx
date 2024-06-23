"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';

import TaskItem from './components/TaskItem';
import type { StoreState } from '../../../../_store/store';
import type { Task } from '../../../../../types/store/tasksSlice';

const TasksList = ({ isTrash }: { isTrash: boolean }) => {
  const { tasks: storeTasks = [], trash = [] } = useSelector((state: StoreState) => state.tasks);

  const tasks = isTrash ? trash : storeTasks;

  return (
    <List
      style={{
        padding: "10px"
      }}
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={(task: Task) => <TaskItem isTrash={isTrash} {...task} />}
    />
  );
};

export default TasksList;