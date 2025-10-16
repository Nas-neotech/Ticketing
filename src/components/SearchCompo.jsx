
import React from "react";

const SearchCompo = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Search new new
      </h2>

      {/* Name Input */}
      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <img
          src="/path/to/user.png"
          alt="User Icon"
          className="w-5 h-5 object-contain opacity-70"
        />
        <input
          type="text"
          placeholder="Enter name"
          className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </div>

      {/* Phone Input */}
      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <img
          src="/path/to/phone.png"
          alt="Phone Icon"
          className="w-5 h-5 object-contain opacity-70"
        />
        <input
          type="tel"
          placeholder="Enter phone number"
          className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </div>

      {/* Search Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl shadow-md hover:shadow-blue-200 transition-all">
        Search
      </button>
    </div>
  );
};

export default SearchCompo;
