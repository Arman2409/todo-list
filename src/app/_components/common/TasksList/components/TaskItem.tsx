"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { List, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, UndoOutlined } from '@ant-design/icons';

import styles from "./styles/TaskItem.module.scss";
import { changeActiveId, changeModalStatus } from '../../../../_store/slices/uiSlice';
import statusColors from './data/statusColors';
import truncateString from '../../../../../helpers/truncateString';
import type { ModalStatus } from '../../../../../types/store/uiSlice';
import type { TaskItemProps } from '../../../../../types/pages/main';

const TaskItem = ({ 
    id, 
    name, 
    description, 
    deadline, 
    status, 
    isTrash }: TaskItemProps) => {
    const dispatch = useDispatch();

    const statusColor = statusColors.get(status);

    const openModalForAction = (action: ModalStatus) => {
        dispatch(changeActiveId(id))
        dispatch(changeModalStatus(action))
    }

    return (
        <List.Item
            className={styles.task_item__main}
            actions={!isTrash ? [
                status !== "completed" && status !== "removed" && (
                    <Button
                        type="link"
                        onClick={() => openModalForAction("completing")}
                    >
                        <CheckOutlined className={styles.task_item__icon} />
                    </Button>
                ),
                <Button
                    type="link"
                    onClick={() => openModalForAction("editing")}
                >
                    <EditOutlined
                        className={styles.task_item__icon__edit}
                    />
                </Button>,
                <Button
                    danger
                    type="link"
                    onClick={() => openModalForAction("deleting")}
                >
                    <DeleteOutlined className={styles.task_item__icon} />
                </Button>,
            ] : [
                <Button
                    type="link"
                    onClick={() => openModalForAction("restoring")}
                >
                   <UndoOutlined className={styles.task_item__icon}/>
                </Button>,
            ]}
        >
            <div
                className={styles.border__cont}
                style={{
                    borderColor: statusColor
                }}
            />
            <List.Item.Meta
                title={truncateString(name, 50)}
                description={truncateString(description, 50)}
            />
            <Typography.Text
                style={{
                    marginRight: deadline ? "20px" : "135px"
                }}
                type="secondary">
                Status: <span style={{ color: statusColor }}>{status}</span>
            </Typography.Text>
            {deadline && (
                <Typography.Text
                    type="secondary">
                    Deadline: {new Date(deadline).toLocaleDateString()}
                </Typography.Text>
            )}
        </List.Item>
    )
};

export default TaskItem;