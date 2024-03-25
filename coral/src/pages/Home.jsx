import React, { useState, useEffect, useReducer } from "react";
import "./styles/Home.css";
import ProductCard from "../components/Cards/ProductCard";
import { ProgressBar } from "react-loader-spinner";
import Footer from "../components/footer/Footer";
import Dropdown from "../components/Dropdown/Dropdown";
import axios from "axios";
import { initState, productsReducer } from "./productsReducer";
import { getApi } from "./api";

const Home = () => {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(productsReducer, initState);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const handleSelect = (option) => {
    setFilter(option);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    dispatch({ type: "LOADING" });
    getApi(filter)
      .then((result) => {
        dispatch({ type: "SUCCESS", payload: result?.data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR" });
        throw new Error("invalid action type");
      });
  }, [filter]);
  console.log(state);
  return (
    <div className="home-page">
      <div className="navbar">
        <svg
          width="180"
          height="34"
          viewBox="0 0 180 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42.05 16.598C42.05 13.462 43.016 10.8673 44.948 8.814C46.88 6.75133 49.344 5.72 52.34 5.72C53.544 5.72 54.706 5.88333 55.826 6.21C56.9553 6.53667 57.9213 6.994 58.724 7.582L57.324 9.052C56.7547 8.464 56.036 8.016 55.168 7.708C54.3 7.39067 53.376 7.232 52.396 7.232C50.0253 7.232 48.1493 7.98333 46.768 9.486C45.3867 10.9793 44.7053 13.2053 44.724 16.164C44.7427 19.2627 45.4847 21.638 46.95 23.29C48.4153 24.9327 50.31 25.754 52.634 25.754C54.1647 25.754 55.476 25.46 56.568 24.872C57.66 24.284 58.5 23.5467 59.088 22.66L60.194 23.598C59.326 24.8113 58.206 25.7493 56.834 26.412C55.4713 27.0747 53.964 27.406 52.312 27.406C49.3907 27.406 46.95 26.454 44.99 24.55C43.03 22.6367 42.05 19.986 42.05 16.598ZM56.68 8.478L57.8 6.182H58.892V12.44H57.59L56.68 8.478ZM61.3273 16.668C61.3273 13.5133 62.2467 10.9 64.0853 8.828C65.9333 6.756 68.36 5.72 71.3653 5.72C74.3707 5.72 76.7927 6.69533 78.6313 8.646C80.47 10.5967 81.3893 13.2053 81.3893 16.472C81.3893 19.58 80.4793 22.184 78.6593 24.284C76.8393 26.3747 74.422 27.42 71.4073 27.42C68.4767 27.42 66.064 26.4307 64.1693 24.452C62.2747 22.4733 61.3273 19.8787 61.3273 16.668ZM64.0013 16.178C64.0013 19.1087 64.6827 21.4653 66.0453 23.248C67.408 25.0213 69.186 25.908 71.3793 25.908C73.778 25.908 75.598 25.1147 76.8393 23.528C78.09 21.932 78.7153 19.6033 78.7153 16.542C78.7153 13.7887 78.048 11.5627 76.7133 9.864C75.388 8.16533 73.61 7.316 71.3793 7.316C68.99 7.316 67.1607 8.086 65.8913 9.626C64.6313 11.1567 64.0013 13.3407 64.0013 16.178ZM83.5038 27V25.852L86.2478 25.348L86.2758 16.444L86.2478 7.778L83.5038 7.302V6H92.1278C94.0504 6 95.4691 6.42 96.3838 7.26C97.3078 8.1 97.7698 9.29 97.7698 10.83C97.7698 12.5193 97.2098 13.8913 96.0898 14.946C94.9791 15.9913 93.6584 16.514 92.1278 16.514C91.5118 16.514 90.7231 16.4953 89.7618 16.458C88.8098 16.4113 88.0818 16.3693 87.5778 16.332V15.24L89.1038 15.254H91.0918C92.4731 15.254 93.4718 14.8667 94.0878 14.092C94.7131 13.3173 95.0258 12.272 95.0258 10.956C95.0258 9.78933 94.7551 8.898 94.2138 8.282C93.6724 7.666 92.7998 7.358 91.5958 7.358H89.1878L88.7958 7.624L88.7398 16.458L88.7678 25.348L91.6238 25.852V27H83.5038ZM90.9378 16.332L92.9678 15.268L97.6298 22.73C98.4604 23.99 99.1931 24.8253 99.8278 25.236C100.472 25.6373 101.05 25.8427 101.564 25.852V27H98.0358L97.1118 26.104L90.9378 16.332ZM100.791 27V25.852L103.339 25.362L105.593 19.412L110.381 5.888H112.089L116.821 18.74L119.341 25.362L121.707 25.852V27H114.231V25.852L116.611 25.418L114.777 19.86L110.731 9.192L106.895 19.804L105.103 25.432L107.721 25.852V27H100.791ZM105.971 20.448L106.461 19.062L111.207 19.202L115.757 19.048L116.121 20.448H105.971ZM122.387 27V25.852L125.131 25.404L125.159 16.444L125.131 7.778L122.387 7.302V6H130.857V7.302L127.651 7.778L127.623 16.444L127.651 25.39L128.379 25.754H135.365L136.863 21.26H138.249L137.549 27H122.387Z"
            fill="black"
          />
          <path
            d="M149.354 17.5L156.5 10.3536L163.646 17.5L156.5 24.6464L149.354 17.5Z"
            stroke="black"
            stroke-width="0.5"
          />
          <path
            d="M157.354 17.5L164.5 10.3536L171.646 17.5L164.5 24.6464L157.354 17.5Z"
            stroke="black"
            stroke-width="0.5"
          />
          <path
            d="M165.354 17.5L172.5 10.3536L179.646 17.5L172.5 24.6464L165.354 17.5Z"
            stroke="black"
            stroke-width="0.5"
          />
          <path
            d="M0.353554 17.5L7.5 10.3536L14.6464 17.5L7.5 24.6464L0.353554 17.5Z"
            stroke="black"
            stroke-width="0.5"
          />
          <path
            d="M8.35355 17.5L15.5 10.3536L22.6464 17.5L15.5 24.6464L8.35355 17.5Z"
            stroke="black"
            stroke-width="0.5"
          />
          <path
            d="M16.3536 17.5L23.5 10.3536L30.6464 17.5L23.5 24.6464L16.3536 17.5Z"
            stroke="black"
            stroke-width="0.5"
          />
        </svg>
      </div>
      <div className="submenu">
        {/* {loading ? (
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          ""
        )} */}
      </div>

      <section className="products-section">
        <div className="products-container">
          <div className="title-cont">
            <div className="title">
              <h2>Our Products</h2>
            </div>
          </div>
          <div className="filter-cont" onClick={() => setIsOpen(!isOpen)}>
            <div className="filter-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.08203 1.25391C1.27344 0.871094 1.65625 0.625 2.09375 0.625H13.9062C14.3164 0.625 14.6992 0.871094 14.8906 1.25391C15.0547 1.63672 15 2.10156 14.7266 2.42969L9.75 8.52734V12C9.75 12.3555 9.55859 12.6562 9.25781 12.793C8.95703 12.9297 8.60156 12.9023 8.32812 12.7109L6.57812 11.3984C6.35938 11.2344 6.25 10.9883 6.25 10.6875V8.52734L1.24609 2.42969C0.972656 2.10156 0.917969 1.63672 1.08203 1.25391Z"
                  fill="white"
                />
              </svg>
              Filter
            </div>
            {isOpen && <Dropdown handleSelect={handleSelect} />}
          </div>
          {/* {isOpen && <Dropdown handleSelect={handleSelect} />} */}
          <div className="products-list">
            {Array.isArray(state.res) ? (
              state.res.map((item) => {
                return <ProductCard item={item} />;
              })
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </section>

      <Footer scroll={scrollToTop} />
    </div>
  );
};

export default Home;
