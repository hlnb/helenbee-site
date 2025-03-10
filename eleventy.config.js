/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = async function (eleventyConfig) {
	// add plugins and const variables
	// Dynamic imports for Eleventy and plugins
	const { DateTime } = await import("luxon");
	const markdownItAnchor = await import("markdown-it-anchor").then(
		(mod) => mod.default
	);

	const pluginRss = await import("@11ty/eleventy-plugin-rss").then(
		(mod) => mod.default
	);
	const pluginSyntaxHighlight = await import(
		"@11ty/eleventy-plugin-syntaxhighlight"
	).then((mod) => mod.default);
	const pluginBundle = await import("@11ty/eleventy-plugin-bundle").then(
		(mod) => mod.default
	);
	const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

	const pluginDrafts = await import("./eleventy.config.drafts.js").then(
		(mod) => mod.default
	);
	const pluginImages = await import("./eleventy.config.images.js").then(
		(mod) => mod.default
	);

	const { pluginNavigation } = await import("@11ty/eleventy-navigation");
	const { pluginRender } = await import("@11ty/eleventy");

	//add plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight);
	eleventyConfig.addPlugin(pluginBundle);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginRender);
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/*": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css",
	});

	eleventyConfig.addPassthroughCopy("/public/fonts/Stackyard.woff2");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 },
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "dd LLLL yyyy"
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", (collection) => {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(
			(tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
		);
	});

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1, 2, 3, 4],
			slugify: eleventyConfig.getFilter("slugify"),
		});
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return new Date().toISOString();
	});

	// Add books collection using tags
	eleventyConfig.addCollection("books", function (collectionApi) {
		const bookItems = collectionApi.getFilteredByTag("books");

		console.log("Books found:", bookItems.length);
		bookItems.forEach((book) => {
			console.log("Book:", {
				path: book.inputPath,
				title: book.data.title,
				author: book.data.author,
				dateRead: book.data.dateRead,
			});
		});

		return bookItems.sort((a, b) => {
			return new Date(b.data.dateRead) - new Date(a.data.dateRead);
		});
	});

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ["md", "njk", "html", "liquid"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "src",
			includes: "_includes",
			data: "../_data", // default: "_data"
			output: "_site",
			layouts: "_includes/layouts",
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",

		// Explicitly tell Eleventy to process books directory
		passthroughFileCopy: true,
	};
};
