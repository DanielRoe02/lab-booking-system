import { useEffect } from 'react';
import Layout from '../shared/Layout';
import { User } from '../../App';
import { Loader2 } from 'lucide-react';

interface PaymentProcessingProps {
  user: User;
  onLogout: () => void;
}

export default function PaymentProcessing({ user, onLogout }: PaymentProcessingProps) {
  return (
    <Layout user={user} onLogout={onLogout} currentPage="My Bookings">
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-4">
            Please wait while we process your payment securely...
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">This may take a few moments</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
