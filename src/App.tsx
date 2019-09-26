import React from 'react';
import './App.css';
import Greetings from './Greetings';

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`)
  }
  return (
    <div className="App">
      <Greetings name="Hello" onClick={onClick} />
    </div>
  );
}

export default App;
