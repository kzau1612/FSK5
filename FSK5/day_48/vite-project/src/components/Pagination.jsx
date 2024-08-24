import { Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updatePage } from "../store/productSlice";
import "../assets/scss/Pagination.scss";
import { useNavigate, useParams } from "react-router-dom";

const PaginationC = () => {
  const totalPage = useSelector((state) => state.product.totalPage);
  const { page } = useParams();
  const currentPage = parseInt(page);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    dispatch(updatePage(value));
    navigate(`/products/${value}`);
  };

  return (
    <div className="pagination-page">
      <Pagination count={totalPage} page={currentPage} onChange={handleChange} color="primary" />
    </div>
  );
};

export default PaginationC;
