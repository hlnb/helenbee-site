const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig)
{
  eleventyConfig.addWatchTarget("./src/scss");

  eleventyConfig.addFilter("randomItem", (arr) => {
  arr.sort(() => {
    return 0.5 - Math.random();
  });
  return arr.slice(0, 1);
  });

  eleventyConfig.addFilter("min", function(a, b) {
    return Math.min(a, b);
  });

  eleventyConfig.addFilter("head", function(array, n) {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("getAllTags", collection => {
    let tagSet = new Set();
    for(let item of collection) {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return dateObj.toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("readableDate", (dateObj, format = "dd LLLL yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  eleventyConfig.addFilter("htmlBaseUrl", (url, baseUrl) => {
    try {
      return new URL(url, baseUrl).toString();
    } catch(e) {
      console.error("Error with URL:", url, baseUrl);
      return url;
    }
  });

  eleventyConfig.addFilter("addPathPrefixToFullUrl", (url, pathPrefix = "") => {
    if(!pathPrefix) {
      return url;
    }
    
    let normalizedUrl = url.replace(/^\//, "");
    let normalizedPathPrefix = pathPrefix.replace(/\/$/, "");
    
    return `${normalizedPathPrefix}/${normalizedUrl}`;
  });

  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    try {
      return new URL(url, base).toString();
    } catch(e) {
      console.error("Error with URL:", url, base);
      return url;
    }
  });

  eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
    if (!collection || !collection.length) {
      return null;
    }
    
    return new Date(Math.max(...collection.map(item => item.date?.getTime() || 0)));
  });

  eleventyConfig.addGlobalData("metadata", {
    url: "https://helenburgess.id.au",
    title: "Helen Burgess",
    description: "Helen Burgess is a veteran, retired web developer with a passion for passing on knowledge in her areas of interest."
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPairedShortcode("css", function(content) {
    return content;
  });

  eleventyConfig.addFilter("dateToRfc3339", (dateObj) => {
    if(!(dateObj instanceof Date)) {
      return dateObj;
    }
    return dateObj.toISOString();
  });

  eleventyConfig.addFilter("dateToRfc822", (dateObj) => {
    if(!(dateObj instanceof Date)) {
      return dateObj;
    }
    return dateObj.toUTCString();
  });

  eleventyConfig.addFilter("transformWithHtmlBase", function(content, htmlBaseUrl) {
    if(!content || !htmlBaseUrl) {
      return content;
    }

    return content.replace(/(href|src)=["']\/([^"']+)["']/g, `$1="${htmlBaseUrl}/$2"`);
  });

  eleventyConfig.addFilter("date", function(date, format) {
    return DateTime.fromJSDate(date, {
      zone: 'utc'
    }).toFormat(format || 'yyyy');
  });

  eleventyConfig.addPassthroughCopy("src/public");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addWatchTarget("src/css");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/"
  };

};