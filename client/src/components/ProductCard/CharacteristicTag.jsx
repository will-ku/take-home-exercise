const CharacteristicTag = ({ characteristic }) => {
  return (
    <span key={characteristic} className="characteristic-tag">
      {characteristic}
    </span>
  );
};

export default CharacteristicTag;
