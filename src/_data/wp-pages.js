module.exports = async function() {
  // Your WordPress JSON data
  const pages = [/* your JSON data */];

  return pages.map(page => ({
    id: page.id,
    title: page.title.rendered,
    content: page.content.rendered,
    slug: page.slug,
    date: page.date,
    modified: page.modified
  }));
}; 