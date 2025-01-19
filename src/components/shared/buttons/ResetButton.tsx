interface ResetButtonProps {
  onClick: () => void; // Function to call on reset
  show: boolean; // Whether to show the button
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick, show }) => {
  if (!show) return null; // Don't render the button if not shown

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Reset
    </button>
  );
};

export default ResetButton;
