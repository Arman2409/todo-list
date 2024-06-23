"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./styles/PageTitle.module.scss";
import pagesData from "./data/pagesInfo";

const PageTitle = () => {
    const [title, setTitle] = useState<string>("");
    const [icon, setIcon] = useState<ReactNode|null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const pageData = pagesData.get(pathname);
        if (pageData) {
            const { title: pageTitle, icon: pageIcon } = pageData;
            setTitle(pageTitle);
            setIcon(pageIcon);
        }
    }, [pathname, setTitle, setIcon])

    return (
        <div className={styles.page_title_main}>
            {icon}
            <h2 className={styles.page_title__text}>
              {title}
            </h2>
        </div>
    )
}

export default PageTitle;