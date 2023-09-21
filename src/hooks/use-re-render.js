import { useReducer } from 'react';
// This custom hook allow us to force component re-render
const useReRender = () => {
  const [, reRender] = useReducer((x) => x + 1, 0);
  return reRender;
};

export default useReRender;
