import { Heart, Star, Truck, Undo2 } from "lucide-react";
import { CustomerOrderAnalyticsProps } from "./interface";
import Spinner from "../../components/Spinner";

const CustomerOrderAnalytics: React.FC<CustomerOrderAnalyticsProps> = ({
  analytics,
}) => {
  return (
    <div className="container-wrapper">
      {analytics ? (
        <div className="analytics-boxes">
          {[
            {
              icon: <Truck />,
              label: "Orders made",
              value: analytics.orderedProductsCount,
              percentage: analytics.ordersMadePercentage,
            },
            {
              icon: <Star />,
              label: "Orders in-progress",
              value: analytics.ordersInProgressCount,
              percentage: analytics.ordersInProgressPercentage,
            },
            {
              icon: <Heart />,
              label: "Favorite products",
              value: analytics.favoriteProductsCount,
              percentage: analytics.favoriteProductsPercentage,
            },
            {
              icon: <Undo2 />,
              label: "Ordered products",
              value: analytics.orderedProductsCount,
              percentage: analytics.orderedProductsPercentage,
            },
          ].map((item, index) => (
            <div key={index} className="dashboard-card">
              <div className="analytics-box-wrapper">
                <div className="analytics-card">
                  {item.icon}
                  <h2 className="card-title">{item.label}</h2>
                  <p className="card-value">{item.value}</p>
                  <p className="card-percentage">
                    <span
                      className={
                        isPositive(item.percentage)
                          ? "positive-growth"
                          : "negative-growth"
                      }
                    >
                      {isPositive(item.percentage) ? "↑" : "↓"}
                      {Math.abs(item.percentage)}%
                    </span>
                    <span className="card-text">vs last month</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CustomerOrderAnalytics;

const isPositive = (percentage: number) => {
  return percentage >= 0;
};
