"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button, Space, DatePicker } from 'antd';
import { animate } from "framer-motion";

import styles from "./styles/ActionModal.module.scss";
import titles from './data/titles';
import type { StoreState } from '../../../_store/store';

interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  completed: boolean;
  removed?: boolean; // Optional for handling removed tasks
}

const TaskList: React.FC = () => {
  const { modalStatus } = useSelector((state: StoreState) => state.ui)

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState<Date | undefined>(undefined);
  const modalCont = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (modalCont) {
      if (modalStatus) {
        animate(modalCont.current as HTMLDivElement, {
          left: "50%"
        });
      } else {
        animate(modalCont.current as HTMLDivElement, {
          left: "100%"
        })
      }
    }
  }, [modalStatus])

  return (
    <div
      ref={modalCont}
      className={styles.action_modal__main}>
      <h2>
        {titles.get(modalStatus)}
      </h2>
      <Input.TextArea
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Add a new task..."
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <Space direction="horizontal" style={{ marginTop: 8 }}>
        <Input.TextArea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Description (optional)"
          autoSize={{ minRows: 2, maxRows: 3 }}
        />
        <DatePicker value={newTaskDeadline} onChange={setNewTaskDeadline} placeholder="Deadline (optional)" />
        <Button type="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Space>
    </div>
  );
};

export default TaskList;