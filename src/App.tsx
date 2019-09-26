import React from 'react';
import './App.css';
import MyForm from './MyForm';
import Counter from './Counter';
import ReducerSample from './ReducerSample';

const App: React.FC = () => {
  const onSubmit = (form: { name: string, description: string }) => {
    console.log(form);
  }
  return (
    <>
      <Counter />
      <MyForm onSubmit={onSubmit} />
      <ReducerSample />
    </>
  );
}

export default App;
