// if (import.meta.env.MODE === 'production') {
//   const noop = () => {};
//   console.log = noop;
//   console.warn = noop;
//   console.error = noop;
//   console.info = noop;
//   console.debug = noop;
//   console.table = noop;
//   console.trace = noop;
// }

import Mainpage from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "aos/dist/aos.css";
import "../public/scss/main.scss";
import { useEffect } from "react";
import BannerSearchV1 from "./pages/listings/(grid-view)/banner-search-v1";
import BannerSearchV2 from "./pages/listings/(grid-view)/banner-search-v2";
import GridDefault from "./pages/listings/(grid-view)/grid-default";
import GridFull1ColV1 from "./pages/listings/(grid-view)/grid-full-1-col-v1";
import GridFull1ColV2 from "./pages/listings/(grid-view)/grid-full-1-col-v2";
import GridFull2Col from "./pages/listings/(grid-view)/grid-full-2-col";
import GridFull3Col from "./pages/listings/(grid-view)/grid-full-3-col";
import GridFull4Col from "./pages/listings/(grid-view)/grid-full-4-col";

import ListV1All from "./pages/listings/(list-view)/list-all-style";
import HeaderMapStyle from "./pages/listings/(map-style)/header-map-style";
import MapV1 from "./pages/listings/(map-style)/map-v1";
import MapV2 from "./pages/listings/(map-style)/map-v2";
import MapV3 from "./pages/listings/(map-style)/map-v3";
import MapV4 from "./pages/listings/(map-style)/map-v4";
import DashboardHome from "./pages/property/(dashboard)/dashboard-home";
import DashboardAddProperty from "./pages/property/(dashboard)/dashboard-add-property";
import DashboardMessage from "./pages/property/(dashboard)/dashboard-message";
import DashboardMyFavourites from "./pages/property/(dashboard)/dashboard-my-favourites";
import DashboardMyPackage from "./pages/property/(dashboard)/dashboard-my-package";
import DashboardMyProfile from "./pages/property/(dashboard)/dashboard-my-profile";
import DashboardMyProperties from "./pages/property/(dashboard)/dashboard-my-properties";
import DashboardReviews from "./pages/property/(dashboard)/dashboard-reviews";
import DashboardSavedSearch from "./pages/property/(dashboard)/dashboard-saved-search";
import Agents from "./pages/property/(agents)/agents";
import Agency from "./pages/property/(agents)/agency";
import BlogV1 from "./pages/blogs/blog-list-v1";
import BlogV2 from "./pages/blogs/blog-list-v2";
import BlogV3 from "./pages/blogs/blog-list-v3";
import About from "./pages/pages/about";
import Compare from "./pages/pages/compare";
import Contact from "./pages/pages/contact";
import Faq from "./pages/pages/faq";
import Invoice from "./pages/pages/invoice";
import Login from "./pages/pages/login";
import PricingPlan from "./pages/pages/pricing";
import Register from "./pages/register";
import NotFound from "./pages/not-found";
import BlogSingle from "./pages/blogs/blogs";

import SingleV1 from "./pages/property/(single-style)/single-v1";

import AgentSingle from "./pages/property/(agents)/agent-single";
import AgencySingle from "./pages/property/(agents)/agency-single";
import ListV1 from "./pages/listings/(list-view)/list-v1";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour"
import PrivateRoute from "./utilis/privateRoute";
import ErrorBoundary from "./utilis/ErrorBoundary";
import VerfyEmailPage from "./pages/email-verifcation/verifyEmailIndex";
import ResetPassword from "./components/reset-password/resetPassword";
import ForgotPassword from "./components/reset-password/forgotPassword";
import DashboardSponsoring from "./pages/property/(dashboard)/dashboard-sponsoring";
import 'aos/dist/aos.css';

import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/loading/loading";

if (typeof window !== "undefined") {
  import("bootstrap");
}

function App() {

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    return () => {
      Aos.refresh(); // Proper cleanup to avoid memory leaks
    };
  }, []);

  const isLoading = useSelector((state) => state.auth.loading);


  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="wrapper ovh">

        <BrowserRouter>

          <ScrollTopBehaviour />
          <ErrorBoundary>
            <Routes path="/">

              <Route index element={<Mainpage />} />

              <Route path="grid-default" element={<GridDefault />} />
              <Route path="grid-full-3-col" element={<GridFull3Col />} />
              <Route path="grid-full-4-col" element={<GridFull4Col />} />
              <Route path="grid-full-2-col" element={<GridFull2Col />} />
              <Route path="grid-full-1-col-v1" element={<GridFull1ColV1 />} />
              <Route path="grid-full-1-col-v2" element={<GridFull1ColV2 />} />
              <Route path="banner-search-v1" element={<BannerSearchV1 />} />
              <Route path="banner-search-v2" element={<BannerSearchV2 />} />
              <Route path="list-all-style" element={<ListV1All />} />
              <Route path="list-v1" element={<ListV1 />} />

              <Route path="header-map-style" element={<HeaderMapStyle />} />
              <Route path="map-v1" element={<MapV1 />} />
              <Route path="map-v2" element={<MapV2 />} />
              <Route path="map-v3" element={<MapV3 />} />
              <Route path="map-v4" element={<MapV4 />} />

              {/* Dshboard routes */}
              <Route path="dashboard-home" element={<PrivateRoute element={<DashboardHome />} />} />
              {/* <Route path="dashboard-message" element={<PrivateRoute element={<DashboardMessage />} />} /> */}

              <Route path="dashboard-add-property" element={<PrivateRoute element={<DashboardAddProperty />} />} />

              <Route path="dashboard-my-properties" element={<PrivateRoute element={<DashboardMyProperties />} />} />
              <Route path="dashboard-my-favourites" element={<PrivateRoute element={<DashboardMyFavourites />} />} />
              <Route path="dashboard-sponsoring" element={<PrivateRoute element={<DashboardSponsoring />} />} />
              {/* <Route path="dashboard-saved-search" element={<PrivateRoute element={<DashboardSavedSearch />} />} /> */}
              {/* <Route path="dashboard-reviews" element={<PrivateRoute element={<DashboardReviews />} />} /> */}
              {/* <Route path="dashboard-my-package" element={<PrivateRoute element={<DashboardMyPackage />} />} /> */}
              <Route path="dashboard-my-profile" element={<PrivateRoute element={<DashboardMyProfile />} />} />


              <Route path="agents" element={<Agents />} />
              <Route path="agency" element={<Agency />} />
              <Route path="agency-single/:id" element={<AgencySingle />} />
              <Route path="agent-single/:id" element={<AgentSingle />} />

              {/* <Route path="blog-list-v1" element={<BlogV1 />} />
              <Route path="blog-list-v2" element={<BlogV2 />} />
              <Route path="blog-list-v3" element={<BlogV3 />} />
              <Route path="blogs/:id" element={<BlogSingle />} /> */}

              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              {/* <Route path="compare" element={<Compare />} /> */}
              <Route path="pricing" element={<PricingPlan />} />
              <Route path="faq" element={<Faq />} />


              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="verify-email-code" element={<VerfyEmailPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:resetToken" element={<ResetPassword />} />


              <Route path="not-found" element={<NotFound />} />
              <Route path="invoice" element={<Invoice />} />

              <Route path="single-v1/:_id" element={<SingleV1 />} />


              <Route path="*" element={<NotFound />} />



            </Routes>
          </ErrorBoundary>
        </BrowserRouter>

        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
