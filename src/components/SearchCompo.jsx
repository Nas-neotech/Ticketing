import React, { useMemo, useState } from "react";
import { PhoneOutlined } from '@ant-design/icons';
import { FaPhoneAlt } from "react-icons/fa";

const SearchCompo = ({ onSearchResults }) => {
  const fields = useMemo(
    () => [
      { id: "name", type: "text", placeholder: "Enter name" },
      { id: "phone", type: "tel", placeholder: "Enter phone number" },
      { id: "mobile", type: "tel", placeholder: "Enter mobile number" },
      { id: "port", type: "text", placeholder: "Enter port serial number" },
    ],
    []
  );

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = () => {
    // Mock data
    const mockData = [
      { id: 1, name: "Rani 1", phone: "123-456-7890", mobile: "555-111-2222", port: "PORT-1234" },
      { id: 2, name: "Rani 2", phone: "987-654-3210", mobile: "555-333-4444", port: "PORT-5678" },
      { id: 3, name: "Rani 3", phone: "555-123-4567", mobile: "555-555-5555", port: "PORT-9999" },
    ];

    // Optional: filter based on input
    const filteredData = mockData.filter(user =>
      (!formData.name || user.name.includes(formData.name)) &&
      (!formData.phone || user.phone.includes(formData.phone)) &&
      (!formData.mobile || user.mobile.includes(formData.mobile)) &&
      (!formData.port || user.port.includes(formData.port))
    );

    if (onSearchResults) onSearchResults(filteredData);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Search test data icon 2
      </h2>

      {fields.map(({ id, type, placeholder }) => (
        <div
          key={id}
          className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
        >
          <input
            type={type}
            placeholder={placeholder}
            value={formData[id]}
            onChange={(e) => handleInputChange(id, e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>
      ))}

      <PhoneOutlined/> -- <FaPhoneAlt/>
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl shadow-md hover:shadow-blue-200 transition-all"
      >
        Search
      </button>
    </div>
  );
};

export default SearchCompo;
