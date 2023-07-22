import React, {useContext} from "react";
import {Context} from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Restaurant from './pages/Restaurant.jsx';
import { Register } from './pages/register.jsx';
// import { DeleteRest } from "./pages/deleteRest.jsx";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SearchBar } from "./component/searchBar";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import { RestaurantRequest } from "./pages/restaurantsRequests";
import { AddDishes } from "./pages/addDishes.jsx";
import RegisterAdmin from './pages/RegisterAdmin.jsx';
import RequiereAuth from './component/RequireAuth.jsx';
// notifications
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ControlPanel } from "./pages/controlPanel.jsx";
import { EditMenu } from "./pages/editMenu.jsx";
import AccessDeniedPage from "./pages/AccessDeniedPage.jsx"



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    console.log(basename)
    const {store} = useContext(Context)
    console.log(store.user?.role);
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                
                        <Route element={<Home />} path="/" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<RequiereAuth child={<EditProfile />} />} path="/restaurant/:restaurantId/edit" />
                        <Route element={<Restaurant />} path="/restaurant/:restaurantId" />
                        <Route element={<RequiereAuth child={<AddDishes />} />} path="/restaurant/menu/food" />
                        <Route element={<RequiereAuth child={<RestaurantRequest />} />} path="/requests" />
                        <Route element={<RequiereAuth child={<ControlPanel />} />} path="/admin/restaurant" />
                        <Route element={<RequiereAuth child={<EditMenu />} />} path="/restaurant/menu" />
                        <Route element={<RequiereAuth child={<RegisterAdmin/>} />} path='/register-admin/:token' />
                        <Route element={<AccessDeniedPage />} path="/access_denied" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={3000}
                        limit={1}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
