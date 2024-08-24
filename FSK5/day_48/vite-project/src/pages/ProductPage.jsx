import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { updatePage } from "../store/productSlice";
import "../assets/scss/ProductPage.scss";
import ProductItem from "../components/ProductItem";
import PaginationC from "../components/Pagination";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const products = useSelector((state) => state.product.productList);
  const page = useSelector((state) => state.product.page);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [page]);

  return (
    <>
      <div className="product">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <PaginationC />
    </>
  );
};

export default ProductPage;
