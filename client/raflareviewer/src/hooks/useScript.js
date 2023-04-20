import {useEffect} from '@types/react';

const useScript = (src) => {
  useEffect( () => {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
        return() => {
          document.body.removeChild(script);
        };
      },[src]);
};

export default useScript