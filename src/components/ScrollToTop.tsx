import clsx from 'clsx';
import { createRef, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const ref = createRef<HTMLButtonElement>();
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    if (!ref.current) return;
    ref.current.parentElement?.parentElement?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'btn-primary btn-circle btn absolute bottom-5 right-5 z-50 md:hidden',
        !visible && 'hidden'
      )}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </button>
  );
}
