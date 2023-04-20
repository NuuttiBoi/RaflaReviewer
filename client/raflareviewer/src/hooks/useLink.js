import {useEffect} from 'react';

const useLink = (href, rel) => {
  useEffect(() =>{
    const link = document.createElement('link');
    link.href = href;
    link.rel = rel;
    document.body.appendChild(link);
    return() => {
      document.body.removeChild(link);
    };
  },[href, rel]);
};
export default useLink;