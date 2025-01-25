export const Button = ({ type = "button", className, onClick, children }) => {
  return (
    <button
      type={type}
      className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
