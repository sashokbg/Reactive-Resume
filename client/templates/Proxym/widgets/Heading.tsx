const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {

  return (
    <div>
      <div style={{height: '10px', width: '60px', backgroundColor: '#FFCC29', borderRadius: '2px'}}></div>
      <h4 className="uppercase" style={{position: 'relative', bottom: '15px', left: '10px', color: '#562AD5'}}>{children}</h4>
    </div>
  );
};

export default Heading;
