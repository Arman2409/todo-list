import { Button } from "antd";

import styles from "./styles/ModalButtons.module.scss";

const ModalButtons = ({ modalTitle, closeModal, submitForm }: any) => (
    <div className={styles.modal_buttons__main}>
        <Button
            ghost
            onClick={submitForm}
            className={styles.modal_buttons__button}
        >
            {modalTitle.slice(0, -5)}
        </Button>
        <Button
            danger
            className={styles.modal_buttons__button}
            onClick={closeModal}
        >
            Cancel
        </Button>
    </div>
)

export default ModalButtons;