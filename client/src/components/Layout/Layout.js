import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Layout = ({ children, title, description, keywords, author }) => {
  const location = useLocation();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      {location.pathname === "/" && <Footer />}
    </div>
  );
};
Layout.defaultProps = {
  title: "GreenGrocer Shop-Now",
  description: "E-commerce platform for Vegetables & Grocery",
  keywords: "mern,react,es6,node,mongodb",
  author: "Varun Parmar",
};

export default Layout;
