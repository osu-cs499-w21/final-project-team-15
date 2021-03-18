/**
 * Node.js API to fetch Billboard's year end charts. Adapted from https://www.npmjs.com/package/billboard-top-100.
 */

 const fetch = require('isomorphic-unfetch');
 const cheerio = require('cheerio');
 
 const BILLBOARD_BASE_URL = 'http://www.billboard.com';
 const BILLBOARD_CHARTS_URL = `${BILLBOARD_BASE_URL}/charts`;
 const BILLBOARD_YEAR_END_URL = `${BILLBOARD_CHARTS_URL}/year-end`;
 
 /**
  * Gets the title from the specified chart item
  *
  * @param {HTMLElement} chartItem - The chart item
  * @return {string} The title
  *
  * @example
  *
  *     getTitleFromYearEndChartItem(<div class="chart-list-item">...</div>) // 'The Real Slim Shady'
  */
 function getTitleFromYearEndChartItem(chartItem, $) {
   let title;
   try {
     title = $('.ye-chart-item__title', chartItem).text()
   } catch (e) {
     title = '';
   }
   return title.trim();
 }
 
 /**
  * Gets the artist from the specified chart item
  *
  * @param {HTMLElement} chartItem - The chart item
  * @return {string} The artist
  *
  * @example
  *
  *     getArtistFromYearEndChartItem(<div class="chart-list-item">...</div>) // 'Eminem'
  */
 function getArtistFromYearEndChartItem(chartItem, $) {
   let artist;
   try {
     artist = $('.ye-chart-item__artist', chartItem).text()
   } catch (e) {
     artist = '';
   }
   return artist.trim();
 }
 
 /**
  * Gets the cover from the specified chart item
  *
  * @param {HTMLElement} chartItem - The chart item
  * @param {number} rank - The rank of the chart item
  * @return {string} The cover url string
  *
  * @example
  *
  *     getCoverFromYearEndChartItem(<div class="chart-list-item">...</div>) // 'https://charts-static.billboard.com/img/2016/12/locash-53x53.jpg'
  */
 function getCoverFromYearEndChartItem(chartItem, $) {
   let image;
 
   try {
     image = $('img', chartItem).attr('srcset').split(', ')[1].split(' ')[0];
   } catch (err) {
     image = 'https://www.billboard.com/assets/1582845518/images/charts/bb-placeholder-new.jpg';
   }
   return image.trim();
 }
 
 /**
  * Gets information for specified chart and date
  *
  * @param {string} chartName - The specified chart
  * @param {string} year - Year represented as string in format 'YYYY'
  * @param {function} cb - The specified callback method
  *
  * @example
  *
  *     getYearEndChart('hot-100-songs', '2016', function(err, chart) {...})
  */
 async function getYearEndChart(name, year, cb) {
   let chartName = name;
   let chartYear = year;
   let callback = cb;
   // check if name was specified
   if (typeof name === 'function') {
     // if name not specified, default to hot-100-songs chart for last year,
     // and set callback method accordingly
     callback = name;
     chartName = 'hot-100-songs';
     chartYear = new Date().getFullYear() - 1;
     chartYear = chartYear.toString();
   }
   // check if year was specified
   if (typeof year === 'function') {
     // if year not specified, default to specified chart for last year,
     // and set callback method accordingly
     callback = year;
     chartYear = new Date().getFullYear() - 1;
     chartYear = chartYear.toString();
   }
   const chart = {};
   let html = {};
   /**
    * A song
    * @typedef {Object} Song
    * @property {string} title - The title of the song
    * @property {string} artist - The song's artist
    */
 
   /**
    * Array of songs
    */
   chart.songs = [];
   // build request URL string for specified chart and year
   const requestURL = `${BILLBOARD_YEAR_END_URL}/${chartYear}/${chartName}`;
   try {
     const res = await fetch(requestURL);
     html = await res.text();
     const $ = cheerio.load(html);
 
     // push remaining ranked songs into chart.songs array
     let chartListItems;
     chartListItems = $('.ye-chart-item__primary-row');
 
     for (let i = 0; i < chartListItems.length; i += 1) {
       chart.songs.push({
         rank: chartListItems[i].rank || (i + 1),
         title: chartListItems[i].title || getTitleFromYearEndChartItem(chartListItems[i], $),
         artist: chartListItems[i].artist_name || getArtistFromYearEndChartItem(chartListItems[i], $),
         cover: getCoverFromYearEndChartItem(chartListItems[i], $),
       });
     }
 
     // callback with chart if chart.songs array was populated
     if (chart.songs.length > 1) {
       callback(null, chart);
     } else {
       callback('Songs not found.', null);
     }
   } catch (e) {
     console.log(e);
   }
 }

 // export getYearEndChart function
module.exports = {
  getYearEndChart,
};
