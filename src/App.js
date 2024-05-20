import { Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.js';
import InputForm from './components/InputForm.js';
import Forum from './pages/Forum.js';

function App() {

    return(
        <div>
            <Nav />

            <Routes>
                <Route path='/' element={<InputForm />} />
                <Route path='/forum' element={<Forum />} />
            </Routes>
        </div>
    )
}

export default App;