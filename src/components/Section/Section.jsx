import PropTypes from 'prop-types';
import sec from './section.module.css';
import clsx from 'clsx';

const Section = ({ title, variant, children }) => {
  return (
    <section className={clsx(sec.section, sec[variant])}>
      <div className={clsx(sec.container, sec[variant])}>
        <h2 className={clsx(sec.title, sec[variant])}>{title}</h2>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Section;
