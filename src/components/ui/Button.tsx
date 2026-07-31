interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="transition-transform duration-100 active:scale-95 disabled:active:scale-100"
    >
      {children}
    </button>
  );
}

export default Button;