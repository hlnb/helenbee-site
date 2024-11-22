module.exports = function(eleventyConfig) {
    // Add passthrough copy for images and assets
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");

    // Add writings collection
    eleventyConfig.addCollection("writings", function(collection) {
        return collection.getFilteredByGlob("src/writings/*.md");
    });

    // Add date filters
    eleventyConfig.addFilter("dateToISO", date => {
        return date.toISOString();
    });

    eleventyConfig.addFilter("dateDisplay", date => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    // Add limit filter for collections
    eleventyConfig.addFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    // Add htmlBaseUrl filter for sitemap
  eleventyConfig.addFilter("htmlBaseUrl", function(url) {
    try {
      return new URL(url).pathname;
    } catch(e) {
      return url;
    }
  });

  // Add absolute URL filter (might be needed for sitemap)
  eleventyConfig.addFilter("absoluteUrl", function(url, base) {
    try {
      return new URL(url, base).toString();
    } catch(e) {
      return url;
    }
  });

  // Make sure your site URL is defined
  eleventyConfig.addGlobalData("metadata", {
    url: "https://helenburgess.id.au", // Replace with your site URL
    title: "Helen Burgess",
    description: "Explore Helen Bee's digital garden at helenburgess.id.au, where personal experiences, web technologies, the timeless wisdom of Adler and Stoic philosophy converge. Join a journey of self-discovery and innovation, uncovering insights off the beaten path.",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    }
  };
};