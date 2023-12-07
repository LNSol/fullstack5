export const replaceElement = <T>(arr: T[], idx: number, element: T) => {
  const front = arr.slice(0, idx);
  const back = arr.slice(idx + 1, arr.length);

  return [...front, element, ...back];
};
