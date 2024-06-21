"use client"
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./styles/AddTaskButton.module.scss";
import { changeModalStatus } from "../../../../_store/slices/uiSlice";

const AddTaskButton = () => {
    const dispatch = useDispatch();

    const openModal = useCallback(() => {
      dispatch(changeModalStatus("adding"));
    }, [dispatch, changeModalStatus])

    return (
        <div 
         className={styles.add_task_button__main}
         onClick={openModal}>
           <PlusOutlined />
        </div>
    )
}

export default AddTaskButton;