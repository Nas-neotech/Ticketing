import React from "react";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";

const ResultCompo = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mt-6 flex flex-wrap justify-center gap-6">
      {data.map((user) => (
        <div
          key={user.id}
          className="w-full sm:w-60 bg-gradient-to-br from-white to-blue-50 shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-2xl p-6 flex flex-col items-center space-y-4 border border-gray-100"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-indigo-700 flex items-center justify-center text-white shadow-md text-lg font-bold">
            <UserOutlined className="text-white text-4xl " />
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-lg font-bold ">{user.name || "Unknown"}</div>
            <div className="text-gray-600 gap-3 font-bold flex items-center">
              <PhoneOutlined className="text-lg" />
              {user.phone || "No phone"}
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-br from-blue-700 to-indigo-700  text-white p-2 font-bold text-lg
          rounded-2xl shadow-lg hover:shadow-indigo-800 transition-all duration-300"
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResultCompo;

