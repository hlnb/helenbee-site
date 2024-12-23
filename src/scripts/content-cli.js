#!/usr/bin/env node

const { generateMonthlyContentPlan, createPostFile } = require('./content/planner');
const { checkContentStatus } = require('./content/status');

const command = process.argv[2];
const year = process.argv[3];
const month = process.argv[4];

function displayHelp() {
  console.log(`
Content Planning CLI

Commands:
  plan <year> <month>  Generate content plan for specified month
  status               Check content status across all posts
  help                 Display this help message

Examples:
  npm run content:plan 2024 December
  npm run content:status
  `);
}

switch (command) {
  case 'plan':
    if (!year || !month) {
      console.error('Usage: npm run content:plan <year> <month>');
      console.error('Example: npm run content:plan 2024 December');
      process.exit(1);
    }
    const plan = generateMonthlyContentPlan(year, month);
    if (plan) {
      console.log(`\nContent Plan for ${month} ${year}:`);
      console.log('='.repeat(40));
      console.log('\nThemes:', plan.month.themes.join(', '));
      console.log('\nKeywords:', plan.month.keywords.join(', '));
      console.log('\nSuggested Posts:');
      console.log('-'.repeat(20));
      plan.suggestions.forEach((suggestion, index) => {
        console.log(`\n${index + 1}. ${suggestion.title}`);
        createPostFile(suggestion, year, month);
      });
    }
    break;

  case 'status':
    const stats = checkContentStatus();
    console.log('\nContent Status Report');
    console.log('='.repeat(40));
    console.log('\nPost Counts:');
    console.log('-'.repeat(20));
    Object.entries(stats)
      .filter(([key]) => key !== 'summary')
      .forEach(([status, count]) => {
        console.log(`${status.padEnd(15)}: ${count}`);
      });
    
    console.log('\nSummary:');
    console.log('-'.repeat(20));
    Object.entries(stats.summary).forEach(([key, value]) => {
      console.log(`${key.replace(/([A-Z])/g, ' $1').toLowerCase().padEnd(20)}: ${value}`);
    });
    break;

  case 'help':
    displayHelp();
    break;

  default:
    console.error('Unknown command. Use "plan", "status", or "help"');
    displayHelp();
    process.exit(1);
}
