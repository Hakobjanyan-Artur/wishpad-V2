import React from "react"
import { Outlet } from "react-router-dom";
import ProfileNavbar from "../components/profileNavbar/profileNavbar";

export default function ProfileWrapper() {
    return (
        <>
            <ProfileNavbar />
            <Outlet />
        </>
    )
}