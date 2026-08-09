import { useRef, useEffect, useState } from 'react';
import './Section.css';

export function Section({ id, title, subtitle, children, className = '', fullWidth = false }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '-40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={`section ${className}`} ref={ref}>
      <div className={fullWidth ? 'section__full' : 'container'}>
        {(title || subtitle) && (
          <div className={`section__header ${isVisible ? 'section__header--visible' : ''}`}>
            {subtitle && (
              <span className="section__subtitle">{subtitle}</span>
            )}
            {title && <h2 className="section__title">{title}</h2>}
            <div className="section__rule" />
          </div>
        )}
        <div className={`section__body ${isVisible ? 'section__body--visible' : ''}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
