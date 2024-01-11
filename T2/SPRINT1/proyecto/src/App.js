import './App.css';
import Hello from './components/component1';
import Saludo from './components/component2';

function App() {
  return (
    <div className="App">
      <Hello/>
      <Saludo nombre={"Fermin"}/>
    </div>
  );
}

export default App;
