import { Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import Navbar from './components/Navbar';
import { auth } from './firebase';

import ProtectedRoute from './components/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import RegisterSport from './screens/RegisterSport';
import { ToastContainer, toast } from 'react-toastify';
import RegisterTeam from './screens/RegisterTeam';
import EventScreen from './screens/EventScreen';
import RegisterEvent from './screens/RegisterEvent';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Navbar auth={auth} toast={toast} />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" end element={<HomePage toast={toast} />} />
          <Route
            path="/registersport"
            element={
              <ProtectedRoute user={user} toast={toast} site={'registersport'}>
                <RegisterSport toast={toast} />
              </ProtectedRoute>
            }
          />
          <Route path="/events" element={<EventScreen toast={toast} />} />
          <Route
            path="/registerteam"
            element={
              <ProtectedRoute user={user} toast={toast} site={'registerteam'}>
                <RegisterTeam toast={toast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registerevent"
            element={
              <ProtectedRoute user={user} toast={toast} site={'registerevent'}>
                <RegisterEvent toast={toast} />
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
