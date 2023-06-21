import React, { Component } from 'react';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery value={searchQuery} />
      </div>
    );
  }
}
