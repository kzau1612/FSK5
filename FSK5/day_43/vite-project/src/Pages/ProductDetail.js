export const ProductDetail = ({ params }) => {
  const { id } = params;

  return `
  <h1>Chi tiết sản phẩm: ${id}</h1>
  <button onlick="navigate('/san-pham')">Back</button>
  `;
};
