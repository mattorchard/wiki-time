import { useEffect, useRef, useState } from "preact/hooks";
import "./OrderableList.css";
import useDocumentEvent from "../hooks/useDocumentEvent";

const OrderableListItem = ({
  text,
  index,
  order,
  dragging,
  requestEnableDragging,
}) => {
  const isInCorrectPosition = index === order;
  const [dragDetails, setDragDetails] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const handleMouseDown = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setDragDetails({
      width: bounds.width,
      height: bounds.height,
      x: event.offsetX,
      y: event.offsetY,
    });
    requestEnableDragging(index);
  };
  const handleTouchStart = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const [touch] = event.touches;

    setDragDetails({
      width: bounds.width,
      height: bounds.height,
      x: touch.pageX - touch.target.offsetLeft,
      y: touch.pageY - touch.target.offsetTop,
    });
    requestEnableDragging(index);
  };

  return (
    <li
      data-index={index}
      className={`orderable-list__item ${dragging &&
        "orderable-list__item--dragging"} orderable-list__item--${
        isInCorrectPosition ? "correct" : "incorrect"
      }`}
      style={{
        "--drag-x": dragDetails.x,
        "--drag-y": dragDetails.y,
        "--drag-width": dragDetails.width,
        "--drag-height": dragDetails.height,
        "--index": index,
        "--order": order,
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="orderable-list__item__content"
      >
        {text}
      </div>
    </li>
  );
};

const OrderableList = ({ items, isShowingAnswers }) => {
  const [itemsOrdered, setItemsOrdered] = useState(items);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const lastOverIndexRef = useRef(null);

  useEffect(() => setItemsOrdered(items), [items]);
  useDocumentEvent("mouseup", () => setDraggingIndex(null));
  useDocumentEvent("touchend", () => setDraggingIndex(null));

  const reorderItems = overIndex => {
    if (lastOverIndexRef.current === overIndex) {
      return;
    }
    lastOverIndexRef.current = overIndex;
    if (overIndex === draggingIndex) {
      // No reordering needs to be done
      return;
    }

    setItemsOrdered(itemsOrdered => {
      const draggingOrder = itemsOrdered[draggingIndex].order;
      const overOrder = itemsOrdered[overIndex].order;
      const nextItemsOrdered = itemsOrdered.map(({ item, order }) => {
        if (order > draggingOrder) {
          // Shift down one, as the dragging one is being removed from the order
          order -= 1;
        }
        if (order >= overOrder) {
          // Shift up one as this is where the dragged one is going to be inserted
          order += 1;
        }
        return { item, order };
      });
      // Put the dragged one where the dragged-over over one is
      nextItemsOrdered[draggingIndex].order = overOrder;
      return nextItemsOrdered;
    });
  };

  const handleRequestEnableDragging = index => {
    if (draggingIndex === null) {
      setDraggingIndex(index);
    }
  };

  const handleMouseMove = ({ target }) => {
    const listItem = target.closest
      ? target.closest("li")
      : target.parentElement.closest("li");
    if (!listItem) {
      return;
    }
    const { index } = listItem.dataset;
    reorderItems(parseInt(index));
  };

  const handleTouchMove = event => {
    event.preventDefault();
    const [{ clientX, clientY }] = event.touches;
    handleMouseMove({
      target: document.elementFromPoint(clientX, clientY),
    });
  };

  return (
    <ol
      className={`orderable-list ${draggingIndex === null ||
        "orderable-list--dragging"} ${isShowingAnswers &&
        "orderable-list--show-answers"}`}
      onMouseMove={draggingIndex === null ? null : handleMouseMove}
      onTouchMove={draggingIndex === null ? null : handleTouchMove}
    >
      {itemsOrdered.map(({ item, order }, index) => (
        <OrderableListItem
          text={item}
          index={index}
          order={order}
          key={item}
          requestEnableDragging={handleRequestEnableDragging}
          dragging={index === draggingIndex}
        />
      ))}
    </ol>
  );
};

export default OrderableList;
