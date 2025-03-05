import Spinner from "../../components/Spinner";
import { CustomerDetailsProps } from "./interface";

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customerDetails,
}) => {
  return (
    <div className="flex flex-wrap gap-6 p-6">
      <div className="customer-details-card">
        <h1 className="customer-details-title">Customer Details</h1>
        {customerDetails ? (
          <>
            {[
              { label: "Name", value: customerDetails.name },
              { label: "Email", value: customerDetails.email },
              { label: "Phone", value: customerDetails.phone },
              {
                label: "Address",
                value: customerDetails.addresses
                  .map(
                    (address) =>
                      `${address.country}, ${address.region}, ${address.street} ${address.postcode}`
                  )
                  .join("\n"),
              },
            ].map(({ label, value }, index) => (
              <div key={index}>
                <div className="details-row flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-2">
                  <p className="details-label">{label}</p>
                  <p className="details-value">{value}</p>
                </div>
                {index < 3 && <hr className="details-divider" />}
              </div>
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
