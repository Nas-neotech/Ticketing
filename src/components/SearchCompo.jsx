import React, { useMemo, useState } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ResultCompo from "./ResultCompo";

const SearchCompo = ({ onSearchResults }) => {
  const [results, setResults] = useState([]);

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
        name: "Rani 2",
        phone: "1111111111",
        mobile: "1254567890",
        port: "1234",
      },
      {
        id: 2,
        name: "Rani 2",
        phone: "2222222222",
        mobile: "6422345678",
        port: "5678",
      },
      {
        id: 3,
        name: "Rani 3",
        phone: "3333333333",
        mobile: "7123456789",
        port: "1011",
      },
      {
        id: 4,
        name: "Rani 4",
        phone: "4444444444",
        mobile: "2112436789",
        port: "1213",
      },
      {
        id: 5,
        name: "Rani 5",
        phone: "5555555555",
        mobile: "6432345678",
        port: "1415",
      },
      {
        id: 6,
        name: "Rani 6",
        phone: "6666666666",
        mobile: "9876543210",
        port: "1617",
      },
      {
        id: 7,
        name: "Rani 7",
        phone: "7777777777",
        mobile: "98775473210",
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

    if (formData.name || formData.phone || formData.mobile || formData.port) {
      setResults(filteredData);
    } else {
      setResults([]);
    }
  };

  return (
    <div
      className="w-full h-full bg-[url(./src/assets/images/bg.png)] bg-cover
     flex items-center justify-center p-3"
    >
      <div
        className="flex flex-col w-full h-full justify-center items-center
      overflow-y-scroll scrollbar-none gap-10 "
      >
        <div
          className="w-[40%] backdrop-blur-md bg-white/30
       rounded-3xl shadow-2xl shadow-black p-4 flex items-center"
        >
          <img src="src/assets/images/Logo.gif" />

          <div className="w-full flex flex-col gap-3">
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

        {results.length > 0 && <ResultCompo data={results} />}
      </div>
    </div>
  );
};

export default SearchCompo;
