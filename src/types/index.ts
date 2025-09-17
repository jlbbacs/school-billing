export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  rollNumber: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface FeeCategory {
  id: string;
  name: string;
  amount: number;
  description: string;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  mandatory: boolean;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  feeCategories: string[];
  paymentMethod: 'card' | 'bank_transfer' | 'cash' | 'check';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  transactionId: string;
  paymentDate: string;
  dueDate: string;
  notes?: string;
}

export interface OutstandingDue {
  studentId: string;
  studentName: string;
  class: string;
  totalDue: number;
  overdueDays: number;
  feeBreakdown: {
    categoryName: string;
    amount: number;
    dueDate: string;
  }[];
}

export interface DashboardStats {
  totalStudents: number;
  totalRevenue: number;
  pendingPayments: number;
  overdueAmount: number;
  monthlyRevenue: number[];
  paymentMethodBreakdown: {
    method: string;
    count: number;
    amount: number;
  }[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'accountant';
  name: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}