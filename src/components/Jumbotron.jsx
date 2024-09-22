// "use client";
// import "../assets/card.css";
// // import logo from "../assets/logo_light.svg";
// // import Description from "./Description";
// import "../output.css";

// function Jumbotron() {
// 	return (
// 		<main className="center">
// 			{/* <div className="card">
//         <div
//           className="image"
//           style={{ display: "flex", justifyContent: "center" }}
//         >
//           <img
//             src={logo}
//             alt="react logo"
//             style={{ width: "50%", height: "auto" }}
//           />{" "}
//         </div>
//         <div className="title">
//           <h1>React</h1>
//         </div>
//         <Description />
//       </div>
// 			 */}

// 			<section>
// 				<div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
// 					<img
// 						src="src\assets\red.png"
// 						alt="Red"
// 						className="mx-auto mb-8"
// 						style={{ width: "20%", height: "auto", marginTop: "-100px" }}
// 					/>
// 					<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">
// 						Welcome to the Playboi Carti Merch Store
// 					</h1>
// 					<p className="mb-8 text-lg font-normal text-red-300 lg:text-xl sm:px-16 lg:px-48">
// 						In our store, you will find unique items inspired by Playboi Carti's
// 						creativity that will elevate your style.
// 					</p>
// 					<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
// 						<a
// 							href="#"
// 							className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-800 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
// 						>
// 							Start Shopping
// 							<svg
// 								className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
// 								aria-hidden="true"
// 								xmlns="http://www.w3.org/2000/svg"
// 								fill="none"
// 								viewBox="0 0 14 10"
// 							>
// 								<path
// 									stroke="currentColor"
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									strokeWidth="2"
// 									d="M1 5h12m0 0L9 1m4 4L9 9"
// 								/>
// 							</svg>
// 						</a>
// 						<a
// 							href="#"
// 							className="inline-flex justify-center hover:text-red-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border- hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
// 						>
// 							Learn More
// 						</a>
// 					</div>
// 				</div>
// 			</section>
// 		</main>
// 	);
// }

// export default Jumbotron;
"use client";
import "../assets/card.css";
import "../output.css";

function Jumbotron({ startShopping }) {
  return (
    <main className="center">
      <section>
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <img
            src="src/assets/red.png"
            alt="Red"
            className="mx-auto mb-8"
            style={{ width: "20%", height: "auto", marginTop: "-100px" }}
          />
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">
            Welcome to the Playboi Carti Merch Store
          </h1>
          <p className="mb-8 text-lg font-normal text-red-300 lg:text-xl sm:px-16 lg:px-48">
            In our store, you will find unique items inspired by Playboi Carti's creativity that will elevate your style.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              onClick={startShopping} 
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-800 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            >
              Start Shopping
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex justify-center hover:text-red-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border- hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Jumbotron;
