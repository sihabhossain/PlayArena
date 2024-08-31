import React, { useState } from "react";

const SearchAndFilters: React.FC<{
  onSearch: (query: string) => void;
  onFilter: (priceRange: number[]) => void;
}> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("100");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilter = () => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || 0;
    if (min <= max) {
      onFilter([min, max]);
    }
  };

  // Validate if filter button should be disabled
  const isFilterDisabled =
    !minPrice ||
    !maxPrice ||
    Number(minPrice) < 0 ||
    Number(maxPrice) < 0 ||
    Number(minPrice) > Number(maxPrice);

  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-gray-20 p-4 shadow-md md:flex-row">
      <input
        type="text"
        placeholder="Search by facility name or location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-md border border-gray-100 p-2 text-gray-500 md:w-1/3"
      />
      <div className="mt-4 flex items-center md:mt-0">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="mr-2 rounded-md border border-gray-100 p-2 text-gray-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="mr-2 rounded-md border border-gray-100 p-2 text-gray-500"
        />
        <button
          onClick={handleFilter}
          className="rounded-md bg-primary-500 p-2 text-white"
          disabled={isFilterDisabled}
        >
          Filter
        </button>
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 rounded-md bg-primary-500 p-2 text-white md:mt-0"
      >
        Search
      </button>
    </div>
  );
};

export default SearchAndFilters;
