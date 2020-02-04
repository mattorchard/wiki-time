import "./EntityCard.css";

const formatYear = year => {
  const era = year >= 0 ? "CE" : "BCE";
  if (year % 1 === 0) {
    return `${Math.abs(year)} ${era}`;
  }
  const firstYear = Math.floor(year);
  return `${Math.abs(firstYear)}/${Math.abs(firstYear + 1)} ${era}`;
};

const EntityCard = ({ entity }) => {
  const { name, description, startYear, endYear, lectureNumber } = entity;
  const hasStartYear = startYear || startYear === 0;
  const hasEndYear = endYear || endYear === 0;
  return (
    <div className="entity-card">
      <div className="entity-card__header">
        <strong className="entity-card__title">{name}</strong>
        {hasStartYear && (
          <small className="entity-card__times">
            {formatYear(startYear)}
            {hasEndYear && ` - ${formatYear(endYear)}`}
          </small>
        )}
      </div>
      <p className="entity-card__description">{description}</p>
      <small className="entity-card__footer">Lecture #{lectureNumber}</small>
    </div>
  );
};

export default EntityCard;
