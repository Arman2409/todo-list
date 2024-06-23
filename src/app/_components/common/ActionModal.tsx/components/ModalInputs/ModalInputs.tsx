import React from "react";
import { Input, Space } from 'antd';

import type { ModalInputsProps } from "../../../../../../types/common";


const ModalInputs = ({ formik }: ModalInputsProps) => (
    <>
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
                value={formik.values.deadline as any}
                onChange={(date) => {
                    formik.setFieldValue('deadline', date.target.value)
                }}
            />
        </Space>
    </>
)

export default ModalInputs;