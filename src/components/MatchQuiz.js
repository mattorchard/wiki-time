import { useEffect, useMemo, useState } from "preact/hooks";
import "./MatchQuiz.css";
import MarkBadge from "./MarkBadge";

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

const MatchQuiz = ({ entities }) => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isShowingAnswers, setIsShowingAnswers] = useState(false);

  useEffect(() => setIsShowingAnswers(false), [questionNumber]);

  const [answerEntity, questionEntities] = useMemo(() => {
    const entitiesToMatch = chooseEntitiesToMatch(entities, 4);
    const [answer] = entitiesToMatch;
    const questions = entitiesToMatch.sort(
      (a, b) => a.description.length - b.description.length
    );
    return [answer, questions];
  }, [questionNumber]);

  return (
    <div className="match-quiz">
      <div className="match-quiz__header">
        <h2 className="match-quiz__title">{answerEntity.name}</h2>
        <button
          type="button"
          className="btn"
          onClick={() =>
            setQuestionNumber(questionNumber => questionNumber + 1)
          }
        >
          Next Question
        </button>
      </div>
      <ul className="match-quiz__description-list">
        {questionEntities.map(({ id, description }) => (
          <li key={id} className="match-quiz__description-list-item">
            {isShowingAnswers && (
              <MarkBadge isCorrect={id === answerEntity.id} />
            )}
            <button
              type="button"
              onClick={() => setIsShowingAnswers(true)}
              className="non-btn match-quiz__description-list__button"
            >
              <div className="match-quiz__description-list__button__content">
                {description}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchQuiz;
