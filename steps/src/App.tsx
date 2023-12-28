import { useState, FormEvent } from 'react'
import { FormType } from './types'

import './css/App.css'

const App = () => {
  const [formArray, setformArray] = useState<FormType[]>([]);
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); //отмена обновления страницы

    const resultFind = formArray.find(item => item.date === date); // определяем есть ли уже вводимая дата в массиве formArray

    if(resultFind) { 
      const tempArray = formArray.filter(item => item.date !== resultFind.date);
      resultFind.distance += parseInt(distance)
      tempArray.push(resultFind);
      setformArray(tempArray.sort((a,b) => a.date < b.date ? 1 : -1)); // Перересовка и сортировка по возрастанию//
    }
    else {
      const newData: FormType = {
        date,
        distance: parseInt(distance),
      };
      setformArray([...formArray, newData].sort((a,b) => a.date < b.date ? 1 : -1));
      setDate('');
      setDistance('');
    }

  };

  const clickDeleteHandler = (date: string) => {
    const newFormArray = formArray.filter(elem => elem.date !== date);
    console.log(newFormArray, formArray);
    setformArray(newFormArray.sort((a,b) => a.date < b.date ? 1 : -1));

}

  return (
    <div className='conteiner'>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Дата"
        />
        <input
          type="text"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Пройдено км"
        />
        <button type="submit">Отправить</button>
      </form>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Пройдено км</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {formArray.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.distance}</td>
                <td><div className='delete' onClick={() => clickDeleteHandler(data.date)  }>X</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App