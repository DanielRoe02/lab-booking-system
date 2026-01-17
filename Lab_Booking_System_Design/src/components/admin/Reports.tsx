import Layout from '../shared/Layout';
import { User } from '../../App';
import { BarChart3, Calendar, TrendingUp, Download } from 'lucide-react';
import { mockBookings, mockLabs, mockUsers } from '../../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface ReportsProps {
  user: User;
  onLogout: () => void;
}

export default function Reports({ user, onLogout }: ReportsProps) {
  // Booking trends data (mock monthly data)
  const bookingTrends = [
    { month: 'Aug', bookings: 12 },
    { month: 'Sep', bookings: 19 },
    { month: 'Oct', bookings: 15 },
    { month: 'Nov', bookings: 22 },
    { month: 'Dec', bookings: 18 },
    { month: 'Jan', bookings: mockBookings.length },
  ];

  // Lab usage data
  const labUsageData = mockLabs.map(lab => ({
    name: lab.name.split(' ').slice(0, 2).join(' '), // Shortened name
    bookings: Math.floor(Math.random() * 20) + 5,
  }));

  // User type distribution
  const userTypeData = [
    { name: 'Internal', value: mockUsers.filter(u => u.role === 'internal').length, color: '#3b82f6' },
    { name: 'External', value: mockUsers.filter(u => u.role === 'external').length, color: '#f59e0b' },
    { name: 'Admin', value: mockUsers.filter(u => u.role === 'admin').length, color: '#a855f7' },
  ];

  // Booking status distribution
  const statusData = [
    { name: 'Approved', value: mockBookings.filter(b => b.status === 'approved').length },
    { name: 'Pending', value: mockBookings.filter(b => b.status === 'pending').length },
    { name: 'Rejected', value: mockBookings.filter(b => b.status === 'rejected').length },
    { name: 'Completed', value: mockBookings.filter(b => b.status === 'completed').length },
  ];

  const handleExport = (reportType: string) => {
    alert(`Exporting ${reportType} report...`);
  };

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Reports">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('full')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockBookings.length}</p>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Active Users</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {mockUsers.filter(u => u.status === 'active').length}
            </p>
            <p className="text-sm text-green-600 mt-1">+8% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Approval Rate</p>
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round((mockBookings.filter(b => b.status === 'approved').length / mockBookings.length) * 100)}%
            </p>
            <p className="text-sm text-green-600 mt-1">+5% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Lab Utilization</p>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">73%</p>
            <p className="text-sm text-green-600 mt-1">+3% from last month</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Booking Trends */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Booking Trends (6 Months)</h2>
              <button
                onClick={() => handleExport('trends')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Lab Usage */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Lab Usage Comparison</h2>
              <button
                onClick={() => handleExport('lab-usage')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={labUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Type Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">User Type Distribution</h2>
              <button
                onClick={() => handleExport('user-types')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Booking Status */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Booking Status Breakdown</h2>
              <button
                onClick={() => handleExport('status')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Most Booked Labs</h3>
              <div className="space-y-2">
                {labUsageData.slice(0, 3).sort((a, b) => b.bookings - a.bookings).map((lab, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{lab.name}</span>
                    <span className="font-medium">{lab.bookings} bookings</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Peak Booking Days</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monday</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wednesday</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Friday</span>
                  <span className="font-medium">18%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Average Session Duration</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Internal Users</span>
                  <span className="font-medium">2.5 hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">External Users</span>
                  <span className="font-medium">3.2 hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Overall Average</span>
                  <span className="font-medium">2.8 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
