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
    perPage: 12,
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
        const { perPage } = this.state;
        const gallery = await api.fetchPhotos(nextValue, page, perPage);

        if (gallery.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState(prevState => ({
            gallery:
              page === 1
                ? gallery.hits
                : [...prevState.gallery, ...gallery.hits],
            isLoading: false,
            totalPages: Math.floor(gallery.totalHits / perPage),
          }));
        }
      } catch (error) {
        this.setState({ error });
        alert('Something went wrong. Try again.');
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
    const { gallery, isShowModal, modalData, page, totalPages, isLoading } =
      this.state;

    if (isLoading) {
      return <MyLoader />;
    }

    if (gallery.length > 0) {
      return (
        <>
          <ul className={css.gallery}>
            {gallery.map(image => (
              <ImageGalleryItem
                key={image.id}
                item={image}
                onImageClick={this.setModalData}
              />
            ))}
          </ul>
          {page <= totalPages && (
            <Button onClick={this.handleLoadMore}>Load More</Button>
          )}
          {isShowModal && (
            <Modal modalData={modalData} onModalClose={this.handleModalClose} />
          )}
        </>
      );
    }
  }
}
