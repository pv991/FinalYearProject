import Carousel from "react-bootstrap/Carousel";
import img1 from "./image/1.jpg";
import img2 from "./image/2.webp";
import img3 from "./image/3.jpg";
import img4 from "./image/4.jpg";
function Box() {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block img-fluid"
            src={img1}
            alt="First slide"
            style={{
              height: "80vh",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <Carousel.Caption>
            <h3 className="text-light">
              <span className="highlight">Plant Based Meat Category</span>
            </h3>
            <p className="text-light">
              <span className="highlight">With Tata Simply Better</span>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid"
            src={img2}
            alt="Second slide"
            style={{ height: "80vh", objectFit: "cover", width: "100%" }}
          />
          <Carousel.Caption>
            <h3 className="text-light">
              <span className="highlight">All Flavour Avaiable</span>
            </h3>
            <p className="text-light">
              <span className="highlight">Up To 20%</span>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid"
            src={img3}
            alt="Third slide"
            style={{ height: "80vh", objectFit: "cover", width: "100%" }}
          />
          <Carousel.Caption>
            <h3 className="text-light">
              <span className="highlight">Ready To Eat & Ready to Cook</span>
            </h3>
            <p className="text-light">
              <span className="highlight">Up To 50%</span>
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block img-fluid"
            src={img4}
            alt="Forth slide"
            style={{ height: "80vh", objectFit: "cover", width: "100%" }}
          />
          <Carousel.Caption>
            {/* <h3 className="text-dark ">
          <span className="highlight">Foodgrains, oils &amp; ghee</span>
          </h3>
          <p className="text-light">
          <span className="highlight">up to 60%</span>
        </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <div className="container-fluid mt-4">
        <div className="branding my-2 d-flex justify-content-between w-100 shadow-sm bg-white  pb-0 pt-4 px-5 text-sm-center rounded-3">
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                className="d-flex align-items-start"
                key={index}
                style={{ color: "black" }}
              >
                {i.icon}
                <div className="px-3">
                  <h5 className="fw-semibold text-sm">{i.title}</h5>
                  <p className="text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div> */}
    </>
  );
}

export default Box;
