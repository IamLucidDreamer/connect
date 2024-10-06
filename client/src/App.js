import { useEffect, useState } from "react";
import Routes from "./Routes/Index";
import AOS from "aos";
import "aos/dist/aos.css";
import { XIcon } from "@heroicons/react/outline";


function App() {

  useEffect(() => {
    AOS.init({ duration: 1200, delay: 500 });
    AOS.refresh();
  }, []);

  return (
    <div>
      <Routes />
      <Development />
      {/* <Banner /> */}
    </div>
  );
}

export default App;

const Development = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/home"
    ) {
      setShow(true);
    } else {
      const showMessage = setTimeout(() => {
        setShow(false);
      }, 10000);

      return () => clearTimeout(showMessage);
    }
  }, []);

  if (!show) {
    return;
  }

  return (
    <div
      className="bg-black bg-opacity-75 flex flex-1 fixed top-0 bottom-0 left-0 right-0"
      style={{ zIndex: 9999 }}
    >
      <div className="flex justify-between px-4 items-center fixed bottom-0 w-full text-left text-base md:text-xl bg-white shadow-2xl p-4 border-4 gap-4">
        <div>
          The App is Under Active Development. We are sorry if you face any
          bugs. Please report bugs at :
          <a className="hover:underline text-primary ml-2" href="">
            info@alumns.in
          </a>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-xs inline-flex items-center"
        >
          <XIcon className="w-5 h-5" /> Dismiss
        </button>
      </div>
    </div>
  );
};

// const Banner = () => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (
//       window.location.pathname === "/" ||
//       window.location.pathname === "/home"
//     ) {
//       setShow(true);
//     } else {
//       const showMessage = setTimeout(() => {
//         setShow(false);
//       }, 10000);

//       return () => clearTimeout(showMessage);
//     }
//   }, []);

//   if (!show) {
//     return;
//   }

//   return (
//     <div
//       className="flex flex-1 fixed top-0 bottom-0 right-0 left-0 min-h-screen"
//       style={{ zIndex: 999999 }}
//     >
//       <div className="flex flex-1 bg-black bg-opacity-50">
//         <button
//           onClick={() => setShow(false)}
//           className="text-base inline-flex items-center fixed top-5 right-5 text-white"
//           style={{ zIndex: 999999 }}
//         >
//           <XIcon className="w-7 h-7" /> Dismiss
//         </button>
//         <div className="flex justify-center px-4 items-center fixed bottom-0 w-full text-left text-base md:text-xl shadow-2xl p-4 gap-4">
//           <img src={imageCelebrations} className="w-10/12 lg:w-1/2" />
//         </div>
//       </div>
//     </div>
//   );
// };
