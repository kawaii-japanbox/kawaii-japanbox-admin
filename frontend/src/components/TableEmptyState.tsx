import React from "react";

interface TableEmptyStateProps {
  message: string;
  colSpan: number;
}

const TableEmptyState: React.FC<TableEmptyStateProps> = ({
  message,
  colSpan,
}) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-10 text-gray-500">
        {message}
      </td>
    </tr>
  );
};

export default TableEmptyState;
