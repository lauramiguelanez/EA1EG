import { useEffect, useState } from 'react';

const defaultSize = { width: 0, height: 0 };

const useWindowSize = () => {
  const [size, setSize] = useState(defaultSize);
  const onResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return size;
};

export default useWindowSize;
