// import { ChangeEvent, useEffect, useMemo, useState } from 'react';

// const Sample = () => {
//   const [, rerender] = useState<ChangeEvent<HTMLInputElement>>();
//   const [array, setArray] = useState([1, 2, 3]);
//   // const array = [1, 2, 3];
//   // const memoArray = useMemo(() => array, [array]);

//   useEffect(() => {
//     console.log('effect Array@@@');
//   }, [array]);

//   return (
//     <div>
//       Array: {array}
//       <button onClick={() => setArray((prev) => [...prev, 1])}>AddArray</button>
//       <input type='text' onChange={rerender} />
//     </div>
//   );
// };
// export default Sample;

// import { ChangeEvent, useEffect, useMemo, useState } from 'react';

// const Sample = () => {
//   return (
//     <div>
//       국어: <input />
//       수학: <input />
//       영어: <input />
//       <button
//     </div>
//   );
// };
// export default Sample;
