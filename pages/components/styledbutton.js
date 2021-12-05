const StyledButton = ({ children }) => {
  return (
    <button style={{
      color: '#fbc02d',
      backgroundColor: 'transparent',
      backgroundRepeat: 'no-repeat',
      border: '1px solid #fbc02d',
      outline: 'none',
      margin: '4px',
      padding: '8px 16px',
      borderRadius: '4px',
    }}>
      {children}
    </button>
  );
};

export default StyledButton;
