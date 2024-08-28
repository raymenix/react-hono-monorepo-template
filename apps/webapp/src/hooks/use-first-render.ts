import { useEffect, useRef } from 'react';

const useFirstRender = (callback: () => void) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      callback();
    }
  }, [callback]);
};

export default useFirstRender;
