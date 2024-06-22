"use client"
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { animate } from "framer-motion";

import styles from "./styles/AddTaskButton.module.scss";
import { changeModalStatus } from "../../../../_store/slices/uiSlice";


const AddTaskButton = () => {
  const dispatch = useDispatch();
  const plusIcon = useRef<HTMLButtonElement>(null);

  const openModal = () => {
    dispatch(changeModalStatus("adding"));
  }

  const handleButtonHover = () => {
    const degreesString = plusIcon.current?.style.transform.slice(7).slice(0, -4);
    animate(plusIcon.current as HTMLButtonElement, {
      transform: `rotate(${Number(degreesString) + 90}deg)`
    })
  }

  useEffect(() => {
    // .....Fix double event adding here......
    // ..... 
    document.querySelector("#add_button")?.addEventListener("mouseenter", () => handleButtonHover());
    return document.querySelector("#add_button")?.removeEventListener("mouseenter", () => handleButtonHover());
  }, [])

  return (
    <Button
      id="add_button"
      className={styles.add_task_button}
      onClick={openModal}>
      <PlusOutlined ref={plusIcon} />
    </Button>
  )
}

export default AddTaskButton;