import { PropsWithChildren } from 'react';
import { NavLink, Link } from 'react-router-dom';

const isActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? { color: 'red' } : {};

type NavLinkProps = {
  to: string;
  replace?: boolean;
  reloadDocument?: boolean;
};
const StyledNavLink = (props: PropsWithChildren<NavLinkProps>) => {
  return (
    <NavLink {...props} style={isActive}>
      {props.children}
    </NavLink>
  );
};

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          {/* <StyledNavLink to='/'>Home</StyledNavLink> */}
          <Link to='/' replace>
            {/* <Link to='/' reloadDocument> */}
            Home
          </Link>
        </li>
        <li>
          <StyledNavLink to='/login'>Login</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/my'>My</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/items'>Items</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/hello'>About</StyledNavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
