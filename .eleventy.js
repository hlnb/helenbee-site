module.exports = function (eleventyConfig)
{
  eleventyConfig.addWatchTarget("./src/scss");

  eleventyConfig.addFilter("randomItem", (arr) => {
  arr.sort(() => {
    return 0.5 - Math.random();
  });
  return arr.slice(0, 1);
});
  
  return {
    dir: {
      input: "src",
      output: "public",
    }
  };

};