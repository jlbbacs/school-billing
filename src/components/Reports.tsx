import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { payments, outstandingDues } from '../data/mockData';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [reportType, setReportType] = useState('revenue');

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'today': return 'Today';
      case 'this-week': return 'This Week';
      case 'this-month': return 'This Month';
      case 'this-quarter': return 'This Quarter';
      case 'this-year': return 'This Year';
      default: return 'This Month';
    }
  };

  const getFilteredPayments = () => {
    const now = new Date();
    return payments.filter(payment => {
      const paymentDate = new Date(payment.paymentDate);
      
      switch (selectedPeriod) {
        case 'today':
          return paymentDate.toDateString() === now.toDateString();
        case 'this-week':
          const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
          return paymentDate >= weekStart;
        case 'this-month':
          return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
        case 'this-quarter':
          const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          return paymentDate >= quarterStart;
        case 'this-year':
          return paymentDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredPayments = getFilteredPayments();
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = filteredPayments.filter(p => p.status === 'completed');
  const pendingPayments = filteredPayments.filter(p => p.status === 'pending');

  // Payment method breakdown
  const paymentMethodBreakdown = filteredPayments.reduce((acc, payment) => {
    acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + payment.amount;
    return acc;
  }, {} as Record<string, number>);

  // Fee category breakdown
  const feeCategoryBreakdown = filteredPayments.reduce((acc, payment) => {
    payment.feeCategories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const reportSections = [
    {
      id: 'revenue',
      title: 'Revenue Report',
      icon: DollarSign,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-900">${totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-medium">Completed Payments</p>
                  <p className="text-3xl font-bold text-blue-900">{completedPayments.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 font-medium">Pending Payments</p>
                  <p className="text-3xl font-bold text-orange-900">{pendingPayments.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Breakdown</h4>
            <div className="space-y-4">
              {Object.entries(paymentMethodBreakdown).map(([method, amount]) => (
                <div key={method} className="flex items-center justify-between">
                  <span className="capitalize text-gray-700">{method.replace('_', ' ')}</span>
                  <span className="font-bold text-gray-900">${amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'outstanding',
      title: 'Outstanding Dues',
      icon: AlertTriangle,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 font-medium">Total Outstanding</p>
                <p className="text-3xl font-bold text-red-900">
                  ${outstandingDues.reduce((sum, due) => sum + due.totalDue, 0).toLocaleString()}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Students with Outstanding Dues</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Student</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Class</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Amount Due</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Days Overdue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {outstandingDues.map((due) => (
                    <tr key={due.studentId}>
                      <td className="py-3 px-6 font-medium text-gray-900">{due.studentName}</td>
                      <td className="py-3 px-6 text-gray-600">{due.class}</td>
                      <td className="py-3 px-6 font-bold text-red-600">${due.totalDue.toLocaleString()}</td>
                      <td className="py-3 px-6">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          {due.overdueDays} days
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Payment Analytics',
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Fee Category Performance</h4>
            <div className="space-y-4">
              {Object.entries(feeCategoryBreakdown).map(([category, count]) => {
                const percentage = (count / filteredPayments.length) * 100;
                return (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-gray-600">{count} payments</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Collection Rate</h4>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {((completedPayments.length / filteredPayments.length) * 100).toFixed(1)}%
                </div>
                <p className="text-gray-600">of payments collected successfully</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Average Payment</h4>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${Math.round(totalRevenue / filteredPayments.length || 0).toLocaleString()}
                </div>
                <p className="text-gray-600">per transaction</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentSection = reportSections.find(section => section.id === reportType) || reportSections[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-2">Comprehensive insights into payment performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {reportSections.map(section => (
                  <option key={section.id} value={section.id}>{section.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
        <div className="flex space-x-1">
          {reportSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setReportType(section.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  reportType === section.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{currentSection.title}</h3>
          <span className="text-gray-600">{getPeriodLabel()}</span>
        </div>
        {currentSection.content}
      </div>
    </div>
  );
};

export default Reports;