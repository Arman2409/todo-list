"use client"
import React, { useCallback, useEffect, useRef, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Space, DatePicker, message } from 'antd';
import { animate } from "framer-motion";
import { useFormik } from "formik";
import { object, string, date } from "yup";

import styles from "./styles/ActionModal.module.scss";
import titles from './data/titles';
import ModalButtons from './components/ModalButtons/ModalButtons';
import { changeModalStatus } from '../../../_store/slices/uiSlice';
import { addTask } from '../../../_store/slices/tasksSlice';
import type { StoreState } from '../../../_store/store';
import type { Task } from '../../../_store/slices/tasksSlice';

const TaskSchema = object({
  name: string().required(),
  deadline: date().required(),
  description: string(),
})

const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).slice(2, 9);
  return timestamp + randomString;
}

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { modalStatus, editId } = useSelector((state: StoreState) => state.ui)
  const { tasks } = useSelector((state: StoreState) => state.tasks)

  const modalCont = useRef<HTMLDivElement>(null);
  const demo = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      deadline: null, // Assuming date type for deadline
    },
    onSubmit: async (values: any) => {
      // Handle form submission with values object
      await TaskSchema.validate(values)
        .then(data => {
          dispatch(addTask({
            ...data,
            id: generateUniqueId(),
          }));
          dispatch(changeModalStatus(undefined))
        })
        .catch(e => {
          message.error(e.message)
        }
        )
    },
  });


  const submitForm = () => {
    formik.submitForm();
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
      const task = tasks.find(({ id }: Task) => id === editId);
      if (task) {
        const { id = "", ...rest } = { ...task };
        for (const entry in rest) {
          if (entry === "deadline") {
            // formik.setFieldValue(entry, new Date(rest[entry]).toTimeString())
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
          {titles.get(modalStatus)}
        </h2>
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
          <DatePicker
            name="deadline"
            type="date"
            placeholder="Deadline (optional)"

            value={formik.values.deadline}
            onChange={(date) => {
              formik.setFieldValue('deadline', date)
            }}
            />
        </Space>
        <ModalButtons
          modalTitle={titles.get(modalStatus) || ""}
          submitForm={submitForm}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default TaskList;