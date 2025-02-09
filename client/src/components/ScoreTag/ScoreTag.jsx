import "./ScoreTag.css";

const ScoreTag = ({ score }) => {
  const getScoreMap = () => {
    if (score > 1) {
      return { emoji: "🔥", className: "score-tag--positive" };
    }

    if (score < 0) {
      return { emoji: "🥶", className: "score-tag--negative" };
    }

    return { emoji: "🫥", className: "score-tag--neutral" };
  };

  return (
    <div
      className={`score-tag ${getScoreMap().className}`}
      title={`Product Score: ${score}`}
    >
      <span>{getScoreMap().emoji}</span>
      <span>{score}</span>
    </div>
  );
};

export default ScoreTag;
