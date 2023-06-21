import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { MyLoader } from '../Loader';
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
    totalPages: 0,
    isShowModal: false,
    modalData: { img: '', tags: '' },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return { page: 1, value: nextProps.value };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { value, page, error } = this.state;
    const prevValue = prevProps.value;
    const nextValue = value.trim();

    if (prevValue !== nextValue || prevState.page !== page) {
      this.setState({ isLoading: true });

      if (error) {
        this.setState({ error: null });
      }

      try {
        const gallery = await api.fetchPhotos(nextValue, page);
        this.setState(prevState => ({
          gallery:
            page === 1 ? gallery.hits : [...prevState.gallery, ...gallery.hits],
          totalPages: Math.floor(gallery.totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  setModalData = modalData => {
    this.setState({ modalData, isShowModal: true });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const {
      gallery,
      error,
      isShowModal,
      modalData,
      isLoading,
      page,
      totalPages,
    } = this.state;
    return (
      <>
        <ul className={css.gallery}>
          {error && alert('Something went wrong. Try again.')}
          {isLoading && <MyLoader />}
          {gallery.length > 0 &&
            gallery.map(image => (
              <ImageGalleryItem
                key={image.id}
                item={image}
                onImageClick={this.setModalData}
              />
            ))}
        </ul>
        {gallery.length > 0 && isLoading !== true && page <= totalPages && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
        {isShowModal && (
          <Modal modalData={modalData} onModalClose={this.handleModalClose} />
        )}
      </>
    );
  }
}
