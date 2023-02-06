import { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/main/Main';
import SingIn from './components/signin/SingIn';
import SignUp from './components/signup/SignUp';
import HomeWrapper from './pages/HomeWrapper';


export const toggleTheme = createContext()

function App({ theme, toggleTheme }) {
  return (
    <div className="App">
      <Routes>
        <Route index element={<SingIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='/' element={<HomeWrapper />}>
          <Route path='main' element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
