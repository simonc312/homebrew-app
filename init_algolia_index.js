// For the default version
const algoliasearch = require('algoliasearch');
const data = require('punkapi-db');

const ALGOLIA_APP_ID = '<YOUR_APP_ID>';
const ALGOLIA_ADMIN_KEY = '<YOUR_ADMIN_KEY>';
const ALGOLIA_INDEX = '<YOUR_INDEX>';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

// rename id to algolia required objectID
const objects = data.map(({ id, ...rest }) => Object.assign(rest, { objectID: id }));
  
index.saveObjects(objects).then(({ objectIDs }) => {
    console.log("objectIDs: ", objectIDs);
});
  