module.exports = function (eleventyConfig) {
  // eleventyConfig.addPassthroughCopy("css");
  // eleventyConfig.addPassthroughCopy("assets");
  // eleventyConfig.addPassthroughCopy("scripts");

  // Category collection
  eleventyConfig.addCollection('categories', function (collectionApi) {
    const categories = {};

    // Loop
    collectionApi.getAll().forEach((item) => {
      item.data.categories?.forEach((category) => {
        categories[category] ??= [];
        categories[category].push(item);
      });
    });
    return categories;
  });

  // Tag collection
  eleventyConfig.addCollection('tags', function (collectionApi) {
    const tags = new Set();

    // Loop
    collectionApi.getAll().forEach((item) => {
      // Check for 'tags'
      if (item.data.tags) {
        item.data.tags.forEach((tag) => {
          tags.add(tag);
        });
      }
    });

    // Convert to array
    return Array.from(tags);
  });


  return {
    dir: {
      input: "src",
      output: "www",
    },
  };
};
