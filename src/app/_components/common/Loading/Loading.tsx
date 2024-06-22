"use client"
import React, { useState, useEffect } from 'react';

import styles from "./styles/Loading.module.scss";

const Loading = ({ windowLoad }: { windowLoad: boolean }) => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        if (windowLoad) {
            setVisible(false);
        }
    }, [setVisible])

    return (
        <div
            className="demo centered_content"
            style={{
                visibility: visible ? "visible" : "hidden",
            }}>
              <img 
              src="/loading.gif" 
              className={styles.loading__image}/>
        </div>
    );
};

export default Loading;
