import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  connectNumericMenu,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

//TODO replace with dotenv
const ALGOLIA_APP_ID = '<YOUR_APP_ID>';
const ALGOLIA_SEARCH_KEY = '<YOUR_SEARCH_KEY>';
const ALGOLIA_INDEX = '<YOUR_INDEX>';
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const APP_NAME = 'Homebrew App';

const NumericMenu = ({ attribute, items, refine }) => (
  <div className="ais-NumericMenu">
  <ul className="ais-NumericMenu-list">
  {items.map(item => (
    <li key={item.value} className="ais-NumericMenu-item">
      <label className="ais-NumericMenu-label">
        <input
          className="ais-NumericMenu-radio"
          type="radio"
          name={'NumericMenu_'+attribute}
          checked={item.isRefined}
          onChange={event => {
            event.preventDefault();
            refine(item.value);
          }}
        />
        <span className="ais-NumericMenu-labelText">{item.label}</span>
      </label>
    </li>
  ))}
    
  </ul>
  </div>
);

const CustomNumericMenu = connectNumericMenu(NumericMenu);

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">{APP_NAME}</a>
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
                <p className='ais-Panel-header'>ABV</p>
                <CustomNumericMenu
                  attribute="abv"
                  items={[
                    { label: '<= 4% lightweight', end: 4 },
                    { label: '4 to 7% status quo', start: 4, end: 7 },
                    { label: '>= 7% strong & boozy', start: 7 },
                  ]}
                />
                <p className='ais-Panel-header'>IBU</p>
                <CustomNumericMenu
                  attribute="ibu"
                  items={[
                    { label: '<= 10 lightweight', end: 10 },
                    { label: '10 to 40 status quo', start: 10, end: 40 },
                    { label: '>= 40 strong & hoppy', start: 40 },
                  ]}
                />
                <p className='ais-Panel-header'>SRM</p>
                <CustomNumericMenu
                  attribute="srm"
                  items={[
                    { label: '<= 10 like pilsners', end: 10 },
                    { label: '10 to 20 like amber ales', start: 10, end: 20 },
                    { label: '10 to 20 like brown ales', start: 20, end: 30 },
                    { label: '>= 30 dark like porters & stouts', start: 30 },
                  ]}
                />
                <p className='ais-Panel-header'>Malts</p>
                <RefinementList attribute="ingredients.malt.name" />
                <p className='ais-Panel-header'>Hops</p>
                <RefinementList attribute="ingredients.hops.name" />
                <p className='ais-Panel-header'>Yeasts</p>
                <RefinementList attribute="ingredients.yeast" />
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
        <i>{props.hit && props.hit.tagline}</i>
      </p>
      <p>
        <Highlight attribute="description" hit={props.hit} />
      </p>
      <p>
        <img alt="homebrew"
          className="homebrew-img" 
         src={props.hit && props.hit.image_url}/>
      </p>
      <p>
        ABV:{'  '}
        <Highlight attribute="abv" hit={props.hit} />
        %
      </p>
      <p>
        IBU:{'  '}
        <Highlight attribute="ibu" hit={props.hit} />
      </p>
      <p>
        SRM: {props.hit && props.hit.srm}
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
