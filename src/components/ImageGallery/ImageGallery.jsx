import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem';

export const ImageGallery = ({ gallery }) => (
  <ul className={css.gallery}>
    {gallery.map(({ id, tags, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        tags={tags}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);
