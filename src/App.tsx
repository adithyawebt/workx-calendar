import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Calendar from './components/Calendar/Calendar';
import AuthPage from './pages/AuthPage';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" Component={AuthPage} />
                <Route path="/home" Component={Calendar} />
            </Routes>
        </Router>
    )
}

export default App
