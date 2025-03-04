import { Link } from "react-router-dom";
import { CustomersTableProps } from "./interface";
import { formatDate } from "../../utils/helpers";
import Spinner from "../../components/Spinner";
import TableEmptyState from "../../components/TableEmptyState";

export const desktopCustomTableFields = [
  "NAME",
  "EMAIL",
  "PHONE",
  "SOURCE",
  "CREATED",
];

const DesktopCustomerTable: React.FC<CustomersTableProps> = ({
  customers,
  loading,
}) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            {desktopCustomTableFields.map((header: string) => (
              <th key={header} className="table-header-cell">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="spinner-container">
                <div className="spinner-wrapper">
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : customers?.length === 0 ? (
            <TableEmptyState message={"No customers found"} colSpan={5} />
          ) : (
            customers?.map((customer) => (
              <tr key={customer.id} className="table-row">
                <td className="table-cell">
                  <Link
                    to={`/customers/${customer.id}`}
                    state={{ id: customer.id }}
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="table-cell">{customer.email}</td>
                <td className="table-cell">{customer.phone}</td>
                <td className="table-cell">{customer.source}</td>
                <td className="table-cell">{formatDate(customer.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopCustomerTable;
