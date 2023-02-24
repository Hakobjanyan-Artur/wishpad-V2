import React, { createContext, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Friend from './components/friends/Friends';
import Notification from './components/notification/Notification';
import Messenger from './components/messenger/Messenger';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
import Settings from './components/settings/Settings';
import SingIn from './components/signin/SingIn';
import SignUp from './components/signup/SignUp';
import widthTeme from './hoc/WidthTeme';
import HomeWrapper from './pages/HomeWrapper';
import ProfileClickImage from './components/profileClickImage/profileClickImage';
import UserByClickImageItem from './components/userByclickImageItem/userByClickImageItem';
import { ThreeCircles } from 'react-loader-spinner'
const LeazyMain = lazy(() => import('./components/main/Main'))
const LeazyUserByClick = lazy(() => import('./components/userByClick/UserByClick'))
const LeazyTopTenPosts = lazy(() => import('./components/topTenPosts/topTenPosts'))


export const ThemeContext = createContext()

function App({ theme, toggleTheme }) {
  const [topTen, setTopTen] = useState(null)

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Routes>
          <Route index element={<SingIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='/' element={<HomeWrapper />}>
            <Route path='main' element={
              <React.Suspense fallback={<ThreeCircles
                height="100"
                width="100"
                color="rgb(33, 92, 243)"
                wrapperClass="Circle"
                visible={true}
                ariaLabel="three-circles-rotating"
              />}>
                <LeazyMain setTopTen={setTopTen} />
              </React.Suspense>} />
            <Route path='friend' element={<Friend />} />
            <Route path='notification' element={<Notification />} />
            <Route path='search' element={<Search />} />
            <Route path='profile/*' element={<Profile />} />
            <Route path='profileClickImage'>
              <Route path=':id' element={<ProfileClickImage />} />
            </Route>
            <Route path='settings' element={<Settings />} />
            <Route path='userByClick'>
              <Route path=':id/*' element={
                <React.Suspense fallback={
                  <ThreeCircles
                    height="100"
                    width="100"
                    color="rgb(33, 92, 243)"
                    wrapperClass="Circle"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                  />
                }>
                  <LeazyUserByClick />
                </React.Suspense>} />
            </Route>
            <Route path='topTenPosts' element={
              <React.Suspense fallback={
                <ThreeCircles
                  height="100"
                  width="100"
                  color="rgb(33, 92, 243)"
                  wrapperClass="Circle"
                  visible={true}
                  ariaLabel="three-circles-rotating"
                />
              }>
                <LeazyTopTenPosts topTen={topTen} />
              </React.Suspense>
            } />
            <Route path='userByClickImageItem'>
              <Route path=':id' element={<UserByClickImageItem />} />
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
