import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import NavBar from '../../components/NavBar'
import LoginForm from '../../components/LoginForm/LoginForm';

import { getUser } from '../../utilities/users-service';

export default function App() {
  const [user, setUser] = useState(getUser())

  let resPromise = fetch('https://jsonplaceholder.typicode.com/users')

  resPromise
    .then(res => res.json())
    .then(res => console.log(res))

  return (
    <main className="App">
      { user ? (
        <>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
      )  : (
        <>
          <AuthPage setUser={setUser}/>
        </>
      )}
    </main>
  );
}