import React from "react";
import Layout from "../components/Layout/Layout";
import img from "../Images/images/aboutus.avif";
const About = () => {
  return (
    <Layout title={"about us"}>
      <div id="about" className="about ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="about-box">
                <h2>About us</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages andIt is a long established
                  fact that a reader will be distracted by the readable content
                  of a page when looking at its layout. The point of using Lorem
                  Ipsum is that it has a more-or-less normal distribution of
                  letters, as opposed to using 'Content here, content here',
                  making it look like readable English. Many
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 padding_rl">
              <div className="about-box_img">
                <figure>
                  <img src={img} alt="#" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
