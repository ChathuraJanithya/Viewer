import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function UserLayout() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("authToken");
  //get jwt from Cookies
  console.log(document.cookie); // Log all cookies

  /*  useEffect(() => {
    if (!token || !authToken) {
      navigate("/login");
      window.reload();
    }
  }, [token, navigate]); */

  return (
    <main>
      <Outlet />
    </main>
  );
}

export default UserLayout;
