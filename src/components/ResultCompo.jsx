import React from "react";

const ResultCompo = ({ data }) => {
  if (!data || data.length === 0) return null; 

  return (
    <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {data.map((user) => (
        <div
          key={user.id}
          className="bg-gradient-to-br from-white to-blue-50 shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-2xl p-6 flex flex-col items-center space-y-4 border border-gray-100"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md text-lg font-bold">
            {user.name[0]} 
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
              {user.name}
            </h3>
            <p className="text-gray-500 text-sm font-medium">{user.phone}</p>
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-blue-300 transition-all duration-300">
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResultCompo;
