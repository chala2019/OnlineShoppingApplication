import React from "react";
import { Link } from "react-router-dom";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left row">
            <i className="fa fa-phone"></i>
            <label>+094771398557</label>
            <i className="fa fa-envelope"></i>
            <label>eshop@gmail.com</label>
          </div>
          <div className="right row RText">
            <label>Theme FAQ's</label>
            <Link to="/signup"><span style={{color:'black', backgroundColor: 'yellow', padding: '3px', borderRadius: 20}}><i className="fa-solid fa-user-plus"></i> 
             <label >Sing Up</label></span></Link>

          

             <Link to="/signin"><span style={{color:'black', backgroundColor: 'yellow', padding: '3px', borderRadius: 20}}><i className="fa fa-sign-in" aria-hidden="true"></i> 
             <label >Sing In</label></span></Link>




  
           
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;

