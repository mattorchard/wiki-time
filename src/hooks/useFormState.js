import { useState, useCallback } from "preact/hooks";

const getInputValue = inputElement => {
  if (inputElement.type === "checkbox") {
    return inputElement.checked;
  }
  return inputElement.value;
};

const useFormState = (initialState = {}) => {
  const [state, setState] = useState(initialState);
  const onChangeFactory = useCallback(
    fieldName => ({ currentTarget }) => {
      const value = getInputValue(currentTarget);
      setState(state => ({ ...state, [fieldName]: value }));
    },
    [setState]
  );
  return [state, onChangeFactory];
};

export default useFormState;
