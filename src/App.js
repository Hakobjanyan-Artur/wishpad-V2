import { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Friend from './components/friend/Friend';
import Main from './components/main/Main';
import Messages from './components/messages/Messages';
import Messenger from './components/messenger/Messenger';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
import Settings from './components/settings/Settings';
import SingIn from './components/signin/SingIn';
import SignUp from './components/signup/SignUp';
import UserByClick from './components/userByClick/UserByClick';
import widthTeme from './hoc/WidthTeme';
import HomeWrapper from './pages/HomeWrapper';

export const ThemeContext = createContext()

function App({ theme, toggleTheme, hiden, toggleHiden }) {

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, toggleTheme, hiden, toggleHiden }}>
        <Routes>
          <Route index element={<SingIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='/' element={<HomeWrapper />}>
            <Route path='main' element={<Main />} />
            <Route path='friend' element={<Friend />} />
            <Route path='messages' element={<Messages />} />
            <Route path='search' element={<Search />} />
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
            <Route path='userByClick'>
              <Route path=':id/*' element={<UserByClick />} />
            </Route>
            <Route path='messenger'>
              <Route path=':id/' element={<Messenger />} />
            </Route>
          </Route>
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default widthTeme(App);
