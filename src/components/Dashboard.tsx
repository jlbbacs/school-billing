import React from 'react';
import { TrendingUp, Users, DollarSign, AlertTriangle } from 'lucide-react';
import { dashboardStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: dashboardStats.totalStudents.toLocaleString(),
      icon: Users,
      color: 'blue',
      change: '+5.2%'
    },
    {
      title: 'Total Revenue',
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'green',
      change: '+12.1%'
    },
    {
      title: 'Pending Payments',
      value: dashboardStats.pendingPayments.toString(),
      icon: AlertTriangle,
      color: 'orange',
      change: '-3.2%'
    },
    {
      title: 'Overdue Amount',
      value: `$${dashboardStats.overdueAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: 'red',
      change: '-8.5%'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-50', icon: 'bg-blue-500', text: 'text-blue-600' };
      case 'green':
        return { bg: 'bg-green-50', icon: 'bg-green-500', text: 'text-green-600' };
      case 'orange':
        return { bg: 'bg-orange-50', icon: 'bg-orange-500', text: 'text-orange-600' };
      case 'red':
        return { bg: 'bg-red-50', icon: 'bg-red-500', text: 'text-red-600' };
      default:
        return { bg: 'bg-gray-50', icon: 'bg-gray-500', text: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">Overview of your school's financial performance</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon className={`h-6 w-6 text-white ${colors.icon}`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {dashboardStats.monthlyRevenue.map((revenue, index) => {
              const height = (revenue / Math.max(...dashboardStats.monthlyRevenue)) * 100;
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex justify-center">
                    <div
                      className="bg-blue-500 rounded-t-md w-8 hover:bg-blue-600 transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${months[index]}: $${revenue.toLocaleString()}`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{months[index]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h3>
          <div className="space-y-4">
            {dashboardStats.paymentMethodBreakdown.map((method, index) => {
              const percentage = (method.count / dashboardStats.paymentMethodBreakdown.reduce((sum, m) => sum + m.count, 0)) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{method.method}</span>
                    <span className="text-sm text-gray-600">{method.count} payments</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${colors[index % colors.length]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
                    <span className="text-xs text-gray-500">${method.amount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="bg-green-500 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Payment received from Alice Johnson</p>
              <p className="text-xs text-gray-600">Tuition Fee - ₱1,500 • 2 hours ago</p>
            </div>
            <span className="text-green-600 font-medium">+₱1,500</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="bg-orange-500 p-2 rounded-full">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Payment overdue for Carol Davis</p>
              <p className="text-xs text-gray-600">Library Fee - ₱100 • 10 days overdue</p>
            </div>
            <span className="text-orange-600 font-medium">₱100</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="bg-blue-500 p-2 rounded-full">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New student registered</p>
              <p className="text-xs text-gray-600">David Wilson - Class 9th A • 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;