const Button = ({
  onClick,
  type = "button",
  color = "bg-[#5044e5]",
  textColor = "text-white",
  border = false,
  fullWidth = true,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} ${textColor} ${
        fullWidth ? "w-full" : ""
      } py-2 px-4 rounded hover:opacity-90 ${
        border ? "border text-gray-700 hover:bg-gray-50" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
