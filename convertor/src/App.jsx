import { useState } from 'react'
import './App.css'
import {convertHexToRgb} from './convertHexToRgb'


function App() {
  
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [error, setError] = useState(false);

  const isValidHex = (hex) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return regex.test(hex);
  };

  const handleHexChange = (event) => {
    const hex = event.target.value;
    setHexColor(hex);

    if (isValidHex(hex)) {
      setError(false);
      const rgb = convertHexToRgb(hex);
      setRgbColor(rgb);
      document.body.style.backgroundColor = rgb;
    } else {
      setError(true);
      setRgbColor('');
      document.body.style.backgroundColor = 'rgb(255, 0, 0)';
    }
  };

  return (
    <div className='conteiner'>
      <input type="text" className='hex' value={hexColor} onChange={handleHexChange} />
      {error ? <div className='error'>Ошибка</div> : <div className='rgb'>{rgbColor}</div>}

      {/* {error && <div className='error'>Ошибка</div>}
      {rgbColor && <div className='rgb'>{rgbColor}</div>} */}
    </div>
  );

}

export default App
