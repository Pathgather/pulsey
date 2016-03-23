import options from '../options'

var welcome = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '600',
    lineHeight: '2em',
    fontSize: 28,
    color: '#222',
  },
  note: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '300',
    fontSize: 18,
    color: '#111',
  },
  button: {
    width: '125px',
    height: '40px',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    background: '#f67b45',
    color: '#fff',
    fontSize: 13,
    fontWeight: 300,
    left: '50%',
    position: 'absolute',
    textTransform: 'uppercase',
    bottom: '25px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    transform: 'translateX(-50%)',
  },
};

var highlighterStyle = {
  position: 'absolute',
  borderRadius: 3,
  boxShadow: '0 0 20px 3px rgba(255,255,255,0.5)',
  zIndex: 99999,
  background: '#fff',
};

var welcomeStyle = {
  width: 500,
  minHeight: 300,
  position: options.welcome.fixed ? 'fixed' : 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  background: '#555',
  padding: '10px 30px',
  borderRadius: 3,
  zIndex: 99999,
  boxShadow: '0 0 120px 30px rgba(246, 123, 69, 0.4)',
};

var farewellStyle = {
  width: 500,
  minHeight: 300,
  position: options.farewell.fixed ? 'fixed' : 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  background: '#555',
  borderRadius: 3,
  padding: '10px 30px',
  zIndex: 99999,
  boxShadow: '0 0 120px 30px rgba(246, 123, 69, 0.4)',
};

export { welcome, highlighterStyle, welcomeStyle, farewellStyle }
