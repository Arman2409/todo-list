import { useDispatch } from "react-redux";
import { useCallback } from "react";

import { deleteTask, changeTaskStatus, restoreTask } from "../../../../_store/slices/tasksSlice";
import type { UseSubmitProps } from "../../../../../types/pages/main";

const useSubmitForm = ({ modalStatus, activeId, formik, closeModal }: UseSubmitProps) => {
  const dispatch = useDispatch();

  const submit = useCallback(() => {
    switch (modalStatus) {
      case "adding":
      case "editing":
        formik.submitForm();
        break;
      case "deleting":
        dispatch(deleteTask(activeId));
        closeModal();
        break;
      case "completing":
        dispatch(changeTaskStatus({id: activeId, status: "completed"}));
        closeModal();
        break;
      case "restoring":
        dispatch(restoreTask(activeId));
        closeModal();
        break;
      default:
        break;
    }
  }, [modalStatus, activeId, formik, closeModal, dispatch]);

  return submit;
};

export default useSubmitForm;