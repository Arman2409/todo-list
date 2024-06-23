"use client"
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Space, message } from 'antd';
import { animate } from "framer-motion";
import { useFormik } from "formik";
import { object, string, date } from "yup";

import styles from "./styles/ActionModal.module.scss";
import { changeModalStatus } from '../../../_store/slices/uiSlice';
import { addTask, completeTask, deleteTask, editTask } from '../../../_store/slices/tasksSlice';
import titles from './data/titles';
import generateUniqueId from './helpers/generateUniqueId';
import ModalButtons from './components/ModalButtons/ModalButtons';
import type { StoreState } from '../../../_store/store';
import type { Task } from '../../../../types/store/tasksSlice';

const TaskSchema = object({
  name: string().required(),
  deadline: date(),
  description: string(),
})

const TaskList = () => {
  const dispatch = useDispatch();
  const { modalStatus = undefined, activeId } = useSelector((state: StoreState) => state.ui)
  const { tasks = [] } = useSelector((state: StoreState) => state.tasks)

  const modalCont = useRef<HTMLDivElement>(null);
  const demo = useRef<HTMLDivElement>(null);

  const isConfirm = modalStatus === "deleting" || modalStatus === "completing" || modalStatus === "restoring";
  const modalTitle = titles.get(modalStatus) || "Modify";

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      deadline: null,
    },
    onSubmit: async (values: any) => {
      // Handle form submission with values object
      await TaskSchema.validate(values)
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
        })
        .catch(e => {
          message.error(e.message)
        }
        )
    },
  });


  const submit = () => {
    if (modalStatus === "adding" || modalStatus === "editing") {
      return formik.submitForm();
    }
    if (modalStatus === "deleting") {
      dispatch(deleteTask(activeId));
      closeModal();
    }
    if (modalStatus === "completing") {
      dispatch(completeTask(activeId));
      closeModal();
    }
  }

  const closeModal = useCallback(() => {
    dispatch(changeModalStatus(undefined));
  }, [changeModalStatus, dispatch])

  useEffect(() => {
    if (modalCont) {
      if (modalStatus) {
        animate(modalCont.current as HTMLDivElement, {
          left: styles.should_animate_left
        });
        if (demo) {
          animate(demo.current as HTMLDivElement, {
            opacity: 0.5
          });
        }
      } else {
        formik.setValues({
          name: "",
          date: "",
          description: ""
        });
        animate(modalCont.current as HTMLDivElement, {
          left: "100%"
        })
        if (demo) {
          animate(demo.current as HTMLDivElement, {
            opacity: 0
          });
        }
      }
    }
    if (modalStatus === "editing") {
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
          : <>
            <Input.TextArea
              name="name"
              value={formik.values.name}
              placeholder="Add a new task..."
              autoSize={{ minRows: 2, maxRows: 6 }}
              onChange={formik.handleChange}
            />
            <Space direction="horizontal" style={{ marginTop: 8 }}>
              <Input.TextArea
                name="description"
                placeholder="Description (optional)"
                value={formik.values.description}
                autoSize={{ minRows: 2, maxRows: 3 }}
                onChange={formik.handleChange}
              />
              <input
                type="date"
                name="deadline"
                placeholder="Deadline (optional)"
                value={formik.values.deadline}
                onChange={(date) => {
                  formik.setFieldValue('deadline', date.target.value)
                }}
              />
            </Space>
          </>}
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