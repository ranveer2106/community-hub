import 
// React,
 { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PersonalPage from './pages/PersonalPage';
import FeedPage from './pages/FeedPage';
import { StoreContext } from './context/StoreContext';
import Loader from './components/Loader/Loader';

const App = () => {
    const [showLogin, setshowLogin] = useState(false);
    const { isLoading } = useContext(StoreContext);

    if (isLoading) {
        return (
            <div className='flex justify-center h-screen items-center'>
                <Loader />
            </div>
        );
    }

    return (
        <>
            {showLogin && <LoginPopup setshowLogin={setshowLogin} />}
            <div className='App'>
                <Navbar setshowLogin={setshowLogin} />
                <Routes>
                    <Route path="/personal" element={<PersonalPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
};

export default App;