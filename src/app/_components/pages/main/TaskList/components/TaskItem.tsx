"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { List, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import styles from "./styles/TaskItem.module.scss";
import { deleteTask } from '../../../../../_store/slices/tasksSlice';
import { changeEditId, changeModalStatus } from '../../../../../_store/slices/uiSlice';
import type { Task } from '../../../../../_store/slices/tasksSlice';

const TaskItem = ({ name, description, deadline, id }: Task) => {
    const dispatch = useDispatch();

    return (
        <List.Item
            className={styles.task_item__main}
            actions={[
                <Button
                    type="link"
                    onClick={() => {
                        dispatch(changeEditId(id))
                        dispatch(changeModalStatus("editing"))
                    }} 
                >
                    <EditOutlined
                        className={styles.task_item__icon}
                        />
                </Button>,
                <Button
                    danger
                    type="link"
                    onClick={() => dispatch(deleteTask(id))}
                >
                    <DeleteOutlined className={styles.task_item__icon}/>
                </Button>,
            ]}
        >
            <List.Item.Meta
                title={name}
                description={description}
            />
            {deadline && (
                <Typography.Text
                    type="secondary">
                    Deadline: {deadline.toLocaleDateString()}
                </Typography.Text>
            )}
        </List.Item>
    )
};

export default TaskItem;