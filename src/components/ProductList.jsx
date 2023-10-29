import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";
import { useGetProduct } from "../hooks/useGetProduct";

const ProductList = () => {
  const observer = useRef();
  const { hasMore, productList, getProductList } = useGetProduct();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    getProductList();
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prev) => {
            getProductList(prev + 1);
            return prev + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [productList]
  );

  return (
    <div className="product-list-container">
      {productList?.map((item, index) => (
        <div ref={lastPostElementRef} key={index} className="product-card">
          {/* image div */}
          <div className="img-container">
            <ImageSlider images={item?.images} />
          </div>

          <div className="title-price">
            {/* title */}
            <span>{item.name}</span>

            {/* price */}
            <span>${item.price}</span>
          </div>

          {/* buttons */}
          <div className="btn-container">
            <button>Add to Cart</button>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
