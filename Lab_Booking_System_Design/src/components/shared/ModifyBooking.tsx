import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import { User } from '../../App';
import { Calendar, Clock, FileText, Save } from 'lucide-react';
import { getBookingById, mockLabs } from '../../utils/mockData';

interface ModifyBookingProps {
  user: User;
  onLogout: () => void;
}

export default function ModifyBooking({ user, onLogout }: ModifyBookingProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const booking = getBookingById(id || '');
  
  const [formData, setFormData] = useState({
    labId: booking?.labId || '',
    date: booking?.date || '',
    startTime: booking?.startTime || '',
    endTime: booking?.endTime || '',
    purpose: booking?.purpose || '',
  });

  const availableLabs = mockLabs.filter(lab => lab.status === 'available');

  useEffect(() => {
    if (!booking) {
      alert('Booking not found');
      navigate(`/${user.role}/my-bookings`);
    } else if (booking.status !== 'pending') {
      alert('Only pending bookings can be modified');
      navigate(`/${user.role}/my-bookings`);
    }
  }, [booking, navigate, user.role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.startTime >= formData.endTime) {
      alert('End time must be after start time');
      return;
    }

    alert('Booking updated successfully!');
    navigate(`/${user.role}/my-bookings`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!booking) {
    return null;
  }

  return (
    <Layout user={user} onLogout={onLogout} currentPage="My Bookings">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Modify Booking</h1>
        <p className="text-gray-600 mb-8">Update your booking details</p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lab Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Laboratory *
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

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(`/${user.role}/my-bookings`)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
