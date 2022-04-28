import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProtectedScreen from './screens/ProtectedScreen';
import HomePage from './screens/HomePage';
import Navbar from './components/Navbar';
import { auth, firestore } from './firebase';

import ProtectedRoute from './components/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import RegisterSport from './screens/RegisterSport';
import { ToastContainer, toast } from 'react-toastify';
import EventScreen from './screens/EventScreen';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Navbar auth={auth} />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" end element={<HomePage />} />

          <Route path="/events" element={<EventScreen />} />

          <Route
            path="/protected"
            element={
              <ProtectedRoute user={user}>
                <ProtectedScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registersport"
            element={
              <ProtectedRoute user={user}>
                <RegisterSport toast={toast} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
