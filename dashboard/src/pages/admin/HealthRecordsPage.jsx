import React, { useState, useEffect } from 'react';

const mockHealthRecords = [
  { id: 1, pet: 'Buddy', owner: 'Alice Johnson', vet: 'Dr. Smith', date: '2024-05-10', diagnosis: 'Routine Checkup' },
  { id: 2, pet: 'Whiskers', owner: 'Bob Williams', vet: 'Dr. Lee', date: '2024-04-22', diagnosis: 'Vaccination - Rabies' },
  { id: 3, pet: 'Max', owner: 'Happy Paws Shelter', vet: 'Dr. Smith', date: '2024-06-01', diagnosis: 'Treatment for Fleas' },
  { id: 4, pet: 'Daisy', owner: 'Sarah Connor', vet: 'Dr. Lee', date: '2024-05-25', diagnosis: 'Allergy medication' },
  { id: 5, pet: 'Paws', owner: 'John Wick', vet: 'Dr. Smith', date: '2024-04-15', diagnosis: 'Annual Checkup' },
];

const HealthRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState({ pet: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  useEffect(() => {
    setRecords(mockHealthRecords);
  }, []);

  const filteredRecords = records.filter(record => {
    const matchesPet = filters.pet ? record.pet === filters.pet : true;
    const matchesSearch = record.pet.toLowerCase().includes(searchTerm.toLowerCase()) || record.owner.toLowerCase().includes(searchTerm.toLowerCase()) || record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPet && matchesSearch;
  });

  // Replaces window.confirm with a custom modal
  const handleDeleteRecord = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setRecords(records.filter(record => record.id !== recordToDelete.id));
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Health Records</h1>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by pet, owner, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <select
            value={filters.pet}
            onChange={(e) => setFilters({ ...filters, pet: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Pets</option>
            {mockHealthRecords.map((record, index) => (
              <option key={index} value={record.pet}>{record.pet}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Health Records Display */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veterinarian</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis Summary</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.pet}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.vet}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.diagnosis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteRecord(record)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No health records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div key={record.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-blue-600">{record.pet}</h3>
                  <div className="text-xs text-gray-500">Record ID: {record.id}</div>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-medium">Owner:</span> {record.owner}</p>
                  <p><span className="font-medium">Veterinarian:</span> {record.vet}</p>
                  <p><span className="font-medium">Date:</span> {record.date}</p>
                  <p><span className="font-medium">Diagnosis:</span> {record.diagnosis}</p>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleDeleteRecord(record)}
                    className="text-red-600 hover:text-red-900 transition-colors font-medium"
                  >
                    Delete Record
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">
              No health records found.
            </div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal 
          record={recordToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

const DeleteConfirmationModal = ({ record, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to permanently delete the health record for <span className="font-medium text-gray-900">{record?.pet}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordsPage;
