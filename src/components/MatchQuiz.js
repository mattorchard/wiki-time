import { useEffect, useMemo, useState } from "preact/hooks";
import "./MatchQuiz.css";
import MarkBadge from "./MarkBadge";
import EntityIndex from "./EntityIndex";
import EntityCard from "./EntityCard";
import { Fragment } from "preact";
import useFocusNextRef from "../hooks/useFocusNextRef";

const chooseRandom = array => Math.floor(Math.random() * array.length);

const chooseRandomEntityWithDescription = entities => {
  const possibleChoices = entities.filter(
    entity => entity.description && entity.description.trim()
  );
  const randomIndex = chooseRandom(possibleChoices);
  return possibleChoices[randomIndex];
};

const MatchQuiz = ({ entities }) => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [nextQuestionButtonRef, focusNextQuestionButton] = useFocusNextRef();

  useEffect(() => setSelectedEntity(null), [questionNumber]);

  const answerEntity = useMemo(
    () => chooseRandomEntityWithDescription(entities),
    [questionNumber]
  );

  if (!answerEntity) {
    return "You must have some entities with descriptions";
  }

  const isShowingAnswers = Boolean(selectedEntity);
  const isCorrect = isShowingAnswers && selectedEntity.id === answerEntity.id;
  const handleSelect = selectedEntityId => {
    setSelectedEntity(
      entities.find(entity => entity.id === selectedEntityId) || null
    );
    focusNextQuestionButton();
  };

  return (
    <div className="match-quiz">
      {isShowingAnswers ? (
        <Fragment>
          {isCorrect || (
            <div className="match-quiz__answer-card">
              <MarkBadge isCorrect={false} />
              <EntityCard entity={selectedEntity} />
            </div>
          )}
          <div className="match-quiz__answer-card">
            <MarkBadge isCorrect={true} />
            <EntityCard entity={answerEntity} />
          </div>
          <button
            ref={nextQuestionButtonRef}
            className="btn"
            onClick={() =>
              setQuestionNumber(questionNumber => questionNumber + 1)
            }
          >
            Next Question
          </button>
        </Fragment>
      ) : (
        <p className="match-quiz__description">{answerEntity.description}</p>
      )}

      {isShowingAnswers || (
        <EntityIndex entities={entities} onSelect={handleSelect} hideEmpty />
      )}
    </div>
  );
};

export default MatchQuiz;
