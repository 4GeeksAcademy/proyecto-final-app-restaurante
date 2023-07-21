import React from "react";
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
// notifications
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ControlPanel } from "./pages/controlPanel.jsx";
import { EditMenu } from "./pages/editMenu.jsx";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    console.log(basename)
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<RequiredAuth child={<EditProfile />} />} path="/restaurant/:restaurantId/edit" /> {/* adds authorization requirements */}
                        <Route element={<Restaurant />} path="/restaurant/:restaurantId" />
                        <Route element={<AddDishes />} path="/restaurant/menu/food" />
                        <Route element={<RestaurantRequest />} path="/requests" />
                        <Route element={<ControlPanel />} path="/admin/restaurant" />
                        <Route element={<EditMenu />} path="/restaurant/menu" />
                        <Route element={<RegisterAdmin/>} path='/register-admin/:token' />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route path="*" element={<RequiredAuth child={<NoPageFound />} />} /> {/* adds authorization requirements */}
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

        // const RequiredAuth = ({ child }) => {
        //     // Logout if token.exp is in the past (expired)
        //     const payload = getTokenPayload();
        //     const navigate = useNavigate();
        //     if (payload && payload.exp && payload.exp <= Date.now() / 1000) {
        //     applyToken(null);
        //     navigate("/login");
        //     return null;
        //     }
        
        //     if (!getToken()) {
        //     return <Navigate to="/login" replace />;
        //     } else {
        //     return child;
        //     }
        // };
        // const applyToken = (token) => {
        //     if (token) {
        //     localStorage.setItem("access_token", token);
        //     axios.interceptors.request.use(
        //         (config) => {
        //         config.headers["Authorization"] = `Bearer ${token}`;
        //         return config;
        //         },
        //         (error) => {
        //         return Promise.reject(error);
        //         }
        //     );
        //     } else {
        //     localStorage.removeItem("access_token");
        //     delete axios.defaults.headers.common.Authorization;
        //     }
        // };
        
        // const getTokenPayload = () => {
        //     const token = getToken();
        //     if (!token) return null;
        
        //     return jwtDecode(token);
        // };
        
        // const getToken = () => {
        //     return localStorage.getItem("access_token");
        // };
    );
};

export default injectContext(Layout);
