const svgContents = require("eleventy-plugin-svg-contents");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(svgContents);
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
	// Copy _redirects file
	eleventyConfig.addPassthroughCopy("_redirects");

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
	// Editorial Calendar Collections
	eleventyConfig.addCollection("editorial", function (collectionApi) {
		return collectionApi.getFilteredByGlob("./src/writings/*.md");
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

	// Editorial calendar collection
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

	// Add authentication check for admin pages
	eleventyConfig.addCollection("adminPages", function (collectionApi) {
		return collectionApi.getFilteredByGlob("src/admin/**/*.njk");
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
	});

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data",
		},
	};
};
