import React from "react";

function Icon() {
    return (
       <div className="logoutIcon">
           <svg id="Layer_1"
                style={{ enableBackground: "new 0 0 24 24" }}
                version="1.1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
               <g>
                   <g>
                       <line
                           style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.6724",
                           strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }}
                           x1="7.6" x2="22" y1="12" y2="12" />
                   </g>
                   <g>
                       <path
                           style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.5",
                           strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10" }}
                             d="M11.9,0.8H4.5C3.1,0.8,2,1.9,2,3.2v17.5c0,1.4,1.1,2.5,2.5,2.5h7.4" />
                   </g>
                   <polyline className="st1" points="18.2,8.2 22,12 18.2,15.8"
                             style={{ fill: "none",
                       stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round", strokeMiterlimit: "10" }} />
               </g>
           </svg>
       </div>
    )
}

export default Icon