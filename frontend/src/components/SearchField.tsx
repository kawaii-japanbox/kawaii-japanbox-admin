import { Dispatch, SetStateAction } from "react";

interface SearchFieldProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setPage: Dispatch<SetStateAction<number>>;
}

const SearchField: React.FC<SearchFieldProps> = ({
  searchQuery,
  setSearchQuery,
  setPage,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-1/3"
      />
      <button
        onClick={() => setPage(1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchField;
