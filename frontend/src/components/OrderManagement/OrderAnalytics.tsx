import { useState, ChangeEvent, useEffect } from "react";
import { orderTimePeriods } from "./data";
import { getOrdersAnalytics } from "../../api/api";
import { IGetOrdersAnalytics } from "./interface";
import Spinner from "../../Spinner";
const OrderAnalytics = () => {
  const [timeframe, setTimeframe] = useState("this_month");
  const [analytics, setAnalytics] = useState<IGetOrdersAnalytics | null>(null);

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTimeframe(event.target.value);
  };

  const fetchOrdersAnalytics = async () => {
    const ordersAnaltyics = await getOrdersAnalytics(timeframe);
    setAnalytics(ordersAnaltyics);
  };

  useEffect(() => {
    fetchOrdersAnalytics();
  }, [timeframe]);

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-lg font-medium font-inter">Recent Activity</h1>
        <select
          value={timeframe}
          onChange={handleDropdownChange}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          {orderTimePeriods.map((timePeriod) => (
            <option value={timePeriod.value}>{timePeriod.name}</option>
          ))}
        </select>
      </div>
      {analytics ? (
        <div className="flex flex-wrap gap-6 p-6">
          <div className="bg-[#ff7344] text-white rounded-lg p-6 flex-1 text-center shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <h2 className="text-sm font-medium">Total Orders</h2>
                <p className="text-2xl font-bold mt-2">
                  {analytics.totalOrders}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
          </div>
          <div className="bg-[#6146d6] text-white rounded-lg p-6 flex-1 text-center shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <h2 className="text-sm font-medium">Total Products</h2>
                <p className="text-2xl font-bold mt-2">
                  {analytics.totalProducts}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="bg-[#0bdc9e] text-white rounded-lg p-6 flex-1 text-center shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <h2 className="text-sm font-medium">Total Delivery</h2>
                <p className="text-2xl font-bold mt-2">
                  {analytics.totalDelivery}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="bg-[#147bff] text-white rounded-lg p-6 flex-1 text-center shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <h2 className="text-sm font-medium">Total Customer</h2>
                <p className="text-2xl font-bold mt-2">
                  {analytics.totalCustomers}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default OrderAnalytics;
