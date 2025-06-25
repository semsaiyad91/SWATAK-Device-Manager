const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 border rounded transition-colors   ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button