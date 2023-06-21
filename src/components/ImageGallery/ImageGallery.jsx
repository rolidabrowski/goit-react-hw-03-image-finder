import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { MyLoader } from '../Loader';
import api from '../services/api';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

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
    perPage: 200,
    totalPages: 0,
    isShowModal: false,
    modalData: { img: '', tags: '' },
    status: Status.IDLE,
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
      this.setState({ isLoading: true, status: Status.PENDING });

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
            status: Status.RESOLVED,
            totalPages: Math.floor(gallery.totalHits / perPage),
          }));
        }
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
      isShowModal,
      modalData,
      page,
      totalPages,
      status,
      isLoading,
    } = this.state;

    if (status === 'idle') {
      return;
    }
    if (isLoading && status === 'pending') {
      return <MyLoader />;
    }
    if (status === 'rejected') {
      return alert(
        'We are sorry, but you have reached the end of search results.'
      );
    }
    if (gallery.length === 0 && status === 'rejected') {
      return alert('Something went wrong. Try again.');
    }

    if (gallery.length > 0 && status === 'resolved') {
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
          {gallery.length > 0 &&
            status !== 'pending' &&
            page <= totalPages &&
            (console.log('page', page),
            console.log('totalPages', totalPages),
            (<Button onClick={this.handleLoadMore}>Load More</Button>))}
          {isShowModal && (
            <Modal modalData={modalData} onModalClose={this.handleModalClose} />
          )}
        </>
      );
    }
  }
}
