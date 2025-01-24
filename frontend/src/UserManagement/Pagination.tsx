import React from "react";
import { PaginationProps } from "./interface";

const Pagination: React.FC<PaginationProps> = ({
  page,
  pages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < pages) onPageChange(page + 1);
  };

  const handlePageClick = (pageNum: number) => {
    if (pageNum !== page) onPageChange(pageNum);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {/* Previous Button */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight ${
              page === 1
                ? "text-gray-400 font-inter font-light"
                : "text-gray-500 font-inter font-light hover:text-gray-700"
            } bg-white border border-gray-300 rounded-s-lg`}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
          <li key={pageNum}>
            <button
              onClick={() => handlePageClick(pageNum)}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                pageNum === page
                  ? "text-blue-600 border-blue-300 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              } border border-gray-300`}
            >
              {pageNum}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={handleNext}
            disabled={page === pages}
            className={`flex items-center justify-center px-4 h-10 leading-tight ${
              page === pages
                ? "text-gray-400 font-inter font-light"
                : "text-gray-500 font-inter font-light hover:text-gray-700"
            } bg-white border border-gray-300 rounded-e-lg`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
