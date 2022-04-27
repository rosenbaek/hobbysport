import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProtectedScreen from './screens/ProtectedScreen';
import HomePage from './screens/HomePage';
import Navbar from './components/Navbar';
import { auth, firestore } from './firebase';

import ProtectedRoute from './components/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Navbar auth={auth} />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute user={user}>
                <ProtectedScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
