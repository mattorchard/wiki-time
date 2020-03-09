import { useReducer } from "preact/hooks";
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

const matchQuizReducer = entities => (state, action) => {
  switch (action.type) {
    case "selectEntity":
      const { selectedEntity } = action;
      return {
        ...state,
        selectedEntity,
        isShowingAnswers: true,
        isCorrect: selectedEntity.id === state.answerEntity.id,
      };
    case "nextQuestion":
      return {
        selectedEntity: null,
        answerEntity: chooseRandomEntityWithDescription(entities),
        isCorrect: null,
        isShowingAnswers: false,
      };
    default:
      return state;
  }
};
const initializeMatchQuizState = entities => () => ({
  selectedEntity: null,
  answerEntity: chooseRandomEntityWithDescription(entities),
  isCorrect: null,
  isShowingAnswers: false,
});

const useMatchQuiz = entities =>
  useReducer(
    matchQuizReducer(entities),
    null,
    initializeMatchQuizState(entities)
  );

const MatchQuiz = ({ entities }) => {
  const [state, dispatch] = useMatchQuiz(entities);
  const [nextQuestionButtonRef, focusNextQuestionButton] = useFocusNextRef();

  if (!state.answerEntity) {
    return "You must have some entities with descriptions";
  }

  const handleSelect = selectedEntityId => {
    const selectedEntity = entities.find(
      entity => entity.id === selectedEntityId
    );
    if (selectedEntity) {
      dispatch({ type: "selectEntity", selectedEntity });
      focusNextQuestionButton();
    }
  };

  return (
    <div className="match-quiz">
      {state.isShowingAnswers ? (
        <Fragment>
          {state.isCorrect || (
            <div className="match-quiz__answer-card">
              <MarkBadge isCorrect={false} />
              <EntityCard entity={state.selectedEntity} />
            </div>
          )}
          <div className="match-quiz__answer-card">
            <MarkBadge isCorrect={true} />
            <EntityCard entity={state.answerEntity} />
          </div>
          <button
            ref={nextQuestionButtonRef}
            className="btn"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next Question
          </button>
        </Fragment>
      ) : (
        <p className="match-quiz__description">
          {state.answerEntity.description}
        </p>
      )}

      {state.isShowingAnswers || (
        <EntityIndex entities={entities} onSelect={handleSelect} hideEmpty />
      )}
    </div>
  );
};

export default MatchQuiz;
