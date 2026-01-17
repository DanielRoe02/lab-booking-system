import { useState } from 'react';
import Layout from '../shared/Layout';
import { User } from '../../App';
import { Send, Users, Bell } from 'lucide-react';

interface NotificationManagementProps {
  user: User;
  onLogout: () => void;
}

export default function NotificationManagement({ user, onLogout }: NotificationManagementProps) {
  const [formData, setFormData] = useState({
    recipient: 'all',
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error',
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Notification sent to ${formData.recipient} users!`);
    setFormData({
      recipient: 'all',
      title: '',
      message: '',
      type: 'info',
    });
  };

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Notifications">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Notification Management</h1>

        {/* Create Notification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Send New Notification</h2>
          </div>

          <form onSubmit={handleSend} className="space-y-6">
            {/* Recipient Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Send To *
              </label>
              <select
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="all">All Users</option>
                <option value="internal">Internal Users Only</option>
                <option value="external">External Users Only</option>
                <option value="admins">Administrators Only</option>
              </select>
            </div>

            {/* Notification Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="info">Information</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error/Alert</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter notification title..."
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter your message here..."
                required
              />
            </div>

            {/* Preview */}
            {(formData.title || formData.message) && (
              <div className="border-t pt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                <div
                  className={`p-4 rounded-lg border ${
                    formData.type === 'info'
                      ? 'bg-blue-50 border-blue-200'
                      : formData.type === 'success'
                      ? 'bg-green-50 border-green-200'
                      : formData.type === 'warning'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  {formData.title && (
                    <h3 className="font-semibold text-gray-900 mb-2">{formData.title}</h3>
                  )}
                  {formData.message && (
                    <p className="text-gray-700 whitespace-pre-wrap">{formData.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Send Button */}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              Send Notification
            </button>
          </form>
        </div>

        {/* Quick Templates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Templates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  title: 'System Maintenance Notice',
                  message:
                    'The Lab Booking System will undergo scheduled maintenance on [DATE] from [TIME] to [TIME]. During this period, the system will be temporarily unavailable. We apologize for any inconvenience.',
                  type: 'warning',
                })
              }
              className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Maintenance Notice</h3>
              <p className="text-sm text-gray-600">System maintenance announcement</p>
            </button>

            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  title: 'Booking Approved',
                  message:
                    'Your lab booking request has been approved. Please check your bookings page for details.',
                  type: 'success',
                })
              }
              className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Booking Approval</h3>
              <p className="text-sm text-gray-600">Booking approval notification</p>
            </button>

            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  title: 'New Features Available',
                  message:
                    'We are excited to announce new features in the Lab Booking System. Check them out on your dashboard!',
                  type: 'info',
                })
              }
              className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Feature Announcement</h3>
              <p className="text-sm text-gray-600">New feature information</p>
            </button>

            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  title: 'Payment Reminder',
                  message:
                    'This is a reminder that your booking payment is due. Please complete the payment to confirm your booking.',
                  type: 'warning',
                })
              }
              className="p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Payment Reminder</h3>
              <p className="text-sm text-gray-600">External user payment reminder</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
