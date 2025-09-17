    import { useState } from 'react';
    import { Plus, Search, Edit, Trash2, Mail, Phone, User, MapPin } from 'lucide-react';
    import { Student } from '../types/index';
    import { students as initialStudents } from '../data/mockData';

    const StudentManagement: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Partial<Student>>({});

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.includes(searchTerm)
    );

    const handleAddStudent = () => {
        setFormData({});
        setEditingStudent(null);
        setShowAddModal(true);
    };

    const handleEditStudent = (student: Student) => {
        setFormData(student);
        setEditingStudent(student);
        setShowAddModal(true);
    };

    const handleSaveStudent = () => {
        if (editingStudent) {
        setStudents(students.map(s => s.id === editingStudent.id ? { ...formData as Student } : s));
        } else {
        const newStudent: Student = {
            ...formData as Student,
            id: Date.now().toString(),
            status: 'active'
        };
        setStudents([...students, newStudent]);
        }
        setShowAddModal(false);
        setFormData({});
        setEditingStudent(null);
    };

    const handleDeleteStudent = (studentId: string) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
        setStudents(students.filter(s => s.id !== studentId));
        }
    };

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
            <p className="text-gray-600 mt-2">Manage student information and enrollment details</p>
            </div>
            <button
            onClick={handleAddStudent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
            <Plus className="h-5 w-5" />
            <span>Add Student</span>
            </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                type="text"
                placeholder="Search students by name, class, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Student</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Class</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Guardian</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                        </div>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {student.class} {student.section}
                        </span>
                    </td>
                    <td className="py-4 px-6">
                        <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{student.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{student.phone}</span>
                        </div>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <div className="space-y-1">
                        <p className="font-medium text-gray-900">{student.guardianName}</p>
                        <p className="text-sm text-gray-600">{student.guardianPhone}</p>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {student.status}
                        </span>
                    </td>
                    <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleEditStudent(student)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Add/Edit Student Modal */}
        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                    <select
                    value={formData.class || ''}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <option value="">Select Class</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <select
                    value={formData.section || ''}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                    <input
                    type="text"
                    value={formData.rollNumber || ''}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name</label>
                    <input
                    type="text"
                    value={formData.guardianName || ''}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
                    <input
                    type="tel"
                    value={formData.guardianPhone || ''}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                    <input
                    type="date"
                    value={formData.joinDate || ''}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                    onClick={handleSaveStudent}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {editingStudent ? 'Update' : 'Add'} Student
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default StudentManagement;