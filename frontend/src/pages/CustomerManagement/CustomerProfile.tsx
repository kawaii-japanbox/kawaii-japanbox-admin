import {
  getCustomerDetails,
  getCustomerOrderAnalytics,
  getCustomerOrders,
} from "../../api/api";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import { formatDate } from "../../utils/helpers";
import {
  IGetCustomerDetailsResponse,
  IGetCustomerOrdersResponse,
  IGetOrderAnalytics,
} from "./interface";
import { Heart, Star, Truck, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/customers.css";
import CustomerDetails from "./CustomerDetails";
import CustomerOrderAnalytics from "./CustomerOrderAnalytics";
import CustomerOrdersTable from "./CustomerOrdersTable";

const CustomerProfile: React.FC = () => {
  const [customerDetails, setCustomerDetails] =
    useState<IGetCustomerDetailsResponse | null>(null);
  const [customerOrders, setCustomerOrders] = useState<
    IGetCustomerOrdersResponse[] | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [analytics, setAnalytics] = useState<IGetOrderAnalytics | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { id } = useParams();

  const fetchCustomerDetails = async () => {
    const customerInfo = await getCustomerDetails(id!);
    setCustomerDetails(customerInfo);
  };

  const fetchCustomerOrderAnalytics = async () => {
    const orderAnalytics = await getCustomerOrderAnalytics(id!);
    setAnalytics(orderAnalytics);
  };

  const fetchCustomerOrders = async () => {
    const response = await getCustomerOrders(id!, currentPage);
    setCustomerOrders(response.orders.orders);
    setPages(response.pages);
  };

  useEffect(() => {
    fetchCustomerDetails();
    fetchCustomerOrders();
    fetchCustomerOrderAnalytics();
  }, [currentPage]);

  return (
    <Layout>
      <div className="container-wrapper">
        <div className="flex justify-between items-start mb-2 p-6">
          <h1 className="text-2xl font-medium font-inter">General Overview</h1>
        </div>
        <CustomerOrderAnalytics analytics={analytics} />
        <CustomerDetails customerDetails={customerDetails} />
        <CustomerOrdersTable customerOrders={customerOrders} />
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
