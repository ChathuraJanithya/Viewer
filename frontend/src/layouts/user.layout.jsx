import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function UserLayout() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("authToken");

  /*   useEffect(() => {
    if (!token) {
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
