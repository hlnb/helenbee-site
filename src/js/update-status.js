const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Fix the path to point to the correct writings directory
const writingsDir = path.join(__dirname, '../../src/writings');
// OR if your writings folder is directly in src:
// const writingsDir = path.join(__dirname, '../writings');

// Read all markdown files in the writings directory
fs.readdirSync(writingsDir).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(writingsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown } = matter(content);

    // If the file doesn't have a status, add it
    if (!data.status) {
      data.status = 'published'; // or whatever default you want
      
      // Write the file back with the new frontmatter
      const newContent = matter.stringify(markdown, data);
      fs.writeFileSync(filePath, newContent);
      console.log(`Updated status for ${file}`);
    }
  }
});
