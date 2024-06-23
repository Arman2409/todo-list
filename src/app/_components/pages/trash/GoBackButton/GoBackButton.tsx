"use client"
import { useRouter } from "next/navigation";
import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined";

import styles from "./styles/GoBackButton.module.scss";

const GoBackButton = () => {
    const router = useRouter();

    const goBack = () => router.push("/");

    return (
        <div 
         className={styles.go_back__main} 
         onClick={goBack}>
           <LeftOutlined className={styles.go_back__icon}/>
        </div>
    )
}

export default GoBackButton;