import { useNavigate } from 'react-router-dom';
import Layout from '../shared/Layout';
import { User } from '../../App';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getUserBookings } from '../../utils/mockData';

interface InternalDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function InternalDashboard({ user, onLogout }: InternalDashboardProps) {
  const navigate = useNavigate();
  const userBookings = getUserBookings(user.id);
  const upcomingBookings = userBookings.filter(b => b.status === 'approved' || b.status === 'pending');
  const pendingCount = userBookings.filter(b => b.status === 'pending').length;
  const approvedCount = userBookings.filter(b => b.status === 'approved').length;

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Dashboard">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, {user.name}!</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{userBookings.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Approval</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/internal/lab-availability')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
            >
              <h3 className="font-semibold text-blue-900 mb-1">Check Availability</h3>
              <p className="text-sm text-blue-700">View available labs and schedules</p>
            </button>
            <button
              onClick={() => navigate('/internal/booking-request')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
            >
              <h3 className="font-semibold text-green-900 mb-1">Book a Lab</h3>
              <p className="text-sm text-green-700">Create a new booking request</p>
            </button>
            <button
              onClick={() => navigate('/internal/my-bookings')}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
            >
              <h3 className="font-semibold text-purple-900 mb-1">My Bookings</h3>
              <p className="text-sm text-purple-700">View and manage your bookings</p>
            </button>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No upcoming bookings</p>
              <button
                onClick={() => navigate('/internal/booking-request')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book a Lab
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{booking.labName}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {booking.date} • {booking.startTime} - {booking.endTime}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{booking.purpose}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {booking.status === 'pending' && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Pending
                      </span>
                    )}
                    {booking.status === 'approved' && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Approved
                      </span>
                    )}
                    {booking.status === 'rejected' && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        <XCircle className="w-4 h-4" />
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
