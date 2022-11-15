import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("hrLogin");
    window.location.href = "/";
  }, []);

  return (
    <div>
      <h3>Logout</h3>
    </div>
  );
}

export default Logout;
