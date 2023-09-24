import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log("err", error);
    }
  }

  // loading font styles before the page gets load
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // This is used to not open login and register page if the user is already logged in -> so getting users data just when any page is laoded.
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {/* The below is only shown when user is logged in */}
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={Profile}
            />
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={UpdateProfile}
            />
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={UpdatePassword}
            />
          }
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={Shipping}
            />
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={ConfirmOrder}
            />
          }
        />
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  component={Payment}
                />
              </Elements>
            }
          />
        )}
        <Route
          exact
          path="/success"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={OrderSuccess}
            />
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={MyOrders}
            />
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              component={OrderDetails}
            />
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={Dashboard}
            />
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={ProductList}
            />
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={NewProduct}
            />
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={UpdateProduct}
            />
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={OrderList}
            />
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={ProcessOrder}
            />
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={UsersList}
            />
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute
              isAdmin={true}
              isAuthenticated={isAuthenticated}
              component={UpdateUser}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
