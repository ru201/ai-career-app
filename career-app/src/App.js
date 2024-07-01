import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/home';
import Interests from './pages/interests';
import Skills from './pages/skills';
import Values from './pages/values';
import Profile from './pages/profile';
import Careers from './pages/careers';
import Chatbot from './pages/chatbot';
import Subjects from './pages/subjects';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/interests' element={<Interests />}/>
        <Route path='/skills' element={<Skills />}/>
        <Route path='/values' element={<Values />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/careers' element={<Careers />}/>
        <Route path='/chatbot' element={<Chatbot />}/>
        <Route path='/subjects' element={<Subjects />}/>
    </Routes>
  );
}

export default App;
