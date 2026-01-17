import { useNavigate } from 'react-router-dom';
import Layout from '../shared/Layout';
import { User } from '../../App';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Building,
  AlertCircle
} from 'lucide-react';
import { getBookingStats, getLabStats, mockUsers, getPendingBookings } from '../../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const bookingStats = getBookingStats();
  const labStats = getLabStats();
  const pendingBookings = getPendingBookings();
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;

  const bookingChartData = [
    { name: 'Approved', value: bookingStats.approved, color: '#10b981' },
    { name: 'Pending', value: bookingStats.pending, color: '#f59e0b' },
    { name: 'Rejected', value: bookingStats.rejected, color: '#ef4444' },
    { name: 'Completed', value: bookingStats.completed, color: '#6366f1' },
  ];

  const labStatusData = [
    { name: 'Available', value: labStats.available, color: '#10b981' },
    { name: 'Occupied', value: labStats.occupied, color: '#f59e0b' },
    { name: 'Maintenance', value: labStats.maintenance, color: '#ef4444' },
  ];

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Dashboard">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{bookingStats.total}</p>
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
                <p className="text-3xl font-bold text-orange-600 mt-1">{bookingStats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Labs</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{labStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{activeUsers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Booking Status Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Status Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={bookingChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Lab Status Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lab Status Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={labStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/booking-approval')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left relative"
            >
              {bookingStats.pending > 0 && (
                <span className="absolute top-2 right-2 w-6 h-6 bg-orange-600 text-white rounded-full text-xs flex items-center justify-center">
                  {bookingStats.pending}
                </span>
              )}
              <h3 className="font-semibold text-orange-900 mb-1">Approve Bookings</h3>
              <p className="text-sm text-orange-700">Review pending requests</p>
            </button>
            <button
              onClick={() => navigate('/admin/lab-management')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
            >
              <h3 className="font-semibold text-blue-900 mb-1">Manage Labs</h3>
              <p className="text-sm text-blue-700">Add or edit laboratories</p>
            </button>
            <button
              onClick={() => navigate('/admin/user-management')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
            >
              <h3 className="font-semibold text-green-900 mb-1">Manage Users</h3>
              <p className="text-sm text-green-700">View and manage user accounts</p>
            </button>
            <button
              onClick={() => navigate('/admin/reports')}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
            >
              <h3 className="font-semibold text-purple-900 mb-1">View Reports</h3>
              <p className="text-sm text-purple-700">Analytics and statistics</p>
            </button>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Pending Approval Requests</h2>
            <button
              onClick={() => navigate('/admin/booking-approval')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          {pendingBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No pending booking requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{booking.userName}</h3>
                      <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded">
                        {booking.userEmail}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{booking.labName}</span> • {booking.date} • {booking.startTime} - {booking.endTime}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{booking.purpose}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Reject
                    </button>
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
