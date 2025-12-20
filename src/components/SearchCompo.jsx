import React, { useMemo, useState } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ResultCompo from "./ResultCompo";
import background from "../assets/NasBg.png";
import logo from "../assets/logo.png";
import NasLoader from "../assets/NasLoader.gif";
import { t } from "i18next";

const SearchCompo = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fields = useMemo(
    () => [
      { id: "username", placeholder: t("username"), icon: UserOutlined },
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

  const handleSearch = async () => {
    try {
      setLoading(true);
      setHasSearched(true);

      const query = {};
      if (formData.username) query.username_adsl = formData.username;
      if (formData.phone) query.phone = formData.phone;
      if (formData.mobile) query.mobile = formData.mobile;

      if (Object.keys(query).length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams({
        op: "ui_get_acct_info_username_or_code_or_phone",
        ...query,
      }).toString();

      const url = `/freeside/api/userinfo_op.cgi?${queryParams}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");

      const errCode = xml.querySelector("errCode")?.textContent;
      if (errCode !== "OK") {
        setResults([]);
        return;
      }

      const valuesNode = xml.querySelector("values");
      if (!valuesNode) {
        setResults([]);
        return;
      }

      const result = {};
      Array.from(valuesNode.children).forEach((node) => {
        result[node.tagName] = node.textContent;
      });

      const decodeHtml = (str = "") => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;
      };

      const encodedFields = [
        "arabic_name",
        "arabic_first",
        "arabic_last",
        "arabic_pbx",
        "address",
        "father_name",
        "mother_name",
      ];

      encodedFields.forEach((key) => {
        if (result[key]) {
          result[key] = decodeHtml(result[key]);
        }
      });

      setResults([result]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
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

                <div className="w-[60%] flex flex-col gap-3 justify-center bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-4">
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
          <div className="text-[rgb(255,0,0)] text-xl font-semibold bg-white border border-[rgb(255,0,0)] p-3 w-[30%] text-center rounded-xl">
            {t("no user found")}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCompo;
