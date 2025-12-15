import React, { useMemo } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
import useLang from "../contexts/useLanguage/useLang";  

const ResultCompo = ({ data }) => {
  const { lang } = useLang();
  
  if (data.length === 0) {
    alert("No results found");
  }

  return (
    <div className="w-full flex flex-wrap justify-center gap-6  ">
      {data.map((user) => {
        const info = [
          { id: "phone", icon: PhoneOutlined, value: user.phone },
          { id: "mobile", icon: MobileOutlined, value: user.mobile },
          { id: "port", icon: ClusterOutlined, value: user.port },
        ];
        return (
          <div
            key={user.id}
            className="w-[15%] bg-gradient-to-br from-white to-blue-50
           shadow-lg shadow-black transition-shadow duration-300
            rounded-2xl p-4 gap-3 flex flex-col items-center border border-gray-100"
          >
            <div className="flex w-full items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center
                  bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-900"
              >
                <UserOutlined className="text-white text-2xl " />
              </div>
              <div className="text-lg font-semibold text-gray-800 ">
                {user.name || "Unknown"}
              </div>
            </div>

            <div className="flex flex-col w-full items-center gap-1 text-center">
              {info.map((i, index) => {
                return (
                  <div
                    key={i.id}
                    className="text-gray-600 w-full font-bold flex items-center"
                  >
                    <div className="w-[15%]">
                      <i.icon
                        className="text-lg "
                        style={{ transform: "rotateY(180deg)" }}
                      />
                    </div>
                    <div className="w-[85%]">{i.value || "-"}</div>
                  </div>
                );
              })}
            </div>

            <button
              className="w-full flex bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-900 shadow-lg
                     p-2 items-center justify-center gap-2 text-white font-semibold
                     rounded-xl"
            >
              {t('account info')}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ResultCompo;
