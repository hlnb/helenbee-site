module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-bundle"));
    
    const { DateTime } = require("luxon");

    eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
        if (!collection || !collection.length) {
            return new Date();
        }

        return collection.reduce((acc, curr) => {
            const currDate = curr.date || curr.data.date;
            return currDate > acc ? currDate : acc;
        }, collection[0].date || collection[0].data.date);
    });

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        return dateObj.toISOString().split('T')[0];
    });

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
    });

    eleventyConfig.addFilter("dateToRfc3339", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toISO();
    });

    eleventyConfig.addFilter("htmlBaseUrl", (url, baseUrl) => {
        if(!url) {
            return baseUrl;
        }
        return (new URL(url, baseUrl)).toString();
    });

    eleventyConfig.addFilter("addPathPrefixToFullUrl", (url, pathPrefix) => {
        if(!url || !pathPrefix) {
            return url;
        }
        let urlObject = new URL(url);
        urlObject.pathname = pathPrefix + urlObject.pathname;
        return urlObject.toString();
    });

    eleventyConfig.addFilter("transformWithHtmlBase", function(content, htmlBaseUrl) {
        if(!content || !htmlBaseUrl) {
            return content;
        }

        return content.replace(/(href|src)="\//g, `$1="${htmlBaseUrl}/`);
    });

    // Only include dev server in development
    if (process.env.NODE_ENV === "development") {
        eleventyConfig.setServerOptions({
            // your server options
        });
    }

    // Add a posts collection if you don't have one
    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/posts/**/*.md");
    });

    // Copy the images directory to _site
    eleventyConfig.addPassthroughCopy({
        "src/img": "img",
        "src/img/*.svg": "img"  // Explicitly include SVG files
    });

    // Add SVG content type
    eleventyConfig.addTemplateFormats("svg");
    
    // Optional: Add SVG as a valid template format
    eleventyConfig.addExtension("svg", {
        read: false,
        getData: false,
        getInstanceFromInputPath: function(inputPath) {
            return {
                inputPath: inputPath,
                filePathStem: inputPath.replace(/\.svg$/, ""),
                fileSlug: inputPath.split("/").pop().replace(/\.svg$/, ""),
            };
        },
        compile: function(str, inputPath) {
            return function(data) {
                return str;
            };
        }
    });

    // Copy the CSS directory to _site
    eleventyConfig.addPassthroughCopy("src/css");

    // Copy the fonts directory
    eleventyConfig.addPassthroughCopy("src/fonts");

    // Get tags from posts
    eleventyConfig.addCollection("tagList", function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(item => {
            if (!item.data.tags) return;
            let tags = item.data.tags;
            if (typeof tags === "string") {
                tags = [tags];
            }
            tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    });

    // Clean the _site directory before building
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");

    // Add helper functions
    eleventyConfig.addFilter("currentYear", () => {
        return new Date().getFullYear();
    });

    // Add shortcode for current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Add head filter for arrays
    eleventyConfig.addFilter("head", (array, n) => {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if( n < 0 ) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_includes/layouts",
            data: "_data",
            output: "_site"
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};