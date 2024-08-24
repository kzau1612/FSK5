import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/productSlice";
import "../assets/scss/ProductDetailPage.scss";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [product]);

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail__img" />
      <div className="product-detail__content">
        <h3 className="product-detail__brand">{product.brand}</h3>
        <h3 className="product-detail__name">{product.name}</h3>
        <p className="product-detail__desc">{product.description}</p>
        <span className="product-detail__category">Category: {product.category}</span>
        <button className="back-btn" onClick={handleBack}>
          Go Home
        </button>
        <span className="product-detail__price">Price: ${product.price}</span>
        <button className="add-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
