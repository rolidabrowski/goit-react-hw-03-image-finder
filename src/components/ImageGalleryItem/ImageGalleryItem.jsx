import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ tags, largeImageURL, webformatURL }) => {
  return (
    <li className={css.item}>
      <a className={css.itemLink} href={largeImageURL}>
        <img className={css.itemImage} src={webformatURL} alt={tags} />
      </a>
    </li>
  );
};
