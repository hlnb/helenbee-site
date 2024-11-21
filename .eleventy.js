module.exports = function(eleventyConfig) {
    const { DateTime } = require("luxon");

    // Plugins
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-bundle"));

    // Date Filters
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

    // URL Filters
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

    // Development Server Options
    if (process.env.NODE_ENV === "development") {
        eleventyConfig.setServerOptions({
            // your server options
        });
    }

    // Collections
    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/**/*.md");
    });

    eleventyConfig.addCollection("wpPages", function(collectionApi) {
        return collectionApi.getAll().filter(item => item.data.wpPage === true);
    });

    eleventyConfig.addCollection("wpPosts", function(collectionApi) {
        return collectionApi.getAll().filter(item => item.data.type === "post");
    });

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

    // Filters
    eleventyConfig.addFilter("wpContent", function(content) {
        return content
            .replace(/\[.*?\]/g, '') // Remove shortcodes
            .replace(/<!--.*?-->/g, ''); // Remove comments
    });

    eleventyConfig.addFilter("currentYear", () => {
        return new Date().getFullYear();
    });

    eleventyConfig.addFilter("head", (array, n) => {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if( n < 0 ) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    // Shortcodes
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Passthrough Copy
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy({
        "src/img": "img",
        "src/img/*.svg": "img"
    });

    // SVG Handling
    eleventyConfig.addTemplateFormats("svg");
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

    // Add filter to get WordPress page by slug
    eleventyConfig.addFilter("getPageBySlug", (pages, slug) => {
        return pages.find(page => page.slug === slug);
    });

    // Add this to see all available data during build
    eleventyConfig.setServerOptions({
        showAllHosts: true,
        showVersion: true,
        debug: true
    });

    // Log the data directories being used
    console.log('Data Directories:', eleventyConfig.dir);

    // Add date filter
    eleventyConfig.addFilter("date", function(date, format) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    // Updated filter to handle WordPress image paths
    eleventyConfig.addFilter("cleanWpContent", (content) => {
        if (!content) return '';
        
        return content
          // Update WordPress image URLs to local paths
          .replace(/https?:\/\/[^\/]+\/wp-content\/uploads\//g, '/img/wp-content/')
          // Preserve image tags and their attributes
          .replace(/<img[^>]*src="([^"]*)"[^>]*>/g, (match, src) => {
            const alt = match.match(/alt="([^"]*)"/);
            return `<img src="${src}" ${alt ? `alt="${alt[1]}"` : 'alt=""'} class="wp-content-image">`;
          })
          // Remove other WordPress-specific classes
          .replace(/class="(?!wp-content|content|wp-content-image).*?"/g, '')
          // Remove inline styles
          .replace(/style=".*?"/g, '')
          // Remove empty paragraphs
          .replace(/<p>\s*<\/p>/g, '')
          // Clean up whitespace
          .replace(/\s+/g, ' ')
          .trim();
    });

    // Add redirects
    eleventyConfig.addPassthroughCopy({
        "src/_redirects": "_redirects"
    });

    // Pass through images
    eleventyConfig.addPassthroughCopy("src/img");

    // Add date filter
    eleventyConfig.addFilter("dateDisplay", function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    // Add writings collection instead of posts
    eleventyConfig.addCollection("writings", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/writings/*.md");
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