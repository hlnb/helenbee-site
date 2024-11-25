module.exports = function(eleventyConfig) {
    // Add passthrough copy for images and assets
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("assets");

    // Add writings collection
    eleventyConfig.addCollection("writings", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/writings/*.md");
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

  // Define the filter
  eleventyConfig.addFilter("addPathPrefixToFullUrl", function(url, prefix) {
    // Example implementation: prepend the prefix to the URL
    return prefix + url;
  });

  // Define the dateToRfc3339 filter with null check
  eleventyConfig.addFilter("dateToRfc3339", function(date) {
    if (!date) {
        return ''; // Return an empty string or a default date string if preferred
    }
    return new Date(date).toISOString();
  });

  // Define the getNewestCollectionItemDate filter with null check
  eleventyConfig.addFilter("getNewestCollectionItemDate", function(collection) {
    if (!collection || collection.length === 0) return null;
    return collection.reduce((newest, item) => {
        const itemDate = item.date ? new Date(item.date) : new Date(0);
        return itemDate > newest ? itemDate : newest;
    }, new Date(0));
  });

  // Make sure your site URL is defined
  eleventyConfig.addGlobalData("metadata", {
    url: "https://helenburgess.id.au", // Replace with your site URL
    title: "Helen Burgess",
    description: "Explore Helen Bee's digital garden at helenburgess.id.au, where personal experiences, web technologies, the timeless wisdom of Adler and Stoic philosophy converge. Join a journey of self-discovery and innovation, uncovering insights off the beaten path.",
  });

  eleventyConfig.addCollection("writingsByCategory", function(collectionApi) {
    const writings = collectionApi.getFilteredByGlob("./src/writings/*.md");
    
    // Group posts by category
    const categories = {};
    writings.forEach(post => {
        const category = post.data.category || 'uncategorized';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(post);
    });
    
    // Sort posts within each category by date
    for (let category in categories) {
        categories[category].sort((a, b) => {
            return b.date - a.date;
        });
    }
    
    return categories;
  });

  // Add year filter
  eleventyConfig.addFilter("year", () => {
    return new Date().getFullYear();
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