import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../shared/Layout';
import { User } from '../../App';
import { CheckCircle, XCircle } from 'lucide-react';

interface PaymentConfirmationProps {
  user: User;
  onLogout: () => void;
}

export default function PaymentConfirmation({ user, onLogout }: PaymentConfirmationProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'success';
  const isSuccess = status === 'success';

  return (
    <Layout user={user} onLogout={onLogout} currentPage="My Bookings">
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            {isSuccess ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your payment has been processed successfully. Your lab booking is now confirmed.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800">
                    A confirmation email has been sent to your registered email address.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Payment Failed</h2>
                <p className="text-gray-600 mb-6">
                  We encountered an issue processing your payment. Please try again or contact support.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800">
                    Your booking has not been confirmed. No charges have been made to your account.
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/external/my-bookings')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate('/external/dashboard')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
