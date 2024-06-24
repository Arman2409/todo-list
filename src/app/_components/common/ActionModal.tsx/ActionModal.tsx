"use client"
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { animate } from "framer-motion";
import { useFormik } from "formik";

import styles from "./styles/ActionModal.module.scss";
import truncateString from '../../../../helpers/truncateString';
import { changeModalStatus } from '../../../_store/slices/uiSlice';
import { addTask, editTask } from '../../../_store/slices/tasksSlice';
import titles from './data/titles';
import generateUniqueId from './helpers/generateUniqueId';
import TaskSchema from './schemas/taskSchema';
import ModalButtons from './components/ModalButtons/ModalButtons';
import ModalInputs from './components/ModalInputs/ModalInputs';
import useSubmitForm from './hooks/useSubmitForm';
import type { StoreState } from '../../../_store/store';
import type { Task } from '../../../../types/store/tasksSlice';
import type { TaskValues } from './schemas/taskSchema';

const TaskList = () => {
  const dispatch = useDispatch();
  const { modalStatus, activeId } = useSelector((state: StoreState) => state.ui)
  const { tasks = [] } = useSelector((state: StoreState) => state.tasks)

  const modalCont = useRef<HTMLDivElement>(null);
  const demo = useRef<HTMLDivElement>(null);

  // Check if the modal is for confirmation of data entry 
  const isConfirm = modalStatus === "deleting" || modalStatus === "completing" || modalStatus === "restoring";
  const modalTitle = titles.get(modalStatus) || "Modify";

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      //  Use "unknown" type here to prevent convertion of falsy values into a date
      deadline: "" as unknown,
    } as TaskValues,
    onSubmit: async (values: TaskValues) => {
      // Handle form submission with values object
      try {
        TaskSchema.validate(values)
          .then(data => {
            dispatch(
              modalStatus === "adding" ?
                addTask({
                  ...data,
                  id: generateUniqueId(),
                }) :
                editTask({
                  ...data,
                  id: activeId
                })
            );
            closeModal();
          }).catch((err: unknown) => {
            const { message: errMessage = "Error Occured" } = { ...(err as Object) }
            message.warning(truncateString(errMessage, 250))
          })
      } catch (err: unknown) {
        const { message: errMessage = "Error Occured" } = { ...(err as Object) }
        message.warning(truncateString(errMessage, 250))
      }
    },
  });

  const closeModal = useCallback(() => {
    dispatch(changeModalStatus(undefined));
  }, [dispatch])

  const submit = useSubmitForm({
    modalStatus,
    activeId,
    formik,
    closeModal
  });

  useEffect(() => {
    if (modalStatus) {
      animate(modalCont && modalCont.current as HTMLDivElement, {
        left: styles.should_animate_left
      });
      animate(demo && demo.current as HTMLDivElement, {
        opacity: 0.5
      });
      if (modalStatus === "editing") {
        // Find the task by the given ID 
        const task = tasks.find(({ id }: Task) => id === activeId);
        if (task) {
          const { id = "", ...rest } = { ...task };
          for (const entry in rest) {
            if (entry === "deadline") {
              formik.setFieldValue(entry, new Date(rest[entry]).toISOString().slice(0, 10));
            } else {
              formik.setFieldValue(entry, rest[entry]);
            }
          }
        }
      }
    } else {
      // Unset form values when closing the modal 
      formik.setValues({
        name: "",
        deadline: "" as unknown,
        description: ""
      } as TaskValues);
      animate(modalCont.current as HTMLDivElement, {
        left: "100%"
      })
    }
    // eslint-disable-next-line
  }, [modalStatus])

  return (
    <>
      <div
        className="demo"
        ref={demo}
        style={{
          visibility: modalStatus ? "visible" : "hidden",
        }}
        onClick={closeModal}
      ></div>
      <div
        ref={modalCont}
        className={styles.action_modal__main}>
        <h2 className={styles.action_modal__title}>
          {modalTitle}
        </h2>
        {isConfirm ?
          <h3 className={styles.action_modal__confirm_text}>
            Are you sure you want to {modalTitle.toLowerCase()}
          </h3>
          : <ModalInputs formik={formik} />}
        <ModalButtons
          modalTitle={modalTitle}
          isConfirm={isConfirm}
          submit={submit}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default TaskList;