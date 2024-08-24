import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import "../assets/scss/Pagination.scss";
import { useNavigate } from "react-router-dom";

const PaginationC = ({ page }) => {
  const totalPage = useSelector((state) => state.product.totalPage);

  const navigate = useNavigate();

  const handleChange = (e, value) => {
    navigate(`/products/${value}`);
  };

  return (
    <div className="pagination-page">
      <Pagination count={totalPage} page={page} onChange={handleChange} color="primary" />
    </div>
  );
};

export default PaginationC;
