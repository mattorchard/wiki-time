import { useMemo } from "preact/hooks";
import "./MatchQuiz.css";

const questionNumber = 1;

const chooseRandom = array => Math.floor(Math.random() * array.length);

const chooseEntitiesToMatch = (entities, amount) => {
  const possibleChoices = entities.filter(
    entity => entity.description && entity.description.trim()
  );
  return new Array(amount).fill(null).map(() => {
    const randomIndex = chooseRandom(possibleChoices);
    const [entity] = possibleChoices.splice(randomIndex, 1);
    return entity;
  });
};

const shuffle = array => {
  const arrayToShuffle = [...array];
  arrayToShuffle.forEach((value, index) => {
    const randomIndex = chooseRandom(arrayToShuffle);
    arrayToShuffle[index] = arrayToShuffle[randomIndex];
    arrayToShuffle[randomIndex] = value;
  });
  return arrayToShuffle;
};

const MatchQuiz = ({ entities }) => {
  console.log(entities);
  const entitiesToMatch = useMemo(() => chooseEntitiesToMatch(entities, 4), [
    entities,
    questionNumber,
  ]);
  const [title, descriptions] = useMemo(() => {
    const [{ name }] = entitiesToMatch;
    const descriptions = entitiesToMatch
      .map(entity => entity.description)
      .sort((a, b) => a.length - b.length);
    return [name, descriptions];
  }, [entitiesToMatch]);
  return (
    <div className="match-quiz">
      <h2 className="match-quiz__title">{title}</h2>
      <ul className="match-quiz__description-list">
        {descriptions.map((description, index) => (
          <li key={index} className="match-quiz__description-list-item">
            <button
              type="button"
              className="non-btn match-quiz__description-list__button"
            >
              {description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchQuiz;
