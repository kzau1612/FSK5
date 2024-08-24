import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import "../assets/scss/ProductPage.scss";
import ProductItem from "../components/ProductItem";
import PaginationC from "../components/Pagination";
import ReactLoading from "react-loading";

const ProductPage = () => {
  const products = useSelector((state) => state.product.productList);
  const page = useSelector((state) => state.product.page);
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [page]);

  if (status === "pending") {
    return <ReactLoading type={"spin"} color={"black"} height={50} width={50} />;
  }

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
