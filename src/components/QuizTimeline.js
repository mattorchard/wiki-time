import { useEffect, useRef, useState } from "preact/hooks";
import useElementSize from "../hooks/useElementSize";
import "./QuizTimeline.css";
import useMediaQuery from "../hooks/useMediaQuery";

const ReorderableItem = ({
  text,
  index,
  dragging,
  requestEnableDragging,
  order,
}) => {
  const [bounds, ref] = useElementSize();
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
  return (
    <li
      data-width={bounds && bounds.width}
      data-height={bounds && bounds.height}
      data-index={index}
      ref={ref}
      className={`reorderable-list__item ${dragging &&
        "reorderable-list__item--dragging"}`}
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
        className="reorderable-list__item__content"
      >
        {text}
      </div>
    </li>
  );
};

const SAMPLE_ITEMS = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
];

const QuizTimeline = ({ items = SAMPLE_ITEMS }) => {
  const isHorizontal = useMediaQuery("(min-width: 1200px)");
  const [itemsOrdered, setItemsOrdered] = useState(() =>
    items.map((item, index) => ({ item, order: index * 3 }))
  );
  const reorderRef = useRef({ relativeToIndex: null, isBefore: null });

  const [draggingIndex, setDraggingIndex] = useState(null);

  const reorderItems = (relativeToIndex, isBefore) => {
    if (
      relativeToIndex === reorderRef.current.relativeToIndex &&
      isBefore === reorderRef.current.isBefore
    ) {
      return;
    }
    setItemsOrdered(itemsOrdered => {
      const newOrder = [...itemsOrdered];
      const relativeToOrder = itemsOrdered[relativeToIndex].order;
      newOrder[draggingIndex].order = relativeToOrder + (isBefore ? -1 : 1);
      return newOrder;
    });
    reorderRef.current = { relativeToIndex, isBefore };
  };

  const handleRequestEnableDragging = index => {
    if (draggingIndex === null) {
      setDraggingIndex(index);
    }
  };

  const handleMouseMove = ({ target, offsetX, offsetY }) => {
    if (target.tagName.toLowerCase() !== "li") {
      return;
    }
    const { width, height, index } = target.dataset;
    const isLeftOf = offsetX < width / 2;
    const isAbove = offsetY < height / 2;
    const isBefore = isHorizontal ? isLeftOf : isAbove;
    reorderItems(index, isBefore);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
    setItemsOrdered(items => {
      const newOrder = items.sort((a, b) => a.order - b.order);
      newOrder.forEach((item, index) => (item.order = index * 3));
      return newOrder;
    });
  };

  return (
    <ol
      className="reorderable-list"
      onMouseMove={draggingIndex === null ? () => {} : handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {itemsOrdered.map(({ item, order }, index) => (
        <ReorderableItem
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

export default QuizTimeline;
