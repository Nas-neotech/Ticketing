import React, { useMemo, useState } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ResultCompo from "./ResultCompo";
import background from "../assets/images/NasBg.png";
import logo from "../assets/images/logo.png";
import NasLoader from "../assets/images/NasLoader.gif";
import { t } from "i18next";
import useLang from "../contexts/useLanguage/useLang";

const SearchCompo = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { lang } = useLang();

  const fields = useMemo(
    () => [
      { id: "name", placeholder: t("name"), icon: UserOutlined },
      {
        id: "phone",
        placeholder: t("phone number"),
        icon: PhoneOutlined,
        onlyNumbers: true,
      },
      {
        id: "mobile",
        placeholder: t("mobile number"),
        icon: MobileOutlined,
        onlyNumbers: true,
      },
      {
        id: "port",
        placeholder: t("port serial number"),
        icon: ClusterOutlined,
        onlyNumbers: true,
      },
    ],
    [t]
  );

  const [formData, setFormData] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {})
  );

  const handleInputChange = (id, value, onlyNumbers) => {
    const cleanedValue = onlyNumbers ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [id]: cleanedValue }));
  };

  const handleSearch = () => {
    setHasSearched(true);

    if (!Object.values(formData).some((val) => val)) {
      setResults([]);
      return;
    }

    setLoading(true);
    setResults([]);

    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "Rani 1",
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
          mobile: "9877543210",
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

      setResults(filteredData);
      setLoading(false);
    }, 1200);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center p-5"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col w-full h-full justify-center items-center gap-10">
        {/* Search Area */}
        <div className="w-[40%] flex items-center">
          <div className="w-full flex items-center justify-center">
            {loading ? (
              <img src={NasLoader} alt="Loading..." className="w-[50%]" />
            ) : (
              <div className="w-full flex">
                <img src={logo} alt="Logo" className="w-[40%]" />

                <div className="w-[60%] flex flex-col gap-3 bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-4">
                  {fields.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center gap-4 bg-white border border-gray-400 rounded-xl p-3 focus-within:border-purple-900"
                    >
                      <f.icon className="text-purple-900 text-xl" />
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={formData[f.id]}
                        onChange={(e) =>
                          handleInputChange(f.id, e.target.value, f.onlyNumbers)
                        }
                        className="flex-1 outline-none font-semibold text-gray-800 placeholder-gray-400 bg-transparent"
                        inputMode={f.onlyNumbers ? "numeric" : "text"}
                      />
                    </div>
                  ))}

                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className={`w-full flex bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-900 shadow-lg p-2 items-center justify-center gap-2 text-white font-semibold rounded-xl
                      ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    <SearchOutlined style={{ fontSize: "24px" }} />
                    {t("search")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="w-full h-fit p-10 overflow-y-auto scrollbar-none flex justify-center">
            <ResultCompo data={results} />
          </div>
        )}

        {/* No Results */}
        {!loading && hasSearched && results.length === 0 && (
          <div className="text-white text-xl font-semibold bg-black/40 px-8 py-4 rounded-xl">
            {t("no user found")}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCompo;
