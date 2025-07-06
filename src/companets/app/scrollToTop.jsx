import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    const location = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, [location.pathname, location.state]);

    return null;
};

export default ScrollToTop;