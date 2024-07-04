import React, { useEffect } from "react";
import bgAuth from "../../assets/images/auth_bg_mobile.png";
import { useRef } from "react";
import { gsap } from "gsap";

const AuthLayout = ({ imageLink, title, description, form }) => {
  const myRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(myRef.current, {
      duration: 1,
      ease: "power2.out",
      opacity: 0,
      x: "-100%",
    });
    gsap.from(formRef.current, { duration: 1, opacity: 0.2 });
    return () => {
      gsap.to(myRef.current, { duration: 1, opacity: 0, x: -75 });
      gsap.to(formRef.current, { duration: 1, opacity: 20 });
    };
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden flex item">
      <div
        ref={myRef}
        className="w-7/12 rounded-r-3xl bg-cover bg-no-repeat bg-center hidden lg:block"
        style={{ backgroundImage: `url(${imageLink})` }}
      >
        <div className="min-h-screen flex items-center justify-center bg-primary bg-opacity-95 rounded-r-3xl shadow-2xl shadow-primary">
          <div className="w-2/3 max-w-xl">
            <h1 className="text-white text-5xl my-8">{title}</h1>
            <p className="text-white text-xl">{description}</p>
          </div>
        </div>
      </div>
      <div
        ref={formRef}
        className="w-full lg:w-5/12  bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${window.innerWidth < 1024 ? bgAuth : ""})`,
        }}
      >
        <div
          className="min-h-screen flex items-end lg:items-center justify-center pb-8 overflow-y-scroll"
          data-aos="fade-up"
          data-aos-offset="10"
        >
          {form}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
