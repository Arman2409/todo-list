"use client"
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "antd/lib/button";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { animate } from "framer-motion";

import styles from "./styles/TasksButtons.module.scss";
import { changeModalStatus } from "../../../../_store/slices/uiSlice";


const AddTaskButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const plusIcon = useRef<HTMLButtonElement>(null);
  const trashIcon = useRef<HTMLButtonElement>(null);
  const animatingElements = useRef<string[]>([])

  const openModal = () => {
    dispatch(changeModalStatus("adding"));
  }

  const handleButtonHover = (
    element: HTMLButtonElement | null,
    degrees: number,
    name: "add" | "trash") => {
    if (element) {
      if (animatingElements.current.includes(name)) {
        return;
      }
      animatingElements.current.push(name);
      const degreesString = element["style"].transform.slice(7).slice(0, -4);
      animate(element as HTMLButtonElement, {
        transform: `rotate(${Number(degreesString) + degrees}deg)`,
      },
        {
          ease: "easeInOut",
        }).then(() => {
          animatingElements.current = animatingElements.current.filter(
            elem => elem !== name
          );
        })
    }
  }

  const goToTrash = () => {
    router.push("/trash");
  }

  useEffect(() => {
    document.querySelector("#add_button")?.addEventListener(
      "mouseenter",
      () => handleButtonHover(plusIcon.current, 90, "add")
    );
    document.querySelector("#trash_button")?.addEventListener(
      "mouseenter",
      () => handleButtonHover(trashIcon.current, 360, "trash")
    );
  }, [])

  return (
    <div className={styles.tasks_buttons__cont}>
      <Button
        id="add_button"
        className={styles.add_task_button}
        onClick={openModal}>
        <PlusOutlined ref={plusIcon} />
      </Button>
      <Button
        id="trash_button"
        className={styles.trash_button}
        onClick={goToTrash}>
        <DeleteTwoTone ref={trashIcon} />
      </Button>
    </div>
  )
}

export default AddTaskButton;