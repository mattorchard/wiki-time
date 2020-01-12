const createBubbleHandler = (
  dataFieldName,
  callback,
  { preventDefault = false } = {}
) => event => {
  const ancestor =
    event.target.closest && event.target.closest(`[data-${dataFieldName}]`);
  if (!ancestor) {
    return;
  }
  if (preventDefault) {
    event.preventDefault();
  }
  const value = ancestor.getAttribute(`data-${dataFieldName}`);
  callback(value);
};

export default createBubbleHandler;
