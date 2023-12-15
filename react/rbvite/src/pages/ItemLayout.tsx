import { Link, Outlet } from 'react-router-dom';

export type OutletContext = {
  name: string;
  age: number;
};

const ItemLayout = () => {
  return (
    <div style={{ border: '1px solid black' }}>
      <h2>ItemLayout</h2>
      <ul>
        <li>
          <Link to='/items/1'>Item1</Link>
        </li>
        <li>
          <Link to='/items/2'>Item2</Link>
        </li>
        <li>
          <Link to='/items/3?key=key&value=value'>Item3</Link>
        </li>
      </ul>

      <Outlet context={{ name: 'Hong', age: 25 }} />
      {/* <Outlet /> */}
    </div>
  );
};
export default ItemLayout;
