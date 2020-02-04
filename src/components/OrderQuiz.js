import { useMemo, useState } from "preact/hooks";
import OrderableList from "./OrderableList";
import ToggleSwitch from "./ToggleSwitch";
import "./OrderQuiz.css";

const getOrderableEntities = entities =>
  entities.filter(entity => entity.startYear || entity.startYear === 0);

const chooseRandom = array => Math.floor(Math.random() * array.length);

const entitiesCollide = (entityA, entityB) =>
  Math.abs(entityA.startYear - entityB.startYear) < 2;

const chooseEntitiesToOrder = (orderableEntities, amount) => {
  const entitiesToChooseFrom = [...orderableEntities];
  const entities = [];
  while (entities.length < amount && entitiesToChooseFrom.length > 0) {
    const randomIndex = chooseRandom(entitiesToChooseFrom);
    const randomEntity = entitiesToChooseFrom[randomIndex];
    entitiesToChooseFrom.splice(randomIndex, 1);

    if (!entities.some(entity => entitiesCollide(entity, randomEntity))) {
      entities.push(randomEntity);
    }
  }
  return entities;
};

const shuffleOrder = array => {
  array.forEach(current => {
    const currentOrder = current.order;
    const otherIndex = Math.floor(Math.random() * array.length);
    current.order = array[otherIndex].order;
    array[otherIndex].order = currentOrder;
  });
  return array;
};

const entityComparator = (entityA, entityB) =>
  entityA.startYear - entityB.startYear;

const OrderQuiz = ({ entities }) => {
  const [isShowingAnswers, setIsShowingAnswers] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const orderableEntities = useMemo(() => getOrderableEntities(entities), [
    entities,
  ]);
  const itemsToOrder = useMemo(
    () =>
      shuffleOrder(
        chooseEntitiesToOrder(orderableEntities, 5)
          .sort(entityComparator)
          .map((entity, index) => ({
            item: entity.name,
            order: index,
          }))
      ),

    [entities, questionNumber]
  );
  return (
    <div className="order-quiz">
      <div className="order-quiz__actions">
        <ToggleSwitch
          onLabel="Show Answers"
          offLabel="Hide Answers"
          onChange={e => setIsShowingAnswers(e.currentTarget.checked)}
          value={isShowingAnswers}
        />
        <button
          className="btn"
          type="button"
          onClick={() => {
            setQuestionNumber(number => number + 1);
            setIsShowingAnswers(false);
          }}
        >
          Next Question
        </button>
      </div>
      <OrderableList items={itemsToOrder} isShowingAnswers={isShowingAnswers} />
    </div>
  );
};

export default OrderQuiz;
