import React, { useMemo, useState } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const SearchCompo = ({ onSearchResults }) => {
  const fields = useMemo(
    () => [
      {
        id: "name",
        type: "text",
        placeholder: "Enter name",
        icon: UserOutlined,
      },
      {
        id: "phone",
        type: "text",
        placeholder: "Enter phone number",
        icon: PhoneOutlined,
        onlyNumbers: true,
      },
      {
        id: "mobile",
        type: "text",
        placeholder: "Enter mobile number",
        icon: MobileOutlined,
        onlyNumbers: true,
      },
      {
        id: "port",
        type: "text",
        placeholder: "Enter port serial number",
        icon: ClusterOutlined,
        onlyNumbers: true,
      },
    ],
    []
  );

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

 const handleInputChange = (id, value, onlyNumbers) => {
    const cleanedValue = onlyNumbers ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [id]: cleanedValue }));
  };

  const handleSearch = () => {
    // Mock data
    const mockData = [
      {
        id: 1,
        name: "Rani 1",
        phone: "111 111 1111",
        mobile: "125 456 7890",
        port: "1234",
      },
      {
        id: 2,
        name: "Rani 2",
        phone: "222 222 2222",
        mobile: "642 234 5678",
        port: "5678",
      },
      {
        id: 3,
        name: "Rani 3",
        phone: "333 333 3333",
        mobile: "712 345 6789",
        port: "1011",
      },
      {
        id: 4,
        name: "Rani 4",
        phone: "444 444 4444",
        mobile: "211 243 6789",
        port: "1213",
      },
      {
        id: 5,
        name: "Rani 5",
        phone: "555 555 5555",
        mobile: "643 234 5678",
        port: "1415",
      },
      {
        id: 6,
        name: "Rani 6",
        phone: "666 666 6666",
        mobile: "987 654 3210",
        port: "1617",
      },
      {
        id: 7,
        name: "Rani 6",
        phone: "777 777 7777",
        mobile: "987 754 3210",
        port: "1819",
      },
    ];

    const filteredData = mockData.filter(
      (user) =>
        (!formData.name || user.name.includes(formData.name)) &&
        (!formData.phone || user.phone.includes(formData.phone)) &&
        (!formData.mobile || user.mobile.includes(formData.mobile)) &&
        (!formData.port || user.port.includes(formData.port))
    );

    if (
      (formData.name || formData.phone || formData.mobile || formData.port) &&
      onSearchResults
    )
      onSearchResults(filteredData);
  };

  return (
    <div
      className="max-w-md mx-auto bg-white shadow-xl hover:shadow-2xl shadow-black transition-shadow 
    duration-300 rounded-2xl p-6 flex flex-col gap-6 border-2 border-blue-700"
    >
      <h2 className="text-2xl text-blue-700 font-semibold text-center">
        Search
      </h2>

      {fields.map((f, index) => (
        <div
          key={f.id}
          className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 
          focus-within:ring-2 focus-within:ring-blue-500 transition-all"
        >
          <f.icon
            className="text-gray-500 text-lg"
            style={f.id === "phone" ? { transform: "rotateY(180deg)" } : {}}
          />
            <input
            type="text"
            placeholder={f.placeholder}
            value={formData[f.id]}
            onChange={(e) =>
              handleInputChange(f.id, e.target.value, f.onlyNumbers)
            }
            className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            inputMode={f.onlyNumbers ? "numeric" : "text"}
          />
        </div>
      ))}
      <button
        onClick={handleSearch}
        className="w-full  bg-gradient-to-br from-blue-700 to-indigo-700 flex  flex-row gap-5
         justify-center items-center text-white font-medium py-2.5 rounded-xl
          shadow-md hover:shadow-blue-200 transition-all"
      >
        <SearchOutlined /> Search
      </button>
    </div>
  );
};

export default SearchCompo;
