import React from "react";

const Table = ({ data }) => {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="px-4 py-2 border border-gray-300">Name</th>
          <th className="px-4 py-2 border border-gray-300">Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            className={`bg-white ${index % 2 === 0 ? "bg-gray-100" : ""}`}
            key={index}
          >
            <td className="px-4 py-2 border border-gray-300">{item.name}</td>
            <td className="px-4 py-2 border border-gray-300">
              {item.location}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
