import React from "react"
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/usernavbar/userNavbar";

export default function UserWrapper() {
    return (
        <>
            <UserNavbar />
            <Outlet />
        </>
    )
}