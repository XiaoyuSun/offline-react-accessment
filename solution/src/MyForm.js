import React, { useState, useEffect } from "react";
import { getLocations, isNameValid } from "./mock-api/apis";
import UserLocationTable from "./UserLocationTable";

export default function MyForm() {
  const [name, setName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getLocations().then((locations) => {
      setLocations(locations);
    });
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = await isNameValid(name);

    if (valid) {
      setList([...list, { name, location: selectedLocation }]);
      setError("");
    } else {
      setError("Name is already taken");
    }
  };

  const handleClearForm = (e) => {
    e.preventDefault();

    setName("");
    setSelectedLocation("");
    setError("");
  };

  const onNameChange = async (name) => {
    try {
      setName(name);

      const valid = await isNameValid(name);

      if (valid) {
        setError("");
      } else {
        setError("name is already taken");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-1/2">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-10 w-full p-2"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John Doe"
            required
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Location:
          </label>
          <select
            className="block w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
          <button
            type="reset"
            onClick={handleClearForm}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Clear
          </button>
        </div>
      </form>

      <UserLocationTable data={list} />
    </section>
  );
}
