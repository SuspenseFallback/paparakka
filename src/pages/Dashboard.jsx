import React, { useEffect } from "react";
import "../css/Dashboard.css";

const Dashboard = ({ user }) => {
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <main className="dashboard">
        <div className="page page-1 dashboard-page-1">
          <div className="header">
            <div className="user-info">
              <h1 className="user">{user.username}</h1>
              <p className="full-name">
                {user.fullname ? user.fullname : user.username}
              </p>
              <p className="desc">
                {user.description ? (
                  user.description
                ) : (
                  <p className="link">Add a description.</p>
                )}
              </p>
            </div>
            <div className="right"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
