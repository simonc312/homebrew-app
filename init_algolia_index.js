// For the default version
const algoliasearch = require('algoliasearch');
const data = require('punkapi-db');

const ALGOLIA_APP_ID = '<YOUR_APP_ID>';
const ALGOLIA_ADMIN_KEY = '<YOUR_ADMIN_KEY>';
const ALGOLIA_INDEX = '<YOUR_INDEX>';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

const settingOptions = {
    searchableAttributes: [
        "name",
        "description", 
        "ingredients.hops.name", 
        "ingredients.malt.name",
        "ingredients.yeast",
        "method.twist",
        "first_brewed",
        "brewers_tips",
        "food_pairing",
        "abv",
        "ibu",
    ],
    attributesForFaceting: [
        "ingredients.hops.name", 
        "ingredients.malt.name",
        "ingredients.yeast",
    ],
    "minWordSizefor1Typo": 4,
    "minWordSizefor2Typos": 8,
    "hitsPerPage": 20,
    "maxValuesPerFacet": 100,
    "version": 2,
    "numericAttributesToIndex": null,
    "attributesToRetrieve": null,
    "unretrievableAttributes": null,
    "optionalWords": null,
    "attributesToSnippet": null,
    "attributesToHighlight": null,
    "paginationLimitedTo": 1000,
    "attributeForDistinct": null,
    "exactOnSingleWordQuery": "attribute",
    "ranking": [
      "typo",
      "geo",
      "words",
      "filters",
      "proximity",
      "attribute",
      "exact",
      "custom"
    ],
    "customRanking": null,
    "separatorsToIndex": "",
    "removeWordsIfNoResults": "none",
    "queryType": "prefixLast",
    "highlightPreTag": "<em>",
    "highlightPostTag": "</em>",
    "snippetEllipsisText": "",
    "alternativesAsExact": [
      "ignorePlurals",
      "singleWordSynonym"
    ]
  }
//index.getSettings().then(settings => console.log(JSON.stringify(settings, null, 2)));
// better to set settings before pushing data
index.setSettings(settingOptions).wait().then(response => {
    console.log("index.setSettings response: ", JSON.stringify(response, null, 2)); 
    // rename id to algolia required objectID
    const objects = data.map(({ id, ...rest }) => Object.assign(rest, { objectID: id }));
    
    index.saveObjects(objects).then(({ objectIDs }) => {
        console.log("index.saveObjects objectIDs: ", objectIDs);
    });
});


  