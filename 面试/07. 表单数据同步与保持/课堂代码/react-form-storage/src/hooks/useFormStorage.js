import { useEffect, useRef } from "react";
import FormStorage from "../utils/FormStorage";

const useFormStorage = (formId, formData, setFormData) => {
  const formStorage = useRef(
    new FormStorage(formId, { value: formData })
  ).current;

  useEffect(() => {
    formStorage.init();
    setFormData({ ...formStorage.formData.value });

    const syncFormData = (event) => {
      if (event.key === formStorage.storageKey && event.newValue) {
        setFormData(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", syncFormData);

    return () => {
      window.removeEventListener("storage", syncFormData);
    };
  }, [formStorage, setFormData]);

  useEffect(() => {
    formStorage.formData.value = formData;
    formStorage.debouncedSaveData();
  }, [formData, formStorage]);

  return formStorage;
};

export default useFormStorage;
