import axios from "axios";
import React, { useEffect, useState } from "react";
import Background from "../../background";
import "../../App.css";

function Authorbooks({authorname,impstyle,showsiebar}){
   const autname=authorname;
   //onpress the closebtn the side bar will hide it's state
   const closeBTN=()=>{
    showsiebar();//this function will call the parent function in the Authorbooks.js file
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginLeft = "15%";
   }
return(
    <div className={impstyle}>
         <a href="javascript:void(0)" className="closebtn" onClick={()=>closeBTN()}>×</a>
    <div className="context">
   
           {autname.docs.map((item,i)=>{
            return(   
         <ul className="card " style={{width:"100%",padding:"10px 10px",marginLeft:"10px"}}>
            <li className="card">
                <p style={{color:"white"}}><i className="fa fa-user" aria-hidden="true"></i>&nbsp;Name:&nbsp;<b style={{fontWeight:"normal",textDecoration:"underline"}}>{item.name}</b></p>
                <p style={{color:"white"}}><i className="fa fa-book" aria-hidden="true"></i>&nbsp;Best Book:&nbsp;<b style={{fontWeight:"lighter",textDecoration:"underline"}}>{item.top_work}</b></p>
            </li>
            </ul>
            );   
        })}
          </div>
    </div>
)
}
export default Authorbooks;