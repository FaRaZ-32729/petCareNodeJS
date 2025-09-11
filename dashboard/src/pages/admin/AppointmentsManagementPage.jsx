// src/pages/admin/AppointmentsManagementPage.jsx
import React, { useState, useEffect } from 'react';

const mockAppointments = [
  { id: 1, pet: 'Buddy', owner: 'Alice Johnson', vet: 'Dr. Smith', date: '2024-06-15 10:00 AM', status: 'Confirmed' },
  { id: 2, pet: 'Whiskers', owner: 'Bob Williams', vet: 'Dr. Lee', date: '2024-06-16 02:30 PM', status: 'Pending' },
  { id: 3, pet: 'Max', owner: 'Happy Paws Shelter', vet: 'Dr. Smith', date: '2024-06-17 09:00 AM', status: 'Completed' },
  { id: 4, pet: 'Luna', owner: 'Charlie Brown', vet: 'Dr. Lee', date: '2024-06-18 11:00 AM', status: 'Confirmed' },
  { id: 5, pet: 'Rocky', owner: 'Diana Prince', vet: 'Dr. Smith', date: '2024-06-19 03:00 PM', status: 'Pending' },
  { id: 6, pet: 'Daisy', owner: 'Peter Parker', vet: 'Dr. Lee', date: '2024-06-20 01:00 PM', status: 'Cancelled' },
];

const AppointmentsManagementPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({ status: '', vet: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentAppt, setCurrentAppt] = useState(null);

  useEffect(() => {
    setAppointments(mockAppointments);
  }, []);

  const filteredAppointments = appointments.filter(appt => {
    const matchesStatus = filters.status ? appt.status === filters.status : true;
    const matchesVet = filters.vet ? appt.vet === filters.vet : true;
    const matchesSearch = appt.pet.toLowerCase().includes(searchTerm.toLowerCase()) || appt.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesVet && matchesSearch;
  });

  const handleCreateAppointment = () => {
    setModalType('create');
    setCurrentAppt(null);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appt) => {
    setModalType('edit');
    setCurrentAppt(appt);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (apptId) => {
    if (window.confirm(`Are you sure you want to delete this appointment?`)) {
      setAppointments(appointments.filter(appt => appt.id !== apptId));
    }
  };

  const handleModalSubmit = (formData) => {
    if (modalType === 'create') {
      const newAppt = {
        id: appointments.length + 1,
        ...formData,
      };
      setAppointments([...appointments, newAppt]);
    } else if (modalType === 'edit' && currentAppt) {
      setAppointments(appointments.map(appt => appt.id === currentAppt.id ? { ...appt, ...formData } : appt));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6"> {/* Responsive padding */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> {/* Improved alignment */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Appointment Management</h1>
        <button
          onClick={handleCreateAppointment}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center sm:justify-start transition duration-200"
        >
          <span className="mr-2">+</span> Create Appointment
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
        <div className="flex-1 w-full"> {/* Ensures search bar takes full width */}
          <input
            type="text"
            placeholder="Search by pet or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:flex md:space-x-4 md:space-y-0"> {/* Grid for small screens, flex for larger */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-2 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={filters.vet}
            onChange={(e) => setFilters({ ...filters, vet: e.target.value })}
            className="px-2 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="">All Vets</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Lee">Dr. Lee</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto"> {/* Enable horizontal scrolling for the table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Owner</th> {/* Hide on small screens */}
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Veterinarian</th> {/* Hide on medium and small screens */}
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-900">{appt.id}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appt.pet}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{appt.owner}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{appt.vet}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">{appt.date}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                         appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                         appt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                         'bg-red-100 text-red-800'}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditAppointment(appt)}
                      className="text-indigo-600 hover:text-indigo-900 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appt.id)}
                      className="text-red-600 hover:text-red-900 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AppointmentCRUDModal
          type={modalType}
          appointment={currentAppt}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const AppointmentCRUDModal = ({ type, appointment, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    pet: appointment?.pet || '',
    owner: appointment?.owner || '',
    vet: appointment?.vet || 'Dr. Smith',
    date: appointment?.date || '',
    status: appointment?.status || 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4"> {/* Added responsive padding */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {type === 'create' ? 'Create New Appointment' : 'Edit Appointment'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pet" className="block text-sm font-medium text-gray-700">Pet Name</label>
            <input
              type="text"
              id="pet"
              name="pet"
              value={formData.pet}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner Name</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="vet" className="block text-sm font-medium text-gray-700">Veterinarian</label>
            <select
              id="vet"
              name="vet"
              value={formData.vet}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Lee">Dr. Lee</option>
              <option value="Dr. Patel">Dr. Patel</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              {type === 'create' ? 'Create Appointment' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsManagementPage;