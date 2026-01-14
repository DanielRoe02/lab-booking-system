import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Bell, 
  UserCircle, 
  LogOut, 
  LayoutDashboard,
  ClipboardList,
  Search,
  FileText,
  Settings,
  Users,
  BarChart3,
  Shield,
  BellRing
} from 'lucide-react';
import { User } from '../../App';

interface LayoutProps {
  children: ReactNode;
  user: User;
  onLogout: () => void;
  currentPage: string;
}

export default function Layout({ children, user, onLogout, currentPage }: LayoutProps) {
  const navigate = useNavigate();
  const baseRoute = `/${user.role}`;

  const getMenuItems = () => {
    switch (user.role) {
      case 'internal':
        return [
          { name: 'Dashboard', icon: LayoutDashboard, path: `${baseRoute}/dashboard` },
          { name: 'Lab Availability', icon: Search, path: `${baseRoute}/lab-availability` },
          { name: 'Book Lab', icon: Calendar, path: `${baseRoute}/booking-request` },
          { name: 'My Bookings', icon: ClipboardList, path: `${baseRoute}/my-bookings` },
          { name: 'Notifications', icon: Bell, path: `${baseRoute}/notifications` },
          { name: 'Profile', icon: UserCircle, path: `${baseRoute}/profile` },
        ];
      case 'external':
        return [
          { name: 'Dashboard', icon: LayoutDashboard, path: `${baseRoute}/dashboard` },
          { name: 'Lab Availability', icon: Search, path: `${baseRoute}/lab-availability` },
          { name: 'Book Lab', icon: Calendar, path: `${baseRoute}/booking-request` },
          { name: 'My Bookings', icon: ClipboardList, path: `${baseRoute}/my-bookings` },
          { name: 'Notifications', icon: Bell, path: `${baseRoute}/notifications` },
          { name: 'Profile', icon: UserCircle, path: `${baseRoute}/profile` },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', icon: LayoutDashboard, path: `${baseRoute}/dashboard` },
          { name: 'Booking Approval', icon: ClipboardList, path: `${baseRoute}/booking-approval` },
          { name: 'Lab Management', icon: Settings, path: `${baseRoute}/lab-management` },
          { name: 'User Management', icon: Users, path: `${baseRoute}/user-management` },
          { name: 'Reports', icon: BarChart3, path: `${baseRoute}/reports` },
          { name: 'Lab Usage', icon: FileText, path: `${baseRoute}/lab-usage-monitoring` },
          { name: 'Notifications', icon: BellRing, path: `${baseRoute}/notification-management` },
          { name: 'Profile', icon: UserCircle, path: `${baseRoute}/profile` },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'external':
        return 'bg-orange-100 text-orange-700';
      case 'internal':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Lab Booking System</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}>
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  navigate('/');
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm fixed left-0 top-16 bottom-0 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
