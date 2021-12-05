const CenterContainer = ({ flash = false, children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      border: '4px solid #fbc02d',
      animation: flash ? '3s infinite alternate flashborder' : '',
    }}>
      {children}
    </div>
  );
};

export default CenterContainer;
