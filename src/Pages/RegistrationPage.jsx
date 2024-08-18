import Header from "../Common/Header";
import RegistrationForm from "../Components/Auth/RegistrationForm";
import Footer from "../Components/Blogs/Footer";

export default function RegistrationPage() {
  return (
    <div className="bg-[#030317] min-h-screen text-white">
      <Header />

      <main>
        <section className="container">
          {/* <!-- Registration form Form into a box center of the page --> */}
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Registration</h2>
            <RegistrationForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
