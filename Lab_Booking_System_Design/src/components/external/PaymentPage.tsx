import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../shared/Layout';
import { User } from '../../App';
import { CreditCard, Lock, Calendar, Clock } from 'lucide-react';
import { getBookingById } from '../../utils/mockData';

interface PaymentPageProps {
  user: User;
  onLogout: () => void;
}

export default function PaymentPage({ user, onLogout }: PaymentPageProps) {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = getBookingById(bookingId || '');
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/external/payment-processing');
    
    // Simulate payment processing
    setTimeout(() => {
      navigate('/external/payment-confirmation?status=success');
    }, 3000);
  };

  if (!booking) {
    return (
      <Layout user={user} onLogout={onLogout} currentPage="My Bookings">
        <div className="text-center py-12">
          <p className="text-gray-600">Booking not found</p>
          <button
            onClick={() => navigate('/external/my-bookings')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to My Bookings
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} onLogout={onLogout} currentPage="My Bookings">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                    <p className="text-sm font-medium">Credit/Debit Card</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                    <p className="text-sm font-medium">Bank Transfer</p>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={cardData.cardHolder}
                      onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                      placeholder="John Doe"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardData.expiryDate}
                        onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={3}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
                  >
                    Pay ${booking.paymentAmount}
                  </button>
                </form>
              )}

              {/* Bank Transfer Instructions */}
              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Bank Transfer Details</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p><strong>Bank Name:</strong> Lab University Bank</p>
                      <p><strong>Account Name:</strong> Lab Booking System</p>
                      <p><strong>Account Number:</strong> 1234-5678-9012</p>
                      <p><strong>Reference:</strong> {booking.id}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Please use the booking ID as reference when making the transfer.
                    Your booking will be confirmed once payment is received.
                  </p>
                  <button
                    onClick={() => navigate('/external/my-bookings')}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    I've Made the Transfer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Laboratory</p>
                  <p className="font-medium text-gray-900">{booking.labName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Date
                  </p>
                  <p className="font-medium text-gray-900">{booking.date}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Time
                  </p>
                  <p className="font-medium text-gray-900">{booking.startTime} - {booking.endTime}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="text-gray-700">{booking.purpose}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${booking.paymentAmount}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium">$0</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span className="text-green-600">${booking.paymentAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
