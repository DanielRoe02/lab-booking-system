import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { User } from '../../App';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Edit, Trash2, DollarSign } from 'lucide-react';
import { getUserBookings } from '../../utils/mockData';

interface MyBookingsProps {
  user: User;
  onLogout: () => void;
}

export default function MyBookings({ user, onLogout }: MyBookingsProps) {
  const navigate = useNavigate();
  const bookings = getUserBookings(user.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
            <AlertCircle className="w-4 h-4" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const getPaymentBadge = (status?: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <DollarSign className="w-4 h-4" />
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
            <DollarSign className="w-4 h-4" />
            Payment Pending
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            <DollarSign className="w-4 h-4" />
            Payment Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} currentPage="My Bookings">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <button
            onClick={() => navigate(`/${user.role}/booking-request`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Booking
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start by creating your first lab booking</p>
            <button
              onClick={() => navigate(`/${user.role}/booking-request`)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Booking
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{booking.labName}</h3>
                      {getStatusBadge(booking.status)}
                      {user.role === 'external' && booking.paymentStatus && getPaymentBadge(booking.paymentStatus)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span>{booking.startTime} - {booking.endTime}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700">Purpose:</p>
                      <p className="text-gray-600">{booking.purpose}</p>
                    </div>

                    {user.role === 'external' && booking.paymentAmount && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700">Amount:</p>
                        <p className="text-lg font-semibold text-purple-600">${booking.paymentAmount}</p>
                      </div>
                    )}

                    <p className="text-sm text-gray-500">
                      Requested on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => navigate(`/${user.role}/modify-booking/${booking.id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Modify
                        </button>
                        <button
                          onClick={() => navigate(`/${user.role}/cancel-booking/${booking.id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === 'approved' && user.role === 'external' && booking.paymentStatus === 'pending' && (
                      <button
                        onClick={() => navigate(`/${user.role}/payment/${booking.id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <DollarSign className="w-4 h-4" />
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
