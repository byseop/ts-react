import React from 'react';
import './App.css';
import MyForm from './MyForm';
import Counter from './Counter';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';

const App: React.FC = () => {
  const onSubmit = (form: { name: string, description: string }) => {
    console.log(form);
  }
  return (
    <>
      <Counter />
      <MyForm onSubmit={onSubmit} />
      <SampleProvider>
        <ReducerSample />
      </SampleProvider>
    </>
  );
}

export default App;
