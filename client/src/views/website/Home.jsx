import React, { useState } from "react";
import Service from "./Services";
import Accordion from "./Accordian";
import Footer from "./Footer";
import Cta from "./CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <Service />
      <Accordion />
      <Cta />
      <Footer />
    </>
  );
};

export default Home;

const Hero = () => {
  return (
    <div className="">
      <Navbar />
      <div className="relative bg-white">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap min-h-screen items-center justify-center">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark sm:text-[42px] lg:text-[40px] xl:text-5xl">
                  Welcome to Connect Beta Website
                </h1>
                <p className="mb-12 max-w-[480px] text-base text-body-color ">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
                  sint voluptas aperiam vitae, voluptatum a eaque voluptates,
                  facilis expedita tempora optio et culpa, ducimus tempore ipsam
                  ab consequatur possimus sunt?
                </p>
                <ul className="flex flex-wrap items-center">
                  <li>
                    <a
                      href="/#"
                      className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-dark lg:px-7"
                    >
                      Get Started
                    </a>
                  </li>
                </ul>
                <div className="clients pt-16 absolute bottom-24">
                  <h6 className="mb-6 flex items-center text-xs font-normal text-body-color ">
                    Some Of Our Partner Institutes
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>

                  <div className="flex items-center space-x-12">
                    <SingleImage
                      href="#"
                      imgSrc="https://www.iitk.ac.in/new/images/logo/iitk-logo.svg"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://www.iitm.ac.in/themes/custom/iitm/assets/images/logo.png"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://www.iitkgp.ac.in/assets/pages/images/logo.png"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://www.iitk.ac.in/new/images/logo/iitk-logo.svg"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://www.iitm.ac.in/themes/custom/iitm/assets/images/logo.png"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://www.iitkgp.ac.in/assets/pages/images/logo.png"
                    />
                    <SingleImage
                      href="#"
                      imgSrc="https://www.iitk.ac.in/new/images/logo/iitk-logo.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="https://img.freepik.com/premium-photo/smiling-indian-student-working-university-classroom_875825-49730.jpg"
                    alt="hero"
                    className="max-w-full lg:ml-auto rounded-l-[20%]"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
      <div className="container mx-auto">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <a href="/" className="block w-full py-5">
              <h1 className="text-2xl">Alumns</h1>
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color "></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color "></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color "></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/#">My Connections</ListItem>
                  <ListItem NavLink="/#">My Events</ListItem>
                  <ListItem NavLink="/#">Organisations</ListItem>
                  <ListItem NavLink="/#">Jobs</ListItem>
                  <ListItem NavLink="/#">About Us</ListItem>
                  <ListItem NavLink="/#">Contact Us</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <a
                href="/login"
                className="px-7 py-2.5 text-base font-medium text-dark hover:text-primary border border-indigo-600 rounded-lg mr-4 hover:bg-gray-50"
              >
                Sign in
              </a>

              <a
                href="/signup"
                className="rounded-lg bg-indigo-600 px-7 py-2.5 text-base font-medium text-white hover:bg-opacity-90 flex items-center justify-center"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-dark hover:text-primary lg:ml-10 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
