import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { User } from '../../App';
import { Calendar, Clock, FileText, Send } from 'lucide-react';
import { mockLabs } from '../../utils/mockData';

interface BookingRequestProps {
  user: User;
  onLogout: () => void;
}

export default function BookingRequest({ user, onLogout }: BookingRequestProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    labId: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
  });

  const availableLabs = mockLabs.filter(lab => lab.status === 'available');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate times
    if (formData.startTime >= formData.endTime) {
      alert('End time must be after start time');
      return;
    }

    // Mock submission
    alert('Booking request submitted successfully! You will be notified once approved.');
    navigate(`/${user.role}/my-bookings`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout user={user} onLogout={onLogout} currentPage="Book Lab">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Booking Request</h1>
        <p className="text-gray-600 mb-8">Fill in the details to book a laboratory</p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lab Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Laboratory *
              </label>
              <select
                name="labId"
                value={formData.labId}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a laboratory...</option>
                {availableLabs.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name} - {lab.building} ({lab.capacity} capacity)
                  </option>
                ))}
              </select>
              {availableLabs.length === 0 && (
                <p className="text-sm text-red-600 mt-1">No laboratories currently available</p>
              )}
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Booking Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Purpose of Booking *
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Please describe the purpose of your lab booking..."
                required
              />
            </div>

            {/* External User Notice */}
            {user.role === 'external' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> As an external user, payment will be required upon approval of your booking request.
                  You will receive a notification with payment instructions.
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={availableLabs.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => navigate(`/${user.role}/dashboard`)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Booking Guidelines</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Bookings must be made at least 24 hours in advance</li>
            <li>• Maximum booking duration is 4 hours per session</li>
            <li>• All bookings require administrative approval</li>
            <li>• Please arrive on time and adhere to lab safety protocols</li>
            {user.role === 'external' && (
              <li>• Payment must be completed within 24 hours of approval</li>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
