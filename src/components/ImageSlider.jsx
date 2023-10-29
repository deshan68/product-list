import React, { useEffect, useState } from "react";

const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageIndex((prev) => {
        if (prev == images?.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [imageIndex]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {images?.map((url) => (
        <img
          key={url}
          src={url}
          alt=""
          className="img-slider-img"
          style={{ translate: `${-100 * imageIndex}%` }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
