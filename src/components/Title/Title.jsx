import css from './Title.module.css';

export default function Title({ title }) {
  return <h1 className={css.title}>{title}</h1>;
}       