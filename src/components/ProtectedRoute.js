import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children, toast, site }) => {
  if (!user) {
    if (site === 'registerevent') {
      toast.warn('Du skal være logget ind for at kunne oprette et event');
    } else if (site === 'registersport') {
      toast.warn('Du skal være logget ind for at kunne oprette et sport');
    } else if (site === 'registerteam') {
      toast.warn('Du skal være logget ind for at kunne oprette et hold');
    }
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
