import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { MyLoader } from './Loader';
import { ImageGallery } from './ImageGallery';
import api from './services/api';
import css from './App.module.css';

export class App extends Component {
  state = {
    gallery: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const gallery = await api.fetchPhotosWithQuery('cat');
      this.setState({ gallery });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { gallery, isLoading, error } = this.state;
    return (
      <div className={css.App}>
        <Searchbar />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <MyLoader />}
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
      </div>
    );
  }
}
