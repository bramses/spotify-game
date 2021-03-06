const CenterContainer = ({
  flash = false,
  noBorder = false,
  greyBorder = false,
  children,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      height: '100%',
      border: noBorder ? '' : (greyBorder ? '4px solid #82827d' : '4px solid #fbc02d'),
      animation: flash ? '3s infinite alternate flashborder' : '',
      paddingTop: '24px',
      paddingBottom: '36px',
    }}>
      {children}
    </div>
  );
};

export default CenterContainer;
