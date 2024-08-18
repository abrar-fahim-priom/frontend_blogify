import Header from "../Common/Header";
import LoginForm from "../Components/Auth/LoginForm";
import Footer from "../Components/Blogs/Footer";

export default function LoginPage() {
  return (
    <div className="bg-[#030317] min-h-screen text-white">
      <Header />

      <main>
        <section className="container">
          {/* <!-- Login Form into a box center of the page --> */}
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <LoginForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
