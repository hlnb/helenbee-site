const eleventyNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/elevently-plugin-rss");
module.exports = function (eleventyConfig) {
	//add plugins
	eleventyConfig.addPlugin(eleventyNavigation);
  eleventyConfig.addPlugin(pluginRss);

	//add passthroughs
	eleventyConfig.addPassthroughCopy("assets/images");
	eleventyConfig.addPassthroughCopy("assets/fonts");
	eleventyConfig.addPassthroughCopy("assets/js");
	eleventyConfig.addPassthroughCopy("assets/css");
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("public");

	eleventyConfig.addCollection("allPosts", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob(["src/writings/**/*.md", "src/content/posts/**/*.md"])
			.map((post) => {
				// Adjust the URL to use "writings" instead of "posts"
				if (post.inputPath.includes("content/posts")) {
					post.url = post.url.replace("/content/posts/", "/writings/");
				}
				return post;
			})
			.sort((a, b) => b.date - a.date);
	});

	// Consolidated Date Filters
	eleventyConfig.addFilter("dateToISO", (date) => {
		if (date === "now") {
			date = new Date();
		} else if (typeof date === "string" || !(date instanceof Date)) {
			date = new Date(date);
		}
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toISOString();
	});

	eleventyConfig.addFilter("dateDisplay", (date) => {
		if (date === "now") {
			date = new Date();
		} else if (typeof date === "string" || !(date instanceof Date)) {
			date = new Date(date);
		}
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});

	eleventyConfig.addFilter("dateToRfc3339", (date) => {
		if (date === "now") {
			date = new Date();
		} else if (typeof date === "string" || !(date instanceof Date)) {
			date = new Date(date);
		}

		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toISOString();
	});

	eleventyConfig.addFilter("formatDate", (date) => {
		if (!date) {
			return "Invalid Date";
		}
		if (!(date instanceof Date)) {
			date = new Date(date);
		}
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toLocaleDateString("en-AU", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});

	eleventyConfig.addFilter("year", () => {
		return new Date().getFullYear();
	});

	// Filter to get the base URL for a sitemap
	eleventyConfig.addFilter("htmlBaseUrl", function (url) {
		try {
			return new URL(url).pathname;
		} catch (e) {
			return url; // Return the original URL if parsing fails
		}
	});

	// Filter to construct an absolute URL
	eleventyConfig.addFilter("absoluteUrl", function (url, base) {
		try {
			return new URL(url, base).toString();
		} catch (e) {
			return url; // Return the original URL if parsing fails
		}
	});

	// Filter to add a prefix to a full URL
	eleventyConfig.addFilter("addPathPrefixToFullUrl", function (url, prefix) {
		if (!url || !prefix) {
			return url; // Return the original URL if either is missing
		}
		// Ensure the prefix ends with a slash if it doesn't already
		if (!prefix.endsWith("/")) {
			prefix += "/";
		}
		// Remove leading slash from URL if present
		if (url.startsWith("/")) {
			url = url.substring(1);
		}
		return prefix + url;
	});

	//collection for writings by status
	eleventyConfig.addCollection("drafts", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob("./src/writings/*.md")
			.filter((item) => item.data.status === "draft");
	});
	eleventyConfig.addCollection("ideas", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob("./src/writings/*.md")
			.filter((item) => item.data.status === "idea");
	});
	eleventyConfig.addCollection("published", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob("./src/writings/*.md")
			.filter((item) => item.data.status === "published");
	});
	eleventyConfig.addCollection("archived", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob("./src/writings/*.md")
			.filter((item) => item.data.status === "archived");
	});

	eleventyConfig.addCollection("editorialCalendar", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob(["src/writings/**/*.md", "src/content/posts/**/*.md"])
			.filter((item) => item.data.calendar)
			.sort((a, b) => {
				const dateA = new Date(a.data.calendar?.proposedDate || a.date);
				const dateB = new Date(b.data.calendar?.proposedDate || b.date);
				return dateA - dateB;
			});
	});

	eleventyConfig.addCollection("writings", function (collectionApi) {
		return collectionApi.getFilteredByGlob([
			"src/writings/**/*.md",
			"src/content/posts/**/*.md",
		]);
	});

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data",
		},
		passthroughFileCopy: true,
	};
};
