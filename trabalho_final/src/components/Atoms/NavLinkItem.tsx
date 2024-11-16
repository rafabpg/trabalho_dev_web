import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavLinkItemProps {
    link:string;
    children:React.ReactNode;
}

const NavLinkItem = ({link, children}:NavLinkItemProps) => {
  return (
    <NavLink
    to={link}
    className={({ isActive }) =>
        `focus:underline ${isActive ? 'underline' : ''} hover:text-gray-300`

    }
>
    {children}
</NavLink>
  )
}

export default NavLinkItem