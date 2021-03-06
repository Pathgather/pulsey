import options from '../options'

var tipSide = options.tooltip.tip.side;
var tipSize = options.tooltip.tip.size;
var style = {
  tooltip: {
    zIndex: '99999',
    background: '#fff',
    padding: '15',
    width: options.tooltip.width,
    borderRadius: '2',
    transform: 'translate(-50%,-50%)',
    cursor: 'pointer',
    boxSizing: 'border-box',
    header: {
      display: 'flex',
      justifyContent: 'center',
      fontWeight: '600',
      lineHeight: '2em',
    },
    note: {
      display: 'flex',
      justifyContent: 'center',
      fontWeight: '300',
    },
    tip: {
      width: '0',
      height: '0',
      borderLeft: tipSide == 'right' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      borderBottom: tipSide == 'top' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      borderRight: tipSide == 'left' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      borderTop: tipSide == 'bottom' ? tipSize + 'px solid #fff' : tipSize + 'px solid transparent',
      transform: tipSide == 'right' || tipSide == 'left' ? 'translateY(-50%)' : tipSide == 'bottom' ? 'translate(-50%, 100%)' : 'translate(-50%, 0)',
      left: tipSide == 'top' || tipSide == 'bottom' ? '50%' : tipSide == 'left' ? '-' + 2*tipSize : options.tooltip.width,
      top: tipSide == 'right' || tipSide == 'left' ? '50%' : tipSide == 'top' ? '-' + 2*tipSize : null,
      bottom: tipSide == 'bottom' ? '0' : null,
      position: 'absolute',
    },
  },
  progress: {
    width: 24,
    height: 24,
    background: '#4c93ea',
    borderRadius: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    transform: 'translate(-50%,-50%)',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: 300,
    boxShadow: '0 0 20px rgba(76, 147, 234, 0.85)',
  },
  close: {
    color: '#333',
    transform: 'rotate(45deg)',
    position: 'absolute',
    top: '5',
    right: '12',
    fontSize: '25',
  },
  buttons: {
    position: 'relative',
    width: '100%',
    marginTop: '20',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButton: {
    padding: '4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ddd',
    background: '#fff',
    borderRadius: '2',
    color: '#555',
    width: '50',
    outline: 'none',
    cursor: 'pointer',
  },
  exitButton: {
    padding: '4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    background: '#fff',
    color: '#aaa',
    width: '50',
    outline: 'none',
    cursor: 'pointer',
  },
}

export { style }
