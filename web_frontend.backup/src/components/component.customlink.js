import React from 'react';
import {NavLink} from 'react-router-dom';
import {extractCurrentRoute} from '../middlewares/middleware.route';

const CustomNavLink = ({to, activeClass, content})=>{
  const path = extractCurrentRoute();

  return <NavLink to={to} className={path===to? activeClass:""}>
      {content}
    </NavLink>
}

export default CustomNavLink;
