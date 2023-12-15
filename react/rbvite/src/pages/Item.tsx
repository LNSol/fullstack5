import {
  useParams,
  useLocation,
  useSearchParams,
  useOutletContext,
} from 'react-router-dom';
import { OutletContext } from './ItemLayout';

type Params = {
  id: string;
};

const Item = () => {
  const outctx = useOutletContext<OutletContext>();
  const { id } = useParams<Params>();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('params.id > ', id);
  console.log('outctx > ', outctx);
  console.log('location > ', location);
  console.log(
    'searchparams > ',
    searchParams.get('key'),
    searchParams.get('value')
  );
  return (
    <div>
      <h1>Item {id}</h1>
      {!!outctx && (
        <p>
          outctx.name: {outctx.name} / outctx.age: {outctx.age}
        </p>
      )}
    </div>
  );
};
export default Item;
