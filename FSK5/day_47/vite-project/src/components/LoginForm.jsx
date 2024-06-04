import { useAuth0 } from "@auth0/auth0-react";

const LoginForm = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-form">
      <p>Cảm ơn bạn đã sử dụng dịch vụ của F8</p>
      <p>Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại đây!</p>
      <button onClick={() => loginWithRedirect()}>ĐĂNG NHẬP || ĐĂNG KÝ</button>
    </div>
  );
};

export default LoginForm;
