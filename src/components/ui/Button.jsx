import { Link } from 'react-router-dom';

export default function Button({ to, href, onClick, variant = 'primary', children, className = '' }) {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors duration-200';
  const styles = {
    primary: 'bg-primary-700 text-white hover:bg-primary-900',
    outline: 'border border-primary-700 text-primary-700 hover:bg-primary-50',
    accent: 'bg-accent text-white hover:opacity-90',
  };
  const classes = `${base} ${styles[variant]} ${className}`;

  if (to) return <Link to={to} className={classes}>{children}</Link>;
  if (href) return <a href={href} className={classes}>{children}</a>;
  return <button onClick={onClick} className={classes}>{children}</button>;
}
