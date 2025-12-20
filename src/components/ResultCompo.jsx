import React, { useState } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import { t } from "i18next";

const ResultCompo = ({ data }) => {
  const [activeUserId, setActiveUserId] = useState(null);

  if (data.length === 0) {
    return (
      <div className="text-red-600 font-bold text-lg">{t("no user found")}</div>
    );
  }

  return (
    <div className="w-full flex flex-wrap justify-center gap-6">
      {data.map((user, idx) => {
        const info = [
          { id: "phone", icon: PhoneOutlined, value: user.phone },
          {
            id: "mobile",
            icon: MobileOutlined,
            value: user.mobile || user.gsm,
          },
          {
            id: "port",
            icon: ClusterOutlined,
            value: user.adsl_port || user.port,
          },
        ];

        return (
          <div
            key={idx}
            className="w-[15%] bg-gradient-to-br from-white to-blue-50 shadow-lg shadow-black
                       rounded-2xl p-4 gap-3 flex flex-col items-center border border-gray-100"
          >
            <div className="flex w-full items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center
                           bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-900"
              >
                <UserOutlined className="text-white text-2xl" />
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {user.first && user.last
                  ? `${user.first} ${user.last}`
                  : user.username || "Unknown"}
              </div>
            </div>

            <div className="flex flex-col w-full items-center gap-1 text-center mt-3">
              {info.map((i) => (
                <div
                  key={i.id}
                  className="text-gray-600 w-full font-bold flex items-center"
                >
                  <div className="w-[15%]">
                    <i.icon className="text-lg" />
                  </div>
                  <div className="w-[85%]">{i.value || "-"}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveUserId(idx);
                setTimeout(() => setActiveUserId(null), 100);
              }}
              className={`w-full flex bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-900 
                          p-2 items-center justify-center gap-2 text-white font-semibold shadow-black
                          rounded-xl transition-shadow duration-100
                          ${
                            activeUserId === idx ? "shadow-inner" : "shadow-lg"
                          }`}
            >
              {t("account info")}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ResultCompo;
