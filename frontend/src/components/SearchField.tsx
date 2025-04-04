import { Dispatch, SetStateAction } from "react";

interface SearchFieldProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;;
  setPage: Dispatch<SetStateAction<number>>;
  onSearch: () => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Search orders by id or name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-1/3"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchField;
