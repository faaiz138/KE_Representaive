import React from 'react';
import './Sidebar.css'
function Sidebar(){
  return(
    <div className='sidenav'>
      <div class="sidebar">
      <div class="logo">

          <a href="https://www.ke.com.pk">
            <img src=
          "https://www.ke.com.pk/assets/themes/KE/images/logo.png"
          alt="K-Electric Logo"/></a>
        </div>
      <a href="/home"><i class="fa fa-fw fa-home"></i> Home</a>
      <a href="/login"><i class="fa fa-fw fa-user"></i>Login</a>
      <a href="/contact"><i class="fa fa-fw fa-envelope"></i> Contact</a>
      <a href="/career"><i class="fa fa-fw fa fa-briefcase"></i> Careers</a>
</div>
    </div>

  )
};
export default Sidebar