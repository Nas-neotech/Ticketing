import React, { useMemo } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MobileOutlined,
  ClusterOutlined,
} from "@ant-design/icons";

const ResultCompo = ({ data }) => {
  if (data.length === 0) {
    alert("No results found");
  }

  return (
    <div className="w-[75%] flex flex-wrap justify-center gap-6">
      {data.map((user) => {
        const info = useMemo(
          () => [
            {
              id: "phone",
              icon: PhoneOutlined,
              value: user.phone,
            },
            {
              id: "mobile",
              icon: MobileOutlined,
              value: user.mobile,
            },
            {
              id: "port",
              icon: ClusterOutlined,
              value: user.port,
            },
          ],
          [user]
        );
        return (
          <div
            key={user.id}
            className="w-[20%] bg-gradient-to-br from-white to-blue-50
           shadow-2xl shadow-black transition-shadow duration-300
            rounded-2xl p-4 gap-3 flex flex-col items-center border border-gray-100"
          >
            <div className="flex w-full items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center
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
              View Profile
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ResultCompo;
