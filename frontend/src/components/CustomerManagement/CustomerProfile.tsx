import { useParams } from "react-router-dom";
import { Heart, Star, Truck, Undo2 } from "lucide-react";
import Layout from "../../Layout";
import Pagination from "../../Pagination";
import { formatDate } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { getCustomerDetails, getCustomerOrders } from "../../api/api";
import {
  IGetCustomerDetailsResponse,
  IGetCustomerOrdersResponse,
} from "./data";
import Spinner from "../../Spinner";
import React from "react";

const CustomerProfile: React.FC = () => {
  const [customerDetails, setCustomerDetails] =
    useState<IGetCustomerDetailsResponse | null>(null);
  const [customerOrders, setCustomerOrders] = useState<
    IGetCustomerOrdersResponse[] | null
  >(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { id } = useParams();

  const fetchCustomerDetails = async () => {
    const customerInfo = await getCustomerDetails(id!);
    setCustomerDetails(customerInfo);
  };

  const fetchCustomerOrders = async () => {
    const response = await getCustomerOrders(id!, currentPage);
    setCustomerOrders(response.orders.orders);
    setPages(response.pages);
  };

  useEffect(() => {
    fetchCustomerDetails();
    fetchCustomerOrders();
  }, [currentPage]);

  return (
    <Layout>
      <div className="p-6 bg-gray-50 w-full">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-2 p-6">
          <h1 className=" text-2xl font-medium font-inter">General Overview</h1>
        </div>
        {/* Boxes Section */}
        <div className="flex flex-wrap gap-6 p-6">
          <div className=" text-gray-400 rounded-lg p-6 flex-1  shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Truck />
                <p className="text-medium mt-2">Orders made</p>
                <p className="text-black text-2xl font-bold mb-2">123</p>
                <p className="text-sm">7% vs last month</p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 rounded-lg p-6 flex-1 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Star />
                <h2 className="text-medium mt-2">Reviews added</h2>
                <p className="text-black text-2xl font-bold mb-2">26</p>
                <p className="text-sm">8.8% vs last month</p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 rounded-lg p-6 flex-1 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Heart />
                <h2 className="text-medium mt-2">Favorite products</h2>
                <p className="text-black text-2xl font-bold mb-2">9</p>
                <p className="text-sm">2.5% vs last month</p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 rounded-lg p-6 flex-1 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Undo2 />
                <h2 className="text-medium mt-2">Product returns</h2>
                <p className="text-black text-2xl font-bold mb-2">4</p>
                <p className="text-sm">5.6% vs last month</p>
              </div>
            </div>
          </div>
        </div>
        {/* Customer Details Section*/}
        <div className="flex flex-wrap gap-6 p-6">
          <div className="text-black rounded-lg p-6 flex-1 shadow-md">
            <h1 className=" text-lg font-medium font-inter mb-3">
              Customer Details
            </h1>
            {customerDetails ? (
              <>
                <div className="flex flex-row justify-between mb-2">
                  <p className="font-medium">Name</p>
                  <p className="text-gray-400">{customerDetails.name}</p>
                </div>
                <hr className="border-t border-gray-200 my-4" />
                <div className="flex flex-row justify-between mb-2">
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400">{customerDetails.email}</p>
                </div>
                <hr className="border-t border-gray-200 my-4" />
                <div className="flex flex-row justify-between mb-2">
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-400">{customerDetails.phone}</p>
                </div>
                <hr className="border-t border-gray-200 my-4" />
                <div className="flex flex-row justify-between mb-2">
                  <p className="font-medium">Address</p>
                  <p className="text-gray-400">
                    {customerDetails.addresses
                      .map(
                        (address) =>
                          `${address.country}, ${address.region}, ${address.street} ${address.postcode}`
                      )
                      .join("\n")}
                  </p>
                </div>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        {/* User Table */}
        <div className="flex flex-wrap gap-6 p-6">
          <table className="min-w-full border-collapse border border-white-100">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-center text-sm font-medium text-gray-700"></th>
                <th className="py-3 px-6 text-left font-inter text-sm font-light text-[#6B7280]">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                  STATUS
                </th>
                <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                  DELIVERY STATUS
                </th>
                <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                  CREATED
                </th>
              </tr>
            </thead>
            <tbody>
              {customerOrders && customerOrders.length > 0 ? (
                customerOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    {/* Parent Row */}
                    <tr
                      className="hover:bg-gray-50 border-t cursor-pointer"
                      onClick={() => toggleRow(order.id)}
                    >
                      <td className="py-4 px-6 text-center text-sm font-medium text-gray-700">
                        {expandedRows[order.id] ? "▼" : "▶"}
                      </td>
                      <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                        {order.id}
                      </td>
                      <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                        {order.status}
                      </td>
                      <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                        {order.deliveryStatus}
                      </td>
                      <td className="py-4 px-6 text-sm font-inter font-light text-gray-800">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>

                    {/* Nested Table */}
                    {expandedRows[order.id] && order.items?.length > 0 && (
                      <tr key={`orders-${order.id}`} className="bg-gray-50">
                        <td colSpan={7} className="p-4">
                          <table className="w-full border border-gray-300">
                            <thead className="bg-gray-100 px-6 font-inter font-light text-sm text-gray-800">
                              <tr>
                                <th className="py-2 px-3 text-left">
                                  Product name
                                </th>
                                <th className="py-2 px-3 text-left">
                                  Quantity
                                </th>
                                <th className="py-2 px-3 text-left">Price</th>
                                <th className="py-2 px-3 text-left">
                                  Currency
                                </th>
                                <th className="py-2 px-3 text-left">
                                  Delivery cost
                                </th>
                                <th className="py-2 px-3 text-left">Status</th>
                                <th className="py-2 px-3 text-left">Created</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item) => (
                                <tr
                                  key={item.id}
                                  className="border-t px-6 font-inter font-light text-sm text-gray-800"
                                >
                                  <td className="py-2 px-3">
                                    {item.product.name}
                                  </td>
                                  <td className="py-2 px-3">{item.quantity}</td>
                                  <td className="py-2 px-3">{item.price}</td>
                                  <td className="py-2 px-3">{item.currency}</td>
                                  <td className="py-2 px-3">
                                    {item.deliveryCost}
                                  </td>
                                  <td className="py-2 px-3">{item.status}</td>
                                  <td className="py-2 px-3">
                                    {formatDate(item.createdAt)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <Pagination
            page={currentPage}
            pages={pages}
            onPageChange={() => handlePageChange(currentPage)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
