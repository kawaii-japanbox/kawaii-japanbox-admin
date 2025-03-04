import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import { CustomersTableProps } from "./interface";
import Spinner from "../../components/Spinner";

const MobileCustomerTable: React.FC<CustomersTableProps> = ({
  customers,
  loading,
}) => {
  return (
    <div className="mobile-card">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : customers?.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No customers found.
        </div>
      ) : (
        customers?.map((customer) => (
          <div key={customer.id} className="mobile-card-item">
            <table className="mobile-table">
              <tbody>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">Name</td>
                  <td className="mobile-table-data">
                    <Link
                      to={`/customers/${customer.id}`}
                      state={{ id: customer.id }}
                      className="text-blue-600"
                    >
                      {customer.name}
                    </Link>
                  </td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">Email</td>
                  <td className="mobile-table-data">{customer.email}</td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">Phone</td>
                  <td className="mobile-table-data">{customer.phone}</td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">Source</td>
                  <td className="mobile-table-data">{customer.source}</td>
                </tr>
                <tr>
                  <td className="mobile-table-header">Created</td>
                  <td className="mobile-table-data">
                    {formatDate(customer.createdAt)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default MobileCustomerTable;
