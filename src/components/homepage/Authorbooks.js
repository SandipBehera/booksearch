import axios from "axios";
import React, { useEffect, useState } from "react";

function Authorbooks({authorname,impstyle}){
   const autname=authorname;
return(
    <div className={impstyle}>
       <ul className="card" style={{width:"100%"}}>
           {autname.docs.map((item,i)=>{
            return(   
            <li className="card">
                <p>Name:{item.name}</p>
                <p>Best Book:{item.top_work}</p>
            </li>
            );   
        })}
            
          </ul>
    </div>
)
}
export default Authorbooks;