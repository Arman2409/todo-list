"use client"
import React, { useState } from 'react';
import { List, Button, Checkbox, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  completed: boolean;
  removed?: boolean; // Optional for handling removed tasks
}

const TaskList = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState<Date | undefined>(undefined);

  const handleAddTask = () => {
    if (newTaskTitle) {
      // onAddTask({
      //   id: Math.random().toString(), // Generate a temporary ID
      //   title: newTaskTitle,
      //   description: newTaskDescription,
      //   deadline: newTaskDeadline,
      //   completed: false,
      //   removed: false, // Initially not removed
      // });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDeadline(undefined);
    }
  };

  const handleEditTask = (task: Task) => {
    // onEditTask({ ...task }); // Spread operator to avoid mutation
  };

  const handleDeleteTask = (taskId: string) => {
    // onDeleteTask(taskId);
  };

  const handleMarkComplete = (taskId: string) => {
    // onMarkComplete(taskId);
  };

  const renderTaskItem = (task: Task) => (
    <List.Item
      actions={[
        <Button type="link" onClick={() => handleEditTask(task)}>
          <EditOutlined />
        </Button>,
        <Button type="link" danger onClick={() => handleDeleteTask(task.id)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={
          <Checkbox checked={task.completed} onChange={() => handleMarkComplete(task.id)}>
            {task.title}
          </Checkbox>
        }
        description={task.description}
      />
      {task.deadline && (
        <Typography.Text type="secondary">Deadline: {task.deadline.toLocaleDateString()}</Typography.Text>
      )}
    </List.Item>
  );

  return (
      <List
        itemLayout="horizontal"
        // dataSource={tasks.filter((task) => !task.removed)} // Filter out removed tasks
        renderItem={renderTaskItem}
      />
  );
};

export default TaskList;