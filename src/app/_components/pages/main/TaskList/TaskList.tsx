"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';

import TaskItem from './components/TaskItem';
import type { StoreState } from '../../../../_store/store';
import type { Task } from '../../../../_store/slices/tasksSlice';

const TaskList = () => {
  const { tasks } = useSelector((state: StoreState) => state.tasks);

  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks} // Filter out removed tasks
      renderItem={(task:Task) => <TaskItem {...task} />}
    />
  );
};

export default TaskList;