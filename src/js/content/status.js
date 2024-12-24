const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function checkContentStatus() {
  const postsDir = path.join(__dirname, '../../content/posts');
  const stats = {
    published: 0,
    draft: 0,
    planning: 0,
    idea: 0,
    total: 0
  };

  function processDirectory(dir) {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
      return stats;
    }

    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        processDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(content);
        
        if (data.calendar && data.calendar.status) {
          stats[data.calendar.status]++;
          stats.total++;
        }
      }
    });
  }

  processDirectory(postsDir);
  
  // Add summary information
  stats.summary = {
    needsAttention: stats.draft + stats.planning,
    readyToPublish: stats.draft,
    inProgress: stats.planning + stats.idea
  };

  return stats;
}

module.exports = { checkContentStatus };
