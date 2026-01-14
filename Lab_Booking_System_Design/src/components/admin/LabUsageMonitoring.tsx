import Layout from '../shared/Layout';
import { User } from '../../App';
import { Calendar, Clock, Users, CheckCircle, Activity } from 'lucide-react';
import { mockLabs, mockBookings } from '../../utils/mockData';

interface LabUsageMonitoringProps {
  user: User;
  onLogout: () => void;
}

export default function LabUsageMonitoring({ user, onLogout }: LabUsageMonitoringProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = mockBookings.filter(b => b.date === today || b.status === 'approved');

  const getLabStatus = (labId: string) => {
    const activeBooking = todayBookings.find(
      b => b.labId === labId && b.status === 'approved'
    );
    return activeBooking ? 'In Use' : 'Available';
  };

  const getLabUsagePercentage = (labId: string) => {
    const totalBookings = mockBookings.filter(b => b.labId === labId).length;
    const maxBookings = 30; // Assume max 30 bookings per lab
    return Math.min((totalBookings / maxBookings) * 100, 100);
  };

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Lab Usage">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Lab Usage Monitoring</h1>

        {/* Real-time Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Real-Time Lab Status</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLabs.map((lab) => {
              const status = getLabStatus(lab.id);
              const isInUse = status === 'In Use';

              return (
                <div
                  key={lab.id}
                  className={`p-4 rounded-lg border-2 ${
                    isInUse
                      ? 'bg-orange-50 border-orange-300'
                      : 'bg-green-50 border-green-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{lab.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isInUse
                          ? 'bg-orange-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {lab.capacity}</span>
                    </div>
                    <div className="text-gray-600">
                      {lab.building} - {lab.floor}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage Statistics</h2>

          <div className="space-y-4">
            {mockLabs.map((lab) => {
              const percentage = getLabUsagePercentage(lab.id);
              const bookingCount = mockBookings.filter(b => b.labId === lab.id).length;

              return (
                <div key={lab.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{lab.name}</h3>
                    <span className="text-sm text-gray-600">{bookingCount} total bookings</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        percentage > 75
                          ? 'bg-red-600'
                          : percentage > 50
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Utilization Rate</span>
                    <span className="text-xs font-medium text-gray-700">{percentage.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
          </div>

          {todayBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No bookings scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{booking.labName}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      User: {booking.userName} ({booking.userEmail})
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{booking.purpose}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{booking.startTime} - {booking.endTime}</span>
                      </div>
                      <span className="text-xs text-gray-500">{booking.date}</span>
                    </div>
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </span>
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
