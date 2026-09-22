function TipButton({ percent, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(percent)}
      style={{ fontWeight: active ? "bold" : "normal" }}
    >
      {percent}%
    </button>
  );
}

export default TipButton;