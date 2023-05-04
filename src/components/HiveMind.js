import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Footer } from "./nav/Footer";

export const HiveMind = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar />
                    <ApplicationViews />
                    <Footer />
                </>
            </Authorized>
        }/>
    </Routes>
}