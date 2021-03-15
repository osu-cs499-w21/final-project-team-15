import Link from 'next/link';
import styled from '@emotion/styled';


const Bar = styled.header`
  width: 100%;
  top: 0;
  margin: 0;
  padding: 0;
  display: flex;
  position: fixed;
  overflow: hidden;
  background-color: lightgray;
  z-index: 2;
`

const NavItem = styled.li`
  display: flex;
  align-items: center;
  float: left;
  &:hover {
    background-color: darkgray;
  }
  a {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px 15px;
    color: #484848;
    font-size: 24px;
    text-align: center;
    text-decoration: none;
    text-shadow: 0.75px 0.75px 0px rgba(0,0,0,0.2);
  }
  img {
    width: 40px;
    height: 40px;
  }
  span {
    padding-left: 5px;
    padding-bottom: 3px;
  }
`

function Navbar() {

  return (
    <div>
      <Bar>
        <NavItem>
          <Link href="/">
            <a>
              <img src="https://img.icons8.com/dusk/64/000000/rewind.png"/>
              <span>Rewind</span>
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/movie">
            <a>Movies</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/music">
            <a>Music</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/tv">
            <a>TV Shows</a>
          </Link>
        </NavItem>
      </Bar>
    </div>
  );
}

export default Navbar;
