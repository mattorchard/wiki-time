import "./CandyBox.css";

const CandyBox = () => (
  <div className="candy-box">
    {new Array(9).fill(null).map(() => (
      <span className="candy-box__dot" />
    ))}
  </div>
);

export default CandyBox;
