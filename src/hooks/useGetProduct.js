import { useState } from "react";
import { productList as list } from "../constant";

export const useGetProduct = () => {
  const [hasMore, setHasMore] = useState(true);
  const [productList, setProductList] = useState();

  const getProductList = (pageNumber) => {
    let page = pageNumber || 1;
    let _nextItems = list.slice(0, page * 10);
    if (_nextItems.length == list.length) setHasMore(false);
    setProductList(_nextItems);
  };

  return { productList, hasMore, getProductList };
};
