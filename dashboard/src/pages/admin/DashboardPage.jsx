import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { LuUsersRound } from "react-icons/lu";
import { MdOutlinePets } from "react-icons/md";
import { TbBrandProducthunt } from "react-icons/tb";
import { ProductContext } from '../../contextApi/productContext';

const URL = import.meta.env.VITE_Node_Api_Url;


const DashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get(`${URL}/user/`);
        setTotalUsers(res.data.users.length);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUserCount();
  }, []);

  console.log(totalUsers)

  const stats = [
    { label: 'Total Users', value: `${totalUsers}`, icon: <LuUsersRound /> },
    { label: 'Total Pets', value: '892', icon: <MdOutlinePets /> },
    { label: 'Active Appointments', value: '47', icon: '📅' },
    { label: 'Total Products', value: products.length, icon: <TbBrandProducthunt /> },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6"> {/* Added responsive padding */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome to FurShield Dashboard</h1> {/* Responsive font size */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"> {/* Unified gap sizing */}
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow flex items-center"> {/* Responsive padding */}
            <div className="text-2xl sm:text-3xl mr-4">{stat.icon}</div> {/* Responsive icon size */}
            <div>
              <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p> {/* Responsive label font size */}
              <p className="text-xl sm:text-2xl font-bold">{stat.value}</p> {/* Responsive value font size */}
              {/* <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow"> {/* Responsive padding */}
        <h2 className="text-base sm:text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition duration-200"> {/* Added transition for hover effect */}
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium">Add New User</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition duration-200">
            <div className="text-2xl mb-2">🐶</div>
            <div className="font-medium">Add New Pet</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition duration-200">
            <div className="text-2xl mb-2">📅</div>
            <div className="font-medium">Schedule Appointment</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition duration-200">
            <div className="text-2xl mb-2">🏠</div>
            <div className="font-medium">New Adoption Listing</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;