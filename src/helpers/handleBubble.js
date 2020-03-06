const createBubbleHandler = (
  dataFieldName,
  callback,
  { preventDefault = false } = {}
) => event => {
  const selector = `[data-${dataFieldName}]`;
  const ancestor = event.target.closest
    ? event.target.closest(selector)
    : event.target.parentElement.closest(selector);
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
