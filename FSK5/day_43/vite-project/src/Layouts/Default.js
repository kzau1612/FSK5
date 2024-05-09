export const DefaultLayout = () => {
  return `
    <header>
        <h1><a href="/" >HEADER</a></h1>
    </header>
    <main>
        <h2>Menu</h2>
        <div class="top">

            <ul class="nav">
                 <li class="nav-item">
                     <a href="/" >Trang chủ</a>
                 </li>
                 <li class="nav-item">
                     <a href="/gioi-thieu" >Giới Thiệu</a>
                 </li>
                <li class="nav-item">
                    <a href="/san-pham" >Sản phẩm</a>
                </li>
            </ul>
        </div>
         <div class="bottom">
      
         </div>
    </main>
    <footer>
      <h1>FOOTER</h1>
    </footer>
`;
};
