const svgContents = require("eleventy-plugin-svg-contents");
const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRSS = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig)
{
	eleventyConfig.addPlugin(pluginRSS);

	eleventyConfig.addPlugin(svgContents);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	// Add passthrough copy for images and assets
	eleventyConfig.addPassthroughCopy({ assets: "assets" });
	eleventyConfig.addPassthroughCopy("assets/images/other");
	eleventyConfig.addPassthroughCopy("assets/fonts");
	eleventyConfig.addPassthroughCopy("assets/fonts/stackyard");
	eleventyConfig.addPassthroughCopy("assets/fonts/typewriter");
	eleventyConfig.addPassthroughCopy("assets/js");
	eleventyConfig.addPassthroughCopy("assets/css");
	eleventyConfig.addPassthroughCopy("assets/svg");
	eleventyConfig.addPassthroughCopy("assets/icons");
	eleventyConfig.addPassthroughCopy("assets/favicon");
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("public");
	// Add passthrough for webp images
	eleventyConfig.addPassthroughCopy("assets/images/other/*.webp");
	// Copy _redirects file
	eleventyConfig.addPassthroughCopy("_redirects");
	// Add this line
	eleventyConfig.addPassthroughCopy("src/site.webmanifest");

	// Add this to properly serve static assets
	eleventyConfig.addPassthroughCopy("assets");

	// If you're using other static assets, make sure they're included too
	eleventyConfig.addPassthroughCopy("src/assets");


	//add writings collection
	eleventyConfig.addCollection("allPosts", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob([
				"src/writings/**/**/*.md",
				"src/content/posts/**/**/*.md",
			])
			.map((post) => {
				// Adjust the URL to use "writings" instead of "posts"
				if (post.inputPath.includes("content/posts")) {
					post.url = post.url.replace("/content/posts/", "/writings/");
				}
				return post;
			})
			.sort((a, b) => b.date - a.date);
	});

	// Dedicated writings collection for CloudCannon
	eleventyConfig.addCollection("writings", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob("src/writings/**/*.md")
			.sort((a, b) => b.date - a.date);
	});




// Add a collection for the latest 3 published posts
eleventyConfig.addCollection("latestPosts", function (collectionApi) {
  return collectionApi
    .getFilteredByGlob([
      "src/writings/**/**/*.md",
      "src/content/posts/**/**/*.md",
    ])
    .filter(post => post.data.status === "published" || !post.data.status) // Only published or no status
    .sort((a, b) => b.date - a.date)
    .slice(0, 3);
});
	// newletter posts collection
eleventyConfig.addCollection("newsletterPosts", function (collectionApi) {
  return collectionApi.getFilteredByTag("allPosts").filter(post => post.data.newsletter === true);
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

	eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

	// Add limit filter for collections
	eleventyConfig.addFilter("limit", function (array, limit) {
		return array.slice(0, limit);
	});

	// Add htmlBaseUrl filter for sitemap
	eleventyConfig.addFilter("htmlBaseUrl", function (url) {
		try {
			return new URL(url).pathname;
		} catch (e) {
			return url;
		}
	});

	// Add absolute URL filter (might be needed for sitemap)
	eleventyConfig.addFilter("absoluteUrl", function (url, base) {
		try {
			return new URL(url, base).toString();
		} catch (e) {
			return url;
		}
	});

	// Define the filter
	eleventyConfig.addFilter("addPathPrefixToFullUrl", function (url, prefix) {
		// Example implementation: prepend the prefix to the URL
		return prefix + url;
	});

	// Make sure your site URL is defined
	eleventyConfig.addGlobalData("metadata", {
		url: "https://helenburgess.id.au", // Replace with your site URL
		title: "Helen Burgess",
		description:
			"Explore Helen Bee's digital garden at helenburgess.id.au, where personal experiences, web technologies, the timeless wisdom of Adler and Stoic philosophy converge. Join a journey of self-discovery and innovation, uncovering insights off the beaten path.",
	});
	// Define the getNewestCollectionItemDate filter with null check
	eleventyConfig.addFilter(
		"getNewestCollectionItemDate",
		function (collection) {
			if (!collection || collection.length === 0) return null;
			return collection.reduce((newest, item) => {
				const itemDate = item.date ? new Date(item.date) : new Date(0);
				return itemDate > newest ? itemDate : newest;
			}, new Date(0));
		}
	);

	eleventyConfig.addCollection("writingsByCategory", function (collectionApi) {
		const writings = collectionApi.getFilteredByGlob("./src/writings/**/*.md"); // Match all subdirectories

		// Filter only articles with the status of 'published'
		const filteredWritings = writings.filter(
			(item) => item.data.status === "published"
		);

		// Group posts by category
		const categories = {};
		writings.forEach((post) => {
			const category = post.data.category || "uncategorized";
			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(post);
		});

		// Sort posts within each category by date
		for (let category in categories) {
			categories[category].sort((a, b) => b.date - a.date);
		}

		return categories;
	});

	eleventyConfig.addCollection("byYear", function (collectionApi) {
		const posts = collectionApi
			.getAll()
			.filter((item) => item.inputPath.includes("writings/"));

		const postsByYear = {};

		posts.forEach((post) => {
			const year = post.date.getFullYear();
			if (!postsByYear[year]) {
				postsByYear[year] = [];
			}
			postsByYear[year].push(post);
		});

		return postsByYear;
	});

	eleventyConfig.addCollection("byMonth", function (collectionApi) {
		const posts = collectionApi
			.getAll()
			.filter((item) => item.inputPath.includes("writings/"));

		const postsByMonth = {};

		posts.forEach((post) => {
			const year = post.date.getFullYear();
			const month = String(post.date.getMonth() + 1).padStart(2, "0");
			const yearMonth = `${year}/${month}`;

			if (!postsByMonth[yearMonth]) {
				postsByMonth[yearMonth] = [];
			}
			postsByMonth[yearMonth].push(post);
		});

		return postsByMonth;
	});

	// Helper functions
	eleventyConfig.addFilter("getTheme", function (date, themes) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		return themes[year]?.months[month];
	});

	eleventyConfig.addFilter("getYearTheme", function (year, themes) {
		return themes[year]?.yearly;
	});

	eleventyConfig.addFilter("formatYearMonth", function (yearMonth) {
		const [year, month] = yearMonth.split("/");
		const date = new Date(year, parseInt(month) - 1);
		return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
	});

	eleventyConfig.addFilter("getStatus", function (status, statuses) {
		// Implementation
	});

	eleventyConfig.addFilter("dateFilter", function (date) {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});

	// Add status-based collections
	eleventyConfig.addCollection("published", function (collectionApi) {
		return collectionApi
			.getAll()
			.filter((item) => item.data.status === "published")
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection("drafts", function (collectionApi) {
		return collectionApi
			.getAll()
			.filter((item) => item.data.status === "draft")
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection("planned", function (collectionApi) {
		return collectionApi
			.getAll()
			.filter((item) => item.data.status === "planned")
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection("review", function (collectionApi) {
		return collectionApi
			.getAll()
			.filter((item) => item.data.status === "review")
			.sort((a, b) => b.date - a.date);
	});

	// Add keys filter
	eleventyConfig.addFilter("keys", (obj) => {
		if (typeof obj !== "object" || obj === null) {
			return [];
		}
		return Object.keys(obj);
	});

	// Add monthsInYear filter
	eleventyConfig.addFilter("monthsInYear", (months, year) => {
		if (typeof months !== "object" || months === null) {
			return [];
		}
		return Object.keys(months)
			.filter((month) => month.startsWith(year))
			.sort()
			.reverse();
	});

	// Add startsWith filter
	eleventyConfig.addFilter("startsWith", (str, search) => {
		if (typeof str !== "string") {
			return false;
		}
		return str.startsWith(search);
	});

	// Add sorted year collection
	eleventyConfig.addCollection("yearsSorted", function (collectionApi) {
		const posts = collectionApi.getAll();
		const years = {};

		posts.forEach((post) => {
			const year = post.date.getFullYear().toString();
			if (!years[year]) {
				years[year] = [];
			}
			years[year].push(post);
		});

		// Convert to array and sort in reverse
		return Object.keys(years).sort().reverse();
	});

	// Add sorted months collection
	eleventyConfig.addCollection("monthsSorted", function (collectionApi) {
		const posts = collectionApi.getAll();
		const months = {};

		posts.forEach((post) => {
			const year = post.date.getFullYear();
			const month = (post.date.getMonth() + 1).toString().padStart(2, "0");
			const key = `${year}/${month}`;

			if (!months[key]) {
				months[key] = [];
			}
			months[key].push(post);
		});

		return months;
	});

	// Status filter
	eleventyConfig.addFilter("byStatus", function (collection, status) {
		return collection.filter(
			(item) => item.data.calendar && item.data.calendar.status === status
		);
	});

	// Month grouping
	eleventyConfig.addFilter("byMonth", function (collection, yearMonth) {
		return collection.filter((item) => {
			const date = new Date(item.data.calendar?.proposedDate || item.date);
			return (
				`${date.getFullYear()}/${(date.getMonth() + 1)
					.toString()
					.padStart(2, "0")}` === yearMonth
			);
		});
	});

	// Date formatting filter
	eleventyConfig.addFilter("formatDate", function (date) {
		return new Date(date).toLocaleDateString("en-AU", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});

	// Add a collection for all articles
	eleventyConfig.addCollection("allArticles", function (collectionApi) {
		// Get all articles from both directories
		const posts = collectionApi.getFilteredByGlob("content/posts/**/*.md");
		const writings = collectionApi.getFilteredByGlob("writings/**/*.md");

		// Merge and sort by date
		return [...posts, ...writings].sort((a, b) => {
			return a.date - b.date;
		});
	});

	eleventyConfig.addLiquidFilter("htmlDateString", function (value) {
		return value.toISOString().split("T")[0];
	});

	eleventyConfig.addLiquidFilter("readableDate", function (value) {
		return value.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});

	// Format for the datetime attribute
	eleventyConfig.addFilter("formatDate", function (date) {
		return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
	});

	// Format for display
	eleventyConfig.addFilter("readableDate", function (date) {
		return DateTime.fromJSDate(date).toFormat("MMMM d, yyyy");
	});

	// Add as global data
	eleventyConfig.addGlobalData("siteUrl", "https://helenburgess.id.au");

	eleventyConfig.addGlobalData("site", {
		name: "Helen Burgess",
		description: "Personal website and blog of Helen Burgess",
		defaultImage:
			"/assets/images/other/pereanu-sebastian-qFH7-yKoxik-unsplash.jpg",
		currentYear: new Date().getFullYear(),
		author: {
			name: "Helen Burgess",
			email: "helen@helenburgess.id.au",
			url: "https://helenburgess.id.au",
		},
	});

	eleventyConfig.addFilter("scheduled", function (collection) {
		console.log("\n\n=== SCHEDULER DEBUG ===");

		const now = new Date();
		now.setHours(0, 0, 0, 0);

		const filtered = collection.filter((post) => {
			if (!post.data.publishedDate) {
				console.log("Post with no publishedDate:", post.data.title);
				return true;
			}

			const postDate = new Date(post.data.publishedDate);
			postDate.setHours(0, 0, 0, 0);

			const shouldShow = postDate <= now;

			console.log({
				title: post.data.title,
				publishedDate: post.data.publishedDate,
				shouldShow: shouldShow,
			});

			return shouldShow;
		});

		console.log("Total posts:", collection.length);
		console.log("Filtered posts:", filtered.length);
		console.log("=== END SCHEDULER DEBUG ===\n\n");

		return filtered;
	});

	// Add this filter to provide current date to templates
	eleventyConfig.addShortcode("now", () => {
		return new Date().toISOString().slice(0, 10); // Returns YYYY-MM-DD
	});

	// Format date for comparison
	eleventyConfig.addFilter("formatDate", function (date) {
		if (!date) return "";

		try {
			// Handle string dates
			const cleanDate = typeof date === "string" ? date.trim() : date;
			const parsedDate = new Date(cleanDate);

			// Check if date is valid
			if (isNaN(parsedDate.getTime())) {
				console.log("Invalid date:", date);
				return "";
			}

			return parsedDate.toISOString().slice(0, 10);
		} catch (e) {
			console.log("Error parsing date:", date, e);
			return "";
		}
	});

	// Current date that returns the actual current date
	eleventyConfig.addGlobalData("currentDate", () => {
		const today = new Date();
		// Set to current date at midnight UTC
		today.setUTCHours(0, 0, 0, 0);
		return today.toISOString().slice(0, 10);
	});

	// Readable date filter (e.g., "13 December 2023")
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
			"dd LLLL yyyy"
		);
	});

	// HTML date string filter (e.g., "2023-12-13")
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	eleventyConfig.addFilter("readingTime", (text) => {
		const wordsPerMinute = 200;
		const words = text.split(" ").length;
		return Math.ceil(words / wordsPerMinute);
	});

	// Update the books collection name if you want
	eleventyConfig.addCollection("reading", function (collectionApi) {
		return collectionApi.getFilteredByGlob("src/books/**/*.md");
	});

	// Be explicit about CSS files
	eleventyConfig.addPassthroughCopy({
		"assets/css": "assets/css",
	});

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
		},
		templateFormats: ["md", "njk", "html"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
	};
};
