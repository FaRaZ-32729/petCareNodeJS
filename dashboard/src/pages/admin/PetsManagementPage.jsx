import React, { useState, useEffect } from 'react';

const mockPets = [
  { id: 1, name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, owner: 'Alice Johnson', status: 'Active' },
  { id: 2, name: 'Whiskers', species: 'Cat', breed: 'Siamese', age: 2, owner: 'Bob Williams', status: 'Active' },
  { id: 3, name: 'Max', species: 'Dog', breed: 'German Shepherd', age: 5, owner: 'Dr. Smith', status: 'In Shelter' },
  { id: 4, name: 'Daisy', species: 'Dog', breed: 'Labrador', age: 1, owner: 'Sarah Connor', status: 'In Shelter' },
  { id: 5, name: 'Paws', species: 'Cat', breed: 'Persian', age: 4, owner: 'John Wick', status: 'Adopted' },
];

const PetsManagementPage = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ species: '', status: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentPet, setCurrentPet] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  useEffect(() => {
    setPets(mockPets);
  }, []);

  const filteredPets = pets.filter(pet => {
    const matchesSpecies = filters.species ? pet.species === filters.species : true;
    const matchesStatus = filters.status ? pet.status === filters.status : true;
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || pet.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecies && matchesStatus && matchesSearch;
  });

  const handleCreatePet = () => {
    setModalType('create');
    setCurrentPet(null);
    setIsModalOpen(true);
  };

  const handleEditPet = (pet) => {
    setModalType('edit');
    setCurrentPet(pet);
    setIsModalOpen(true);
  };

  const handleDeletePet = (pet) => {
    setPetToDelete(pet);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setPets(pets.filter(pet => pet.id !== petToDelete.id));
    setIsDeleteModalOpen(false);
    setPetToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPetToDelete(null);
  };

  const handleModalSubmit = (formData) => {
    if (modalType === 'create') {
      const newPet = {
        id: pets.length + 1,
        ...formData,
      };
      setPets([...pets, newPet]);
    } else if (modalType === 'edit' && currentPet) {
      setPets(pets.map(pet => pet.id === currentPet.id ? { ...pet, ...formData } : pet));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Pet Management</h1>
        <button
          onClick={handleCreatePet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Pet
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by pet name or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 justify-end">
          <select
            value={filters.species}
            onChange={(e) => setFilters({ ...filters, species: e.target.value })}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="In Shelter">In Shelter</option>
            <option value="Adopted">Adopted</option>
          </select>
        </div>
      </div>

      {/* Pet Records Display */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pet.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pet.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.species}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.breed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${pet.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          pet.status === 'In Shelter' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-purple-100 text-purple-800'}`}>
                        {pet.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditPet(pet)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePet(pet)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No pets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div key={pet.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-blue-600">{pet.name}</h3>
                  <div className="text-xs text-gray-500">ID: {pet.id}</div>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-medium">Species:</span> {pet.species}</p>
                  <p><span className="font-medium">Breed:</span> {pet.breed}</p>
                  <p><span className="font-medium">Age:</span> {pet.age} years</p>
                  <p><span className="font-medium">Owner:</span> {pet.owner}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${pet.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        pet.status === 'In Shelter' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-purple-100 text-purple-800'}`}>
                      {pet.status}
                    </span>
                  </p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditPet(pet)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePet(pet)}
                    className="text-red-600 hover:text-red-900 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">
              No pets found.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PetCRUDModal
          type={modalType}
          pet={currentPet}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          item={petToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Are you sure you want to permanently delete this pet record?"
        />
      )}
    </div>
  );
};

const PetCRUDModal = ({ type, pet, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    species: pet?.species || 'Dog',
    breed: pet?.breed || '',
    age: pet?.age || 1,
    owner: pet?.owner || '',
    status: pet?.status || 'Active',
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {type === 'create' ? 'Create New Pet' : 'Edit Pet'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Pet Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="species" className="block text-sm font-medium text-gray-700">Species</label>
            <select
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age (Years)</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
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
              <option value="Active">Active</option>
              <option value="In Shelter">In Shelter</option>
              <option value="Adopted">Adopted</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {type === 'create' ? 'Create Pet' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({  onConfirm, onCancel, message }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
        <p className="text-sm text-gray-700 mb-4">
          {message}
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

export default PetsManagementPage;
