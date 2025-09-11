// src/pages/admin/AdoptionsManagementPage.jsx
import React, { useState, useEffect } from 'react';

const mockAdoptions = [
  { id: 1, petName: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, shelter: 'Happy Paws Shelter', health: 'Excellent', status: 'Available' },
  { id: 2, petName: 'Luna', species: 'Cat', breed: 'Persian', age: 1, shelter: 'City Animal Rescue', health: 'Good', status: 'Pending' },
  { id: 3, petName: 'Rocky', species: 'Dog', breed: 'Boxer', age: 4, shelter: 'Happy Paws Shelter', health: 'Fair', status: 'Adopted' },
];

const AdoptionsManagementPage = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ status: '', species: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentListing, setCurrentListing] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setListings(mockAdoptions);
  }, []);

  const filteredListings = listings.filter(listing => {
    const matchesStatus = filters.status ? listing.status === filters.status : true;
    const matchesSpecies = filters.species ? listing.species === filters.species : true;
    const matchesSearch = listing.petName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          listing.shelter.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSpecies && matchesSearch;
  });

  const handleCreateListing = () => {
    setModalType('create');
    setCurrentListing(null);
    setIsModalOpen(true);
  };

  const handleEditListing = (listing) => {
    setModalType('edit');
    setCurrentListing(listing);
    setIsModalOpen(true);
  };

  const handleDeleteListing = (listingId) => {
    if (window.confirm(`Are you sure you want to delete this adoption listing?`)) {
      setListings(listings.filter(listing => listing.id !== listingId));
    }
  };

  const handleModalSubmit = (formData) => {
    if (modalType === 'create') {
      const newListing = {
        id: Math.max(...listings.map(l => l.id), 0) + 1,
        ...formData,
      };
      setListings([...listings, newListing]);
    } else if (modalType === 'edit' && currentListing) {
      setListings(listings.map(listing => listing.id === currentListing.id ? { ...listing, ...formData } : listing));
    }
    setIsModalOpen(false);
  };

  const clearFilters = () => {
    setFilters({ status: '', species: '' });
    setSearchTerm('');
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Adoption Listings</h1>
        <button
          onClick={handleCreateListing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center w-full sm:w-auto justify-center"
        >
          <span className="mr-2">+</span> Add New Listing
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by pet name or shelter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Mobile filter toggle */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="sm:hidden px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center"
          >
            <span>Filters</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </button>
        </div>

        {/* Filter section - hidden on mobile unless toggled */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} sm:block`}>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              value={filters.species}
              onChange={(e) => setFilters({ ...filters, species: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
            </select>
            
            {(filters.status || filters.species || searchTerm) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center"
              >
                Clear filters
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Table for larger screens */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shelter</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{listing.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.petName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{listing.species}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{listing.breed}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{listing.age}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{listing.shelter}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{listing.health}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${listing.status === 'Available' ? 'bg-green-100 text-green-800' : 
                          listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-purple-100 text-purple-800'}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditListing(listing)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                    No adoption listings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cards for mobile screens */}
        <div className="md:hidden">
          {filteredListings.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{listing.petName}</h3>
                      <p className="text-sm text-gray-500">{listing.species} • {listing.breed}</p>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${listing.status === 'Available' ? 'bg-green-100 text-green-800' : 
                        listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-purple-100 text-purple-800'}`}>
                      {listing.status}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Age:</span> {listing.age} years
                    </div>
                    <div>
                      <span className="font-medium">Health:</span> {listing.health}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Shelter:</span> {listing.shelter}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditListing(listing)}
                      className="text-sm text-indigo-600 hover:text-indigo-900 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteListing(listing.id)}
                      className="text-sm text-red-600 hover:text-red-900 px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              No adoption listings found.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AdoptionCRUDModal
          type={modalType}
          listing={currentListing}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const AdoptionCRUDModal = ({ type, listing, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    petName: listing?.petName || '',
    species: listing?.species || 'Dog',
    breed: listing?.breed || '',
    age: listing?.age || 1,
    shelter: listing?.shelter || '',
    health: listing?.health || 'Excellent',
    status: listing?.status || 'Available',
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {type === 'create' ? 'Create New Adoption Listing' : 'Edit Listing'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700">Pet Name</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
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
            <label htmlFor="shelter" className="block text-sm font-medium text-gray-700">Shelter Name</label>
            <input
              type="text"
              id="shelter"
              name="shelter"
              value={formData.shelter}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="health" className="block text-sm font-medium text-gray-700">Health Status</label>
            <select
              id="health"
              name="health"
              value={formData.health}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Adoption Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {type === 'create' ? 'Create Listing' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionsManagementPage;