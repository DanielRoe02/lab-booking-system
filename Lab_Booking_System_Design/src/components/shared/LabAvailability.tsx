import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { User } from '../../App';
import { Search, MapPin, Users as UsersIcon, CheckCircle, XCircle, Wrench } from 'lucide-react';
import { mockLabs } from '../../utils/mockData';

interface LabAvailabilityProps {
  user: User;
  onLogout: () => void;
}

export default function LabAvailability({ user, onLogout }: LabAvailabilityProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'occupied' | 'maintenance'>('all');

  const filteredLabs = mockLabs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lab.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Available
          </span>
        );
      case 'occupied':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            Occupied
          </span>
        );
      case 'maintenance':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            <Wrench className="w-4 h-4" />
            Maintenance
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Lab Availability">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Laboratory Availability</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Labs
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by name or building..."
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">{lab.name}</h3>
                  {getStatusBadge(lab.status)}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{lab.building} - {lab.floor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <UsersIcon className="w-4 h-4" />
                    <span className="text-sm">Capacity: {lab.capacity} persons</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Equipment:</p>
                  <div className="flex flex-wrap gap-2">
                    {lab.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {lab.status === 'available' && (
                  <button
                    onClick={() => navigate(`/${user.role}/booking-request`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book This Lab
                  </button>
                )}
                {lab.status === 'occupied' && (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Currently Occupied
                  </button>
                )}
                {lab.status === 'maintenance' && (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    Under Maintenance
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500">No labs found matching your criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
