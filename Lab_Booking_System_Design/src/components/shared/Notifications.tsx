import Layout from './Layout';
import { User } from '../../App';
import { Bell, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { getUserNotifications } from '../../utils/mockData';

interface NotificationsProps {
  user: User;
  onLogout: () => void;
}

export default function Notifications({ user, onLogout }: NotificationsProps) {
  const notifications = getUserNotifications(user.id);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'info':
      default:
        return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Notifications">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-xl border p-6 ${getNotificationBg(notification.type)} ${
                  !notification.read ? 'border-l-4' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(notification.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
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
