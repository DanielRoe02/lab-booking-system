// Mock data for the application

export interface Lab {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
  building: string;
  floor: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  labId: string;
  labName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  createdAt: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentAmount?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'internal' | 'external' | 'admin';
  status: 'active' | 'inactive';
  createdAt: string;
  department?: string;
}

export const mockLabs: Lab[] = [
  {
    id: 'lab-1',
    name: 'Computer Science Lab A',
    capacity: 30,
    equipment: ['PCs', 'Projector', 'Whiteboard', 'Air Conditioning'],
    status: 'available',
    building: 'Main Building',
    floor: '2nd Floor',
  },
  {
    id: 'lab-2',
    name: 'Computer Science Lab B',
    capacity: 25,
    equipment: ['PCs', 'Projector', 'Interactive Board'],
    status: 'occupied',
    building: 'Main Building',
    floor: '2nd Floor',
  },
  {
    id: 'lab-3',
    name: 'Physics Laboratory',
    capacity: 20,
    equipment: ['Experiment Tables', 'Safety Equipment', 'Instruments'],
    status: 'available',
    building: 'Science Building',
    floor: '1st Floor',
  },
  {
    id: 'lab-4',
    name: 'Chemistry Laboratory',
    capacity: 20,
    equipment: ['Fume Hoods', 'Lab Benches', 'Safety Shower'],
    status: 'available',
    building: 'Science Building',
    floor: '1st Floor',
  },
  {
    id: 'lab-5',
    name: 'Engineering Workshop',
    capacity: 15,
    equipment: ['3D Printers', 'CNC Machines', 'Hand Tools'],
    status: 'maintenance',
    building: 'Engineering Building',
    floor: 'Ground Floor',
  },
  {
    id: 'lab-6',
    name: 'Biology Laboratory',
    capacity: 24,
    equipment: ['Microscopes', 'Lab Benches', 'Incubators'],
    status: 'available',
    building: 'Science Building',
    floor: '2nd Floor',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@example.com',
    labId: 'lab-1',
    labName: 'Computer Science Lab A',
    date: '2026-01-15',
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'Software Development Class',
    status: 'approved',
    createdAt: '2026-01-10T10:30:00',
  },
  {
    id: 'booking-2',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@example.com',
    labId: 'lab-3',
    labName: 'Physics Laboratory',
    date: '2026-01-18',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Mechanics Experiment',
    status: 'pending',
    createdAt: '2026-01-11T14:20:00',
  },
  {
    id: 'booking-3',
    userId: '2',
    userName: 'John Smith',
    userEmail: 'john@external.com',
    labId: 'lab-1',
    labName: 'Computer Science Lab A',
    date: '2026-01-20',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Research Data Analysis',
    status: 'pending',
    createdAt: '2026-01-11T09:15:00',
    paymentStatus: 'paid',
    paymentAmount: 150,
  },
  {
    id: 'booking-4',
    userId: '3',
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    labId: 'lab-6',
    labName: 'Biology Laboratory',
    date: '2026-01-16',
    startTime: '13:00',
    endTime: '15:00',
    purpose: 'Cell Culture Study',
    status: 'approved',
    createdAt: '2026-01-09T11:00:00',
  },
  {
    id: 'booking-5',
    userId: '1',
    userName: 'Demo User',
    userEmail: 'demo@example.com',
    labId: 'lab-2',
    labName: 'Computer Science Lab B',
    date: '2026-01-12',
    startTime: '09:00',
    endTime: '10:00',
    purpose: 'Programming Workshop',
    status: 'completed',
    createdAt: '2026-01-05T08:30:00',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: '1',
    title: 'Booking Approved',
    message: 'Your booking for Computer Science Lab A on 2026-01-15 has been approved.',
    type: 'success',
    read: false,
    createdAt: '2026-01-11T10:00:00',
  },
  {
    id: 'notif-2',
    userId: '1',
    title: 'Booking Pending',
    message: 'Your booking request for Physics Laboratory is pending approval.',
    type: 'info',
    read: false,
    createdAt: '2026-01-11T14:25:00',
  },
  {
    id: 'notif-3',
    userId: '1',
    title: 'Reminder',
    message: 'Your lab session at Computer Science Lab A starts in 24 hours.',
    type: 'warning',
    read: true,
    createdAt: '2026-01-10T15:00:00',
  },
];

export const mockUsers: UserAccount[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'internal',
    status: 'active',
    createdAt: '2025-09-01',
    department: 'Computer Science',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@external.com',
    role: 'external',
    status: 'active',
    createdAt: '2025-10-15',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'internal',
    status: 'active',
    createdAt: '2025-08-20',
    department: 'Biology',
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-01',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'internal',
    status: 'active',
    createdAt: '2025-11-10',
    department: 'Engineering',
  },
];

// Helper functions
export const getLabById = (id: string): Lab | undefined => {
  return mockLabs.find(lab => lab.id === id);
};

export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find(booking => booking.id === id);
};

export const getUserBookings = (userId: string): Booking[] => {
  return mockBookings.filter(booking => booking.userId === userId);
};

export const getUserNotifications = (userId: string): Notification[] => {
  return mockNotifications.filter(notif => notif.userId === userId);
};

export const getPendingBookings = (): Booking[] => {
  return mockBookings.filter(booking => booking.status === 'pending');
};

export const getBookingStats = () => {
  return {
    total: mockBookings.length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    approved: mockBookings.filter(b => b.status === 'approved').length,
    rejected: mockBookings.filter(b => b.status === 'rejected').length,
    completed: mockBookings.filter(b => b.status === 'completed').length,
  };
};

export const getLabStats = () => {
  return {
    total: mockLabs.length,
    available: mockLabs.filter(l => l.status === 'available').length,
    occupied: mockLabs.filter(l => l.status === 'occupied').length,
    maintenance: mockLabs.filter(l => l.status === 'maintenance').length,
  };
};
