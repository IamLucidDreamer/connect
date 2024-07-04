import { ArrowRightIcon, BookOpenIcon } from "@heroicons/react/outline";

import Header from "../../components/shared/Header";
import heroBg from "../../assets/images/about_hero.jpg";
import Footer from "../../components/shared/Footer";

import nikhilSirImage from "../../assets/images/nikhil_sir_image.png";

const Hero = () => (
  <>
    <Header />
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center z-10 min-h-screen">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-75 bg-black"
        ></span>
      </div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="" data-aos="fade-up" data-aos-offset="100">
              <h1 className="text-white font-semibold text-5xl">About US</h1>
              {/* <p className="mt-4 text-lg text-gray-300">
                CAREERKICK SERVICES is the first and largest online trusted
                counselling platform in India which provides all information
                regarding educational institutions & universities on its YouTube
                channel. The main aim of this organization is to let the
                aspirants get the best possible colleges or universities to for
                their brighter future ahead.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="py-20 bg-white -mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center mt-32">
          <div
            className="w-full md:w-5/12 px-4 mr-auto ml-auto"
            data-aos="fade-up"
            data-aos-offset="100"
          >
            <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-primary">
              <BookOpenIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl mb-2 font-semibold leading-normal">
              Benefits of NEET Predictor
            </h3>
            <ul className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700 list-disc">
              <li>Best possible college prediction.</li>
              <li>Prediction for All India as well as State Quota.</li>
              <li>Detailed information on various colleges.</li>
              <li>Prediction as per ranking and cut-off.</li>
              <li>Frequently asked questions with answers.</li>
              <li>Latest NEET related updates .</li>
              <l1>
                Live Chat feature to connect you live to the Counselling team
                through Whatsapp.
              </l1>
            </ul>
            <a
              href="tel:+917393062116"
              className="font-bold text-gray-800 mt-8 flex gap-2 items-center mb-8"
              data-aos="fade-right"
              data-aos-offset="140"
            >
              Contact Us
              <ArrowRightIcon className="text-primary w-5 h-5" />
            </a>
          </div>

          <div
            className="w-full md:w-4/12 px-4 mr-auto ml-auto"
            data-aos="flip-up"
            data-aos-offset="200"
          >
            <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-primary">
              <img
                alt="..."
                src={nikhilSirImage}
                className="w-full align-middle rounded-t-lg"
              />
              <blockquote className="relative p-8 mb-4">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  className="absolute left-0 w-full block"
                  style={{
                    height: "95px",
                    top: "-94px",
                  }}
                >
                  <polygon
                    points="-30,95 583,95 583,65"
                    className="text-primary fill-current"
                  ></polygon>
                </svg>
                <div data-aos="fade-up" data-aos-offset="100">
                  <h4 className="text-xl font-bold text-white">
                    Nikhil Sachan
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Nikhil Sachan is a leading Career Counselling Expert and
                    mentor since six years who is serving students with valuable
                    guidance and counselling services. He started his own
                    company for students’ career guidance and counselling to let
                    students reach their destination with dedication without any
                    hindrance.
                  </p>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default Hero;
