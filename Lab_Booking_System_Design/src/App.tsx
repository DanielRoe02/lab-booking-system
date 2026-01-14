import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import InternalDashboard from './components/internal/InternalDashboard';
import ExternalDashboard from './components/external/ExternalDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import LabAvailability from './components/shared/LabAvailability';
import BookingRequest from './components/shared/BookingRequest';
import MyBookings from './components/shared/MyBookings';
import ModifyBooking from './components/shared/ModifyBooking';
import CancelBooking from './components/shared/CancelBooking';
import PaymentPage from './components/external/PaymentPage';
import PaymentProcessing from './components/external/PaymentProcessing';
import PaymentConfirmation from './components/external/PaymentConfirmation';
import UserProfile from './components/shared/UserProfile';
import Notifications from './components/shared/Notifications';
import BookingApproval from './components/admin/BookingApproval';
import LabManagement from './components/admin/LabManagement';
import UserManagement from './components/admin/UserManagement';
import Reports from './components/admin/Reports';
import LabUsageMonitoring from './components/admin/LabUsageMonitoring';
import NotificationManagement from './components/admin/NotificationManagement';

export type UserRole = 'internal' | 'external' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        
        {/* Internal User Routes */}
        <Route 
          path="/internal/dashboard" 
          element={currentUser?.role === 'internal' ? <InternalDashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/internal/lab-availability" 
          element={currentUser?.role === 'internal' ? <LabAvailability user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/internal/booking-request" 
          element={currentUser?.role === 'internal' ? <BookingRequest user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/internal/my-bookings" 
          element={currentUser?.role === 'internal' ? <MyBookings user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/internal/modify-booking/:id" 
          element={currentUser?.role === 'internal' ? <ModifyBooking user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/internal/cancel-booking/:id" 
          element={currentUser?.role === 'internal' ? <CancelBooking user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/internal/profile" 
          element={currentUser?.role === 'internal' ? <UserProfile user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/internal/notifications" 
          element={currentUser?.role === 'internal' ? <Notifications user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />

        {/* External User Routes */}
        <Route 
          path="/external/dashboard" 
          element={currentUser?.role === 'external' ? <ExternalDashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/lab-availability" 
          element={currentUser?.role === 'external' ? <LabAvailability user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/booking-request" 
          element={currentUser?.role === 'external' ? <BookingRequest user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/my-bookings" 
          element={currentUser?.role === 'external' ? <MyBookings user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/modify-booking/:id" 
          element={currentUser?.role === 'external' ? <ModifyBooking user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/cancel-booking/:id" 
          element={currentUser?.role === 'external' ? <CancelBooking user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/payment/:bookingId" 
          element={currentUser?.role === 'external' ? <PaymentPage user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/payment-processing" 
          element={currentUser?.role === 'external' ? <PaymentProcessing user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/payment-confirmation" 
          element={currentUser?.role === 'external' ? <PaymentConfirmation user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/profile" 
          element={currentUser?.role === 'external' ? <UserProfile user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/external/notifications" 
          element={currentUser?.role === 'external' ? <Notifications user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={currentUser?.role === 'admin' ? <AdminDashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/booking-approval" 
          element={currentUser?.role === 'admin' ? <BookingApproval user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/lab-management" 
          element={currentUser?.role === 'admin' ? <LabManagement user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/user-management" 
          element={currentUser?.role === 'admin' ? <UserManagement user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/reports" 
          element={currentUser?.role === 'admin' ? <Reports user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/lab-usage-monitoring" 
          element={currentUser?.role === 'admin' ? <LabUsageMonitoring user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/notification-management" 
          element={currentUser?.role === 'admin' ? <NotificationManagement user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/profile" 
          element={currentUser?.role === 'admin' ? <UserProfile user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/notifications" 
          element={currentUser?.role === 'admin' ? <Notifications user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
