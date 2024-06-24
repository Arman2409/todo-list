import React from "react";
import { Input, Space } from 'antd';

import styles from "./styles/ModalInputs.module.scss";
import type { ModalInputsProps } from "../../../../../../types/common";

const ModalInputs = ({ formik }: ModalInputsProps) => (
    <Space
        className="width-100"
        direction="vertical">
        <Input
            name="name"
            value={formik.values.name}
            placeholder="Add a new task..."
            className={styles.modal_inputs__input}
            onChange={formik.handleChange}
        />
        <Input.TextArea
            name="description"
            placeholder="Description"
            className={styles.modal_inputs__input}
            value={formik.values.description}
            autoSize={{ minRows: 2, maxRows: 3 }}
            onChange={formik.handleChange}
        />
        <input
            type="date"
            name="deadline"
            placeholder="Deadline"
            value={formik.values.deadline as any}
            className={styles.modal_inputs__date}
            onChange={(date) => {
                formik.setFieldValue('deadline', date.target.value)
            }}
        />
    </Space>
)

export default ModalInputs;