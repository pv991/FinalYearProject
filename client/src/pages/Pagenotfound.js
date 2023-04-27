import React from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
const Pagenotfound = () => {
  return (
    <Layout title={"Go Back- Page not Found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h1 className="pnf-heading">Opps ! Page not found</h1>
        <Link to="/" className="pnf-btn">
          Go back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
