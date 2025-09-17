import React, { useState } from 'react';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { FeeCategory } from '../types';
import { feeCategories as initialFeeCategories } from '../data/mockData';

const FeeManagement: React.FC = () => {
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>(initialFeeCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeCategory | null>(null);
  const [formData, setFormData] = useState<Partial<FeeCategory>>({});

  const handleAddFee = () => {
    setFormData({ frequency: 'monthly', mandatory: true });
    setEditingFee(null);
    setShowAddModal(true);
  };

  const handleEditFee = (fee: FeeCategory) => {
    setFormData(fee);
    setEditingFee(fee);
    setShowAddModal(true);
  };

  const handleSaveFee = () => {
    if (editingFee) {
      setFeeCategories(feeCategories.map(f => f.id === editingFee.id ? { ...formData as FeeCategory } : f));
    } else {
      const newFee: FeeCategory = {
        ...formData as FeeCategory,
        id: Date.now().toString()
      };
      setFeeCategories([...feeCategories, newFee]);
    }
    setShowAddModal(false);
    setFormData({});
    setEditingFee(null);
  };

  const handleDeleteFee = (feeId: string) => {
    if (window.confirm('Are you sure you want to delete this fee category?')) {
      setFeeCategories(feeCategories.filter(f => f.id !== feeId));
    }
  };

  const getFrequencyBadge = (frequency: string) => {
    const colors = {
      monthly: 'bg-blue-100 text-blue-800',
      quarterly: 'bg-green-100 text-green-800',
      yearly: 'bg-purple-100 text-purple-800',
      'one-time': 'bg-orange-100 text-orange-800'
    };
    return colors[frequency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Fee Management</h2>
          <p className="text-gray-600 mt-2">Configure fee categories and pricing structure</p>
        </div>
        <button
          onClick={handleAddFee}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Fee Category</span>
        </button>
      </div>

      {/* Fee Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeCategories.map((fee) => (
          <div key={fee.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditFee(fee)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteFee(fee.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{fee.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">${fee.amount.toLocaleString()}</p>
              </div>
              
              <p className="text-gray-600 text-sm">{fee.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getFrequencyBadge(fee.frequency)}`}>
                  {fee.frequency.replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  fee.mandatory 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {fee.mandatory ? 'Mandatory' : 'Optional'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Fee Structure Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {feeCategories.filter(f => f.frequency === 'monthly').length}
            </p>
            <p className="text-gray-600">Monthly Fees</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {feeCategories.filter(f => f.frequency === 'quarterly').length}
            </p>
            <p className="text-gray-600">Quarterly Fees</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {feeCategories.filter(f => f.frequency === 'yearly').length}
            </p>
            <p className="text-gray-600">Yearly Fees</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {feeCategories.filter(f => f.mandatory).length}
            </p>
            <p className="text-gray-600">Mandatory Fees</p>
          </div>
        </div>
      </div>

      {/* Add/Edit Fee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingFee ? 'Edit Fee Category' : 'Add New Fee Category'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fee Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Tuition Fee"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                <input
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the fee..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={formData.frequency || ''}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as FeeCategory['frequency'] })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="mandatory"
                  checked={formData.mandatory || false}
                  onChange={(e) => setFormData({ ...formData, mandatory: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="mandatory" className="text-sm font-medium text-gray-700">
                  This is a mandatory fee
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFee}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingFee ? 'Update' : 'Add'} Fee Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeManagement;