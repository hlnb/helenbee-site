const fs = require('fs');
const path = require('path');

module.exports = function() {
  const themesPath = path.join(__dirname, '../content/themes/editorial-themes.json');
  try {
    const themesContent = fs.readFileSync(themesPath, 'utf8');
    return JSON.parse(themesContent);
  } catch (error) {
    console.error('Error loading editorial themes:', error);
    return {};
  }
}; 