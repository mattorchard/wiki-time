import { useMemo } from "preact/hooks";
import Debug from "./Debug";
import OrderableList from "./OrderableList";

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

    [entities]
  );
  return <OrderableList items={itemsToOrder} />;
};

export default OrderQuiz;
