import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import { User } from '../../App';
import { AlertTriangle, Calendar, Clock } from 'lucide-react';
import { getBookingById } from '../../utils/mockData';

interface CancelBookingProps {
  user: User;
  onLogout: () => void;
}

export default function CancelBooking({ user, onLogout }: CancelBookingProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const booking = getBookingById(id || '');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!booking) {
      alert('Booking not found');
      navigate(`/${user.role}/my-bookings`);
    }
  }, [booking, navigate, user.role]);

  const handleConfirm = () => {
    if (!reason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    
    alert('Booking cancelled successfully');
    navigate(`/${user.role}/my-bookings`);
  };

  if (!booking) {
    return null;
  }

  return (
    <Layout user={user} onLogout={onLogout} currentPage="My Bookings">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cancel Booking</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Warning Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Warning: This action cannot be undone</h3>
                <p className="text-sm text-red-700 mt-1">
                  Are you sure you want to cancel this booking? This action is permanent and cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Laboratory</p>
                <p className="font-medium text-gray-900">{booking.labName}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5" />
                <span>{booking.startTime} - {booking.endTime}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="text-gray-700">{booking.purpose}</p>
              </div>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Cancellation *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Please provide a reason for cancelling this booking..."
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleConfirm}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirm Cancellation
            </button>
            <button
              onClick={() => navigate(`/${user.role}/my-bookings`)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Keep Booking
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
