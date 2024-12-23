const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function generateMonthlyContentPlan(year, month) {
  // Update path to new location
  const themesPath = path.join(__dirname, '../../content/themes/editorial-themes.json');
  const themes = JSON.parse(fs.readFileSync(themesPath, 'utf8'));
  
  // Get month themes
  const yearData = themes[year];
  if (!yearData) {
    console.error(`No themes found for year ${year}`);
    return null;
  }

  const monthData = yearData.months.find(m => m.name.toLowerCase() === month.toLowerCase());
  if (!monthData) {
    console.error(`No themes found for ${month} ${year}`);
    return null;
  }

  // Generate content suggestions
  const suggestions = monthData.contentThemes.map(theme => ({
    title: `Draft: ${theme}`,
    calendar: {
      status: 'idea',
      proposedDate: null,
      theme: monthData.theme,
      contentTheme: theme,
      keywords: monthData.keywords,
      type: 'article'
    }
  }));

  return {
    month: monthData,
    suggestions: suggestions
  };
}

function createPostFile(suggestion, year, month) {
  const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
  const monthFolder = `${monthNum.toString().padStart(2, '0')}-${month.toLowerCase()}`;
  const postsDir = path.join(__dirname, `../../content/posts/${year}/${monthFolder}`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  // Create slug from title
  const slug = suggestion.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const filePath = path.join(postsDir, `${year}-${monthNum.toString().padStart(2, '0')}-${slug}.md`);
  
  // Create frontmatter
  const postContent = matter.stringify('', {
    title: suggestion.title,
    date: new Date().toISOString(),
    calendar: suggestion.calendar
  });

  fs.writeFileSync(filePath, postContent);
  console.log(`Created post: ${filePath}`);
}

module.exports = { generateMonthlyContentPlan, createPostFile };
