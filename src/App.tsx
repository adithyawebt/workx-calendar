import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calendar from './components/Calendar/Calendar';
import AuthPage from './pages/AuthPage';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/auth" Component={AuthPage} />
                <Route path="/" Component={Calendar} />
            </Routes>
        </Router>
    )
}

export default App
