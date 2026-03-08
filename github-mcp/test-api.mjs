import { githubService } from './dist/services/github/index.js';

async function testGitHubAPI() {
  console.log('🧪 Testing GitHub MCP Server API...\n');

  try {
    // Test 1: Get authenticated user
    console.log('📝 Test 1: Getting authenticated user...');
    const user = await githubService.getAuthenticatedUser();
    console.log('✅ Success! Logged in as:', user.login);
    console.log('   Name:', user.name || 'Not set');
    console.log('   Email:', user.email || 'Not public');
    console.log('   Bio:', user.bio || 'No bio');
    console.log('   Repos:', user.public_repos, 'public repositories\n');

    // Test 2: List repositories
    console.log('📝 Test 2: Listing your repositories...');
    const repos = await githubService.listRepositories({ visibility: 'all' });
    console.log(`✅ Found ${repos.length} repositories:`);
    repos.slice(0, 5).forEach((repo, index) => {
      console.log(`   ${index + 1}. ${repo.name} (${repo.private ? 'Private' : 'Public'})`);
      console.log('      Description:', repo.description || 'No description');
      console.log('      Stars:', repo.stargazers_count, '  Forks:', repo.forks_count);
    });
    if (repos.length > 5) {
      console.log(`   ... and ${repos.length - 5} more repositories`);
    }
    console.log();

    // Test 3: Get a popular repository
    console.log('📝 Test 3: Getting Facebook React repository details...');
    const reactRepo = await githubService.getRepository({
      owner: 'facebook',
      repo: 'react'
    });
    console.log('✅ Repository details:');
    console.log('   Name:', reactRepo.full_name);
    console.log('   Description:', reactRepo.description);
    console.log('   Stars:', reactRepo.stargazers_count.toLocaleString());
    console.log('   Open Issues:', reactRepo.open_issues_count);
    console.log('   Language:', reactRepo.language);
    console.log();

    // Test 4: List issues in React repo
    console.log('📝 Test 4: Listing open issues in React repository...');
    const issues = await githubService.listIssues({
      owner: 'facebook',
      repo: 'react',
      state: 'open'
    });
    console.log(`✅ Found ${issues.length} open issues (showing first 5):`);
    issues.slice(0, 5).forEach((issue, index) => {
      console.log(`   ${index + 1}. #${issue.number}: ${issue.title}`);
      console.log('      Author:', issue.user.login, '  Comments:', issue.comments);
    });
    console.log();

    console.log('🎉 All tests passed! The GitHub MCP Server is working correctly.');
    console.log('\n💡 You can now use these tools through your MCP client configuration.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response?.data) {
      console.error('   Details:', error.response.data);
    }
  }
}

testGitHubAPI();
