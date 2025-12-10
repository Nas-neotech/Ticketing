import React, { useMemo, useState } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const ProSearch = ({ onSearchResults }) => {
  const fields = useMemo(
    () => [
      {
        id: "name",
        type: "text",
        placeholder: "Name",
        icon: UserOutlined,
      },
      {
        id: "phone",
        type: "text",
        placeholder: "Phone number",
        icon: PhoneOutlined,
        onlyNumbers: true,
      },
      {
        id: "mobile",
        type: "text",
        placeholder: "Mobile number",
        icon: MobileOutlined,
        onlyNumbers: true,
      },
      {
        id: "port",
        type: "text",
        placeholder: "Port's serial number",
        icon: ClusterOutlined,
        onlyNumbers: true,
      },
    ],
    []
  );

  const [formData, setFormData] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {})
  );

  const handleInputChange = (id, value, onlyNumbers) => {
    const cleanedValue = onlyNumbers ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [id]: cleanedValue }));
  };

  const handleSearch = () => {
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
        name: "Rani 7",
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
    ) {
      onSearchResults(filteredData);
    }
  };

  return (
    <div
      className="w-full h-full bg-[url(./src/assets/bg.png)] bg-cover
     flex items-center justify-center"
    >
      <div
        className="w-[30%] backdrop-blur-md bg-white/30
       rounded-3xl shadow-2xl shadow-black p-6 flex flex-col gap-4"
      >
        <div className="flex justify-center">
          <img src="./src/assets/logo.gif" />
        </div>

        {fields.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-4 bg-white
             border border-gray-400 rounded-xl p-3 focus-within:border-2
              focus-within:border-purple-900 "
          >
            <f.icon className="text-purple-900 text-xl" />
            <input
              type="text"
              placeholder={f.placeholder}
              value={formData[f.id]}
              onChange={(e) =>
                handleInputChange(f.id, e.target.value, f.onlyNumbers)
              }
              className="flex-1 outline-none font-semibold text-gray-800
               placeholder-gray-400 bg-transparent "
              inputMode={f.onlyNumbers ? "numeric" : "text"}
            />
          </div>
        ))}

        <button
          onClick={handleSearch}
          className="w-full flex bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-900 shadow-lg
                     p-2 items-center justify-center gap-2 text-white font-semibold
                     rounded-xl"
        >
          <SearchOutlined style={{ fontSize: "24px" }} />
          Search
        </button>
      </div>
    </div>
  );
};

export default ProSearch;
