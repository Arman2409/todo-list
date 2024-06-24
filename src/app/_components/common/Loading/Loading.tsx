"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from "./styles/Loading.module.scss";
import type { LoadingProps } from '../../../../types/common';

const Loading = ({ windowLoad }: LoadingProps) => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        if (windowLoad) {
            setVisible(false);
        }
    }, [setVisible, windowLoad])

    return (
        <div
            className="demo centered_content"
            style={{
                visibility: visible ? "visible" : "hidden",
            }}>
            <Image
                width={100}
                height={100}
                src="/loading.gif"
                alt="Loading..."
            />
        </div>
    );
};

export default Loading;
