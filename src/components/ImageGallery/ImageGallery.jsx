import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import api from '../services/api';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    value: '',
    gallery: [],
    isLoading: false,
    error: null,
    page: 1,
    totalPages: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return { page: 1, value: nextProps.value };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    const prevValue = prevProps.value;
    const nextValue = value.trim();

    if (prevValue !== nextValue || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        const gallery = await api.fetchPhotos(nextValue, page);
        this.setState({
          gallery: gallery.hits,
          totalPages: Math.floor(gallery.totalHits / 12),
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { gallery } = this.state;
    return (
      <ul className={css.gallery}>
        {gallery.map(image => (
          <ImageGalleryItem
            key={image.id}
            tags={image.tags}
            largeImageURL={image.largeImageURL}
            webformatURL={image.webformatURL}
          />
        ))}
      </ul>
    );
  }
}
