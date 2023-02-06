import { createContext } from 'react';
import './App.css';


export const toggleTheme = createContext()

function App({ theme, toggleTheme }) {
  return (
    <div className="App">
      <h1>App</h1>
    </div>
  );
}

export default App;
