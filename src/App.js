import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

//TODO replace with dotenv
const ALGOLIA_APP_ID = '<YOUR_APP_ID>';
const ALGOLIA_SEARCH_KEY = '<YOUR_SEARCH_API_KEY>';
const ALGOLIA_INDEX = '<YOUR_INDEX>';
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">homebrew_app</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX}>
            <div className="search-panel">
              <div className="search-panel__filters">
                <RefinementList attribute="ingredients.yeast" />
                <RefinementList attribute="ingredients.hops.name" />
                <RefinementList attribute="ingredients.malt.name" />
              </div>

              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder: 'Whatcha thirstin matey?',
                  }}
                />
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={props.hit} />
      </h1>
      <p>
        <Highlight attribute="description" hit={props.hit} />
      </p>
      <p>
        <Highlight attribute="image_url" hit={props.hit} />
      </p>
      <p>
        <Highlight attribute="abv" hit={props.hit} />
      </p>
      <p>
        <Highlight attribute="ibu" hit={props.hit} />
      </p>
      <p>
        <Highlight attribute="srm" hit={props.hit} />
      </p>
      <p>
        <Highlight attribute="ingredients" hit={props.hit} />
      </p>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
