import { githubService } from './dist/services/github/index.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function testUserOperations() {
  console.log('\n🔍 Testing User Operations...\n');
  const user = await githubService.getAuthenticatedUser();
  console.log('✅ Authenticated User:');
  console.log('   Username:', user.login);
  console.log('   Name:', user.name || 'Not set');
  console.log('   Bio:', user.bio || 'No bio');
  console.log('   Location:', user.location || 'Not set');
  console.log('   Company:', user.company || 'Not set');
  console.log('   Followers:', user.followers, '  Following:', user.following);
  console.log('   Public Repos:', user.public_repos);
  console.log('   Account Type:', user.type);
  console.log('   Created:', new Date(user.created_at).toLocaleDateString());
}

async function testRepositoryOperations() {
  console.log('\n📁 Testing Repository Operations...\n');

  // List repositories
  console.log('📝 Listing your repositories...');
  const repos = await githubService.listRepositories({ visibility: 'all' });
  console.log(`✅ Found ${repos.length} repositories:\n`);

  repos.forEach((repo, index) => {
    console.log(`   ${index + 1}. ${repo.name} (${repo.private ? 'Private' : 'Public'})`);
    console.log('      Description:', repo.description || 'No description');
    console.log('      Language:', repo.language || 'Not specified');
    console.log('      Stars:', repo.stargazers_count, '  Forks:', repo.forks_count);
    console.log('      Updated:', new Date(repo.updated_at).toLocaleDateString());
    console.log();
  });

  return repos;
}

async function testRepositoryDetails() {
  console.log('\n📄 Testing Repository Details...\n');

  const owner = await question('Enter repository owner (or press Enter for "facebook"): ');
  const repo = await question('Enter repository name (or press Enter for "react"): ');

  const finalOwner = owner || 'facebook';
  const finalRepo = repo || 'react';

  console.log(`\n📝 Getting details for ${finalOwner}/${finalRepo}...`);
  const repoDetails = await githubService.getRepository({
    owner: finalOwner,
    repo: finalRepo
  });

  console.log('✅ Repository Details:');
  console.log('   Full Name:', repoDetails.full_name);
  console.log('   Description:', repoDetails.description);
  console.log('   Language:', repoDetails.language);
  console.log('   Stars:', repoDetails.stargazers_count.toLocaleString());
  console.log('   Forks:', repoDetails.forks_count.toLocaleString());
  console.log('   Open Issues:', repoDetails.open_issues_count);
  console.log('   Watchers:', repoDetails.watchers_count);
  console.log('   Default Branch:', repoDetails.default_branch);
  console.log('   Created:', new Date(repoDetails.created_at).toLocaleDateString());
  console.log('   License:', repoDetails.license?.name || 'No license');
  console.log('   Homepage:', repoDetails.homepage || 'No homepage');
  console.log('   URL:', repoDetails.html_url);
}

async function testIssueOperations() {
  console.log('\n🎫 Testing Issue Operations...\n');

  const owner = await question('Enter repository owner (or press Enter for "facebook"): ');
  const repo = await question('Enter repository name (or press Enter for "react"): ');

  const finalOwner = owner || 'facebook';
  const finalRepo = repo || 'react';

  console.log(`\n📝 Listing issues in ${finalOwner}/${finalRepo}...`);
  const issues = await githubService.listIssues({
    owner: finalOwner,
    repo: finalRepo,
    state: 'open'
  });

  console.log(`✅ Found ${issues.length} open issues (showing first 10):\n`);

  issues.slice(0, 10).forEach((issue, index) => {
    console.log(`   ${index + 1}. #${issue.number}: ${issue.title}`);
    console.log('      Author:', issue.user.login);
    console.log('      Labels:', issue.labels.map(l => l.name).join(', ') || 'No labels');
    console.log('      Comments:', issue.comments);
    console.log('      Created:', new Date(issue.created_at).toLocaleDateString());
    console.log('      URL:', issue.html_url);
    console.log();
  });
}

async function testSpecificIssue() {
  console.log('\n🎯 Testing Specific Issue...\n');

  const owner = await question('Enter repository owner (or press Enter for "facebook"): ');
  const repo = await question('Enter repository name (or press Enter for "react"): ');
  const issueNumber = await question('Enter issue number (or press Enter for "35976"): ');

  const finalOwner = owner || 'facebook';
  const finalRepo = repo || 'react';
  const finalIssueNumber = issueNumber || '35976';

  console.log(`\n📝 Getting issue #${finalIssueNumber} from ${finalOwner}/${finalRepo}...`);
  const issue = await githubService.getIssue({
    owner: finalOwner,
    repo: finalRepo,
    issue_number: parseInt(finalIssueNumber)
  });

  console.log('✅ Issue Details:');
  console.log('   Number:', issue.number);
  console.log('   Title:', issue.title);
  console.log('   State:', issue.state);
  console.log('   Author:', issue.user.login);
  console.log('   Body:', issue.body ? issue.body.substring(0, 200) + '...' : 'No description');
  console.log('   Labels:', issue.labels.map(l => l.name).join(', ') || 'No labels');
  console.log('   Comments:', issue.comments);
  console.log('   Created:', new Date(issue.created_at).toLocaleDateString());
  console.log('   Updated:', new Date(issue.updated_at).toLocaleDateString());
  console.log('   URL:', issue.html_url);
}

async function testPullRequests() {
  console.log('\n🔄 Testing Pull Request Operations...\n');

  const owner = await question('Enter repository owner (or press Enter for "facebook"): ');
  const repo = await question('Enter repository name (or press Enter for "react"): ');

  const finalOwner = owner || 'facebook';
  const finalRepo = repo || 'react';

  console.log(`\n📝 Listing pull requests in ${finalOwner}/${finalRepo}...`);
  const prs = await githubService.listPullRequests({
    owner: finalOwner,
    repo: finalRepo,
    state: 'open'
  });

  console.log(`✅ Found ${prs.length} open pull requests (showing first 10):\n`);

  prs.slice(0, 10).forEach((pr, index) => {
    console.log(`   ${index + 1}. #${pr.number}: ${pr.title}`);
    console.log('      Author:', pr.user.login);
    console.log('      Branch:', pr.head.ref, '→', pr.base.ref);
    console.log('      Review Status:', pr.mergeable_state);
    console.log('      Comments:', pr.comments, '  Review Comments:', pr.review_comments);
    console.log('      Created:', new Date(pr.created_at).toLocaleDateString());
    console.log('      URL:', pr.html_url);
    console.log();
  });
}

async function testUserLookup() {
  console.log('\n👤 Testing User Lookup...\n');

  const username = await question('Enter GitHub username (or press Enter for "torvalds"): ');
  const finalUsername = username || 'torvalds';

  console.log(`\n📝 Getting user profile for ${finalUsername}...`);
  const user = await githubService.getUser({ username: finalUsername });

  console.log('✅ User Profile:');
  console.log('   Username:', user.login);
  console.log('   Name:', user.name || 'Not set');
  console.log('   Bio:', user.bio || 'No bio');
  console.log('   Location:', user.location || 'Not set');
  console.log('   Company:', user.company || 'Not set');
  console.log('   Followers:', user.followers?.toLocaleString() || 0, '  Following:', user.following?.toLocaleString() || 0);
  console.log('   Public Repos:', user.public_repos);
  console.log('   Account Type:', user.type);
  console.log('   URL:', user.html_url);
}

async function showMenu() {
  console.log('\n🚀 GitHub MCP Server - Test Operations Menu\n');
  console.log('1. 👤 Test User Operations (Get your profile)');
  console.log('2. 📁 Test Repository Operations (List your repos)');
  console.log('3. 📄 Test Repository Details (Get specific repo info)');
  console.log('4. 🎫 Test Issue Operations (List issues)');
  console.log('5. 🎯 Test Specific Issue (Get issue details)');
  console.log('6. 🔄 Test Pull Request Operations (List PRs)');
  console.log('7. 👥 Test User Lookup (Get any user profile)');
  console.log('8. 🎉 Run All Tests');
  console.log('9. ❌ Exit\n');
}

async function main() {
  console.log('🧪 Welcome to GitHub MCP Server Testing Suite!\n');
  console.log('This tool will help you test various GitHub operations.\n');

  while (true) {
    showMenu();
    const choice = await question('Select an operation (1-9): ');

    try {
      switch (choice.trim()) {
        case '1':
          await testUserOperations();
          break;
        case '2':
          await testRepositoryOperations();
          break;
        case '3':
          await testRepositoryDetails();
          break;
        case '4':
          await testIssueOperations();
          break;
        case '5':
          await testSpecificIssue();
          break;
        case '6':
          await testPullRequests();
          break;
        case '7':
          await testUserLookup();
          break;
        case '8':
          console.log('\n🎯 Running All Tests...\n');
          await testUserOperations();
          await testRepositoryOperations();
          await testRepositoryDetails();
          await testIssueOperations();
          await testSpecificIssue();
          await testPullRequests();
          await testUserLookup();
          console.log('\n🎉 All tests completed successfully!');
          break;
        case '9':
          console.log('\n👋 Goodbye! Thanks for testing GitHub MCP Server.\n');
          rl.close();
          return;
        default:
          console.log('\n❌ Invalid choice. Please try again.\n');
      }
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      if (error.response?.data) {
        console.error('   Details:', JSON.stringify(error.response.data, null, 2));
      }
    }

    const continueChoice = await question('\nPress Enter to continue or type "exit" to quit: ');
    if (continueChoice.toLowerCase() === 'exit') {
      break;
    }
  }

  rl.close();
  console.log('\n👋 Thanks for testing GitHub MCP Server!\n');
}

main().catch(console.error);
