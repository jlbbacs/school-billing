import { Student, FeeCategory, Payment, OutstandingDue, DashboardStats } from '../types';

// Mock users for authentication
export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@school.edu',
    role: 'admin' as const,
    name: 'Administrator'
  },
  {
    id: '2',
    username: 'staff',
    password: 'staff123',
    email: 'staff@school.edu',
    role: 'staff' as const,
    name: 'Staff Member'
  },
  {
    id: '3',
    username: 'accountant',
    password: 'acc123',
    email: 'accountant@school.edu',
    role: 'accountant' as const,
    name: 'School Accountant'
  }
];

export const students: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1234567890',
    class: '10th',
    section: 'A',
    rollNumber: '101',
    guardianName: 'Robert Johnson',
    guardianPhone: '+1234567891',
    address: '123 Main St, City, State 12345',
    joinDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+1234567892',
    class: '9th',
    section: 'B',
    rollNumber: '201',
    guardianName: 'Mary Smith',
    guardianPhone: '+1234567893',
    address: '456 Oak Ave, City, State 12345',
    joinDate: '2024-01-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    phone: '+1234567894',
    class: '11th',
    section: 'A',
    rollNumber: '301',
    guardianName: 'James Davis',
    guardianPhone: '+1234567895',
    address: '789 Pine Rd, City, State 12345',
    joinDate: '2024-02-01',
    status: 'active'
  }
];

export const feeCategories: FeeCategory[] = [
  {
    id: '1',
    name: 'Tuition Fee',
    amount: 1500,
    description: 'Monthly tuition fee for academic instruction',
    frequency: 'monthly',
    mandatory: true
  },
  {
    id: '2',
    name: 'Library Fee',
    amount: 100,
    description: 'Access to library resources and books',
    frequency: 'monthly',
    mandatory: true
  },
  {
    id: '3',
    name: 'Lab Fee',
    amount: 200,
    description: 'Science and computer lab usage',
    frequency: 'monthly',
    mandatory: false
  },
  {
    id: '4',
    name: 'Transport Fee',
    amount: 300,
    description: 'School bus transportation service',
    frequency: 'monthly',
    mandatory: false
  },
  {
    id: '5',
    name: 'Annual Registration',
    amount: 500,
    description: 'Yearly registration and administrative fee',
    frequency: 'yearly',
    mandatory: true
  }
];

export const payments: Payment[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Alice Johnson',
    amount: 1600,
    feeCategories: ['Tuition Fee', 'Library Fee'],
    paymentMethod: 'card',
    status: 'completed',
    transactionId: 'TXN123456789',
    paymentDate: '2024-12-01',
    dueDate: '2024-12-05',
    notes: 'Payment for December 2024'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Bob Smith',
    amount: 1800,
    feeCategories: ['Tuition Fee', 'Library Fee', 'Lab Fee'],
    paymentMethod: 'bank_transfer',
    status: 'completed',
    transactionId: 'TXN123456790',
    paymentDate: '2024-12-02',
    dueDate: '2024-12-05',
    notes: 'Payment for December 2024'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Carol Davis',
    amount: 1500,
    feeCategories: ['Tuition Fee'],
    paymentMethod: 'card',
    status: 'pending',
    transactionId: 'TXN123456791',
    paymentDate: '2024-12-15',
    dueDate: '2024-12-05',
    notes: 'Payment for December 2024'
  }
];

export const outstandingDues: OutstandingDue[] = [
  {
    studentId: '3',
    studentName: 'Carol Davis',
    class: '11th A',
    totalDue: 100,
    overdueDays: 10,
    feeBreakdown: [
      {
        categoryName: 'Library Fee',
        amount: 100,
        dueDate: '2024-12-05'
      }
    ]
  }
];

export const dashboardStats: DashboardStats = {
  totalStudents: 150,
  totalRevenue: 185000,
  pendingPayments: 12,
  overdueAmount: 8500,
  monthlyRevenue: [15000, 18000, 22000, 19000, 21000, 24000, 23000, 25000, 27000, 26000, 28000, 30000],
  paymentMethodBreakdown: [
    { method: 'Card', count: 45, amount: 67500 },
    { method: 'Bank Transfer', count: 32, amount: 48000 },
    { method: 'Cash', count: 28, amount: 42000 },
    { method: 'Check', count: 15, amount: 22500 }
  ]
};