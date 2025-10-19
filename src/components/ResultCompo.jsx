import React from "react";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";

const ResultCompo = ({ data }) => {
  // if (!data || data.length === 0)
  //   return (
  //     <div className="flex justify-center text-[rgb(255,0,0)] p-10 font-bold text-xl">
  //       No results found.
  //     </div>
  //   );

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

  return (
    <div className="max-w-6xl mx-auto mt-6 flex flex-wrap justify-center gap-6">
      {mockData.map((user) => (
        <div
          key={user.id}
          className="w-full sm:w-60 bg-gradient-to-br from-white to-blue-50 shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-2xl p-6 flex flex-col items-center space-y-4 border border-gray-100"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-indigo-700 flex items-center justify-center text-white shadow-md text-lg font-bold">
            <UserOutlined className="text-white text-4xl " />
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-lg font-bold ">{user.name || "Unknown"}</div>
            <div className="text-gray-600 gap-3 font-bold flex items-center">
              <PhoneOutlined
                className="text-lg "
                style={{ transform: "rotateY(180deg)" }}
              />
              {user.phone || "No phone"}
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-br from-blue-700 to-indigo-700  text-white p-2 font-bold text-lg
          rounded-2xl shadow-lg hover:shadow-indigo-800 transition-all duration-300"
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResultCompo;



