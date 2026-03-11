import { githubService } from './dist/services/github/index.js';

async function demo() {
  console.log('🚀 GitHub MCP Server - Operation Demonstrations\n');
  console.log('=' .repeat(60));

  try {
    // 1. User Operations
    console.log('\n📝 OPERATION 1: Get Authenticated User Profile\n');
    const user = await githubService.getAuthenticatedUser();
    console.log('✅ Success!');
    console.log('   Username:', user.login);
    console.log('   Name:', user.name || 'Not set');
    console.log('   Email:', user.email || 'Not public');
    console.log('   Bio:', user.bio || 'No bio');
    console.log('   Followers:', user.followers, '  Following:', user.following);
    console.log('   Public Repos:', user.public_repos);

    // 2. List Repositories
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 2: List Your Repositories\n');
    const repos = await githubService.listRepositories({ visibility: 'all' });
    console.log(`✅ Found ${repos.length} repositories:`);
    repos.forEach((repo, index) => {
      console.log(`   ${index + 1}. ${repo.name} (${repo.private ? 'Private' : 'Public'})`);
      console.log('      Stars:', repo.stargazers_count, '  Forks:', repo.forks_count);
      console.log('      Language:', repo.language || 'Not specified');
    });

    // 3. Get Specific Repository
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 3: Get Specific Repository Details\n');
    console.log('Getting details for facebook/react...');
    const reactRepo = await githubService.getRepository({ owner: 'facebook', repo: 'react' });
    console.log('✅ Success!');
    console.log('   Name:', reactRepo.full_name);
    console.log('   Description:', reactRepo.description);
    console.log('   Stars:', reactRepo.stargazers_count.toLocaleString());
    console.log('   Forks:', reactRepo.forks_count.toLocaleString());
    console.log('   Language:', reactRepo.language);
    console.log('   Open Issues:', reactRepo.open_issues_count);
    console.log('   URL:', reactRepo.html_url);

    // 4. List Issues
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 4: List Issues in Repository\n');
    console.log('Listing open issues in facebook/react...');
    const issues = await githubService.listIssues({ owner: 'facebook', repo: 'react', state: 'open' });
    console.log(`✅ Found ${issues.length} open issues (showing first 5):`);
    issues.slice(0, 5).forEach((issue, index) => {
      console.log(`   ${index + 1}. #${issue.number}: ${issue.title}`);
      console.log('      Author:', issue.user.login, '  Comments:', issue.comments);
      console.log('      Labels:', issue.labels.map(l => l.name).join(', ') || 'No labels');
      console.log('      URL:', issue.html_url);
    });

    // 5. Get Specific Issue
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 5: Get Specific Issue Details\n');
    console.log('Getting details for issue #35976 from facebook/react...');
    const issue = await githubService.getIssue({ owner: 'facebook', repo: 'react', issue_number: 35976 });
    console.log('✅ Success!');
    console.log('   Number:', issue.number);
    console.log('   Title:', issue.title);
    console.log('   State:', issue.state);
    console.log('   Author:', issue.user.login);
    console.log('   Labels:', issue.labels.map(l => l.name).join(', '));
    console.log('   Comments:', issue.comments);
    console.log('   Created:', new Date(issue.created_at).toLocaleDateString());
    console.log('   URL:', issue.html_url);

    // 6. List Pull Requests
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 6: List Pull Requests\n');
    console.log('Listing open pull requests in facebook/react...');
    const prs = await githubService.listPullRequests({ owner: 'facebook', repo: 'react', state: 'open' });
    console.log(`✅ Found ${prs.length} open pull requests (showing first 5):`);
    prs.slice(0, 5).forEach((pr, index) => {
      console.log(`   ${index + 1}. #${pr.number}: ${pr.title}`);
      console.log('      Author:', pr.user.login);
      console.log('      Branch:', pr.head.ref, '→', pr.base.ref);
      console.log('      Review Status:', pr.mergeable_state);
      console.log('      Comments:', pr.comments);
      console.log('      URL:', pr.html_url);
    });

    // 7. Get User Profile
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 7: Get User Profile\n');
    console.log('Getting profile for torvalds...');
    const torvalds = await githubService.getUser({ username: 'torvalds' });
    console.log('✅ Success!');
    console.log('   Username:', torvalds.login);
    console.log('   Name:', torvalds.name || 'Not set');
    console.log('   Bio:', torvalds.bio || 'No bio');
    console.log('   Company:', torvalds.company || 'Not set');
    console.log('   Followers:', torvalds.followers?.toLocaleString() || 0);
    console.log('   Public Repos:', torvalds.public_repos);
    console.log('   URL:', torvalds.html_url);

    console.log('\n' + '='.repeat(60));
    console.log('\n🎉 All operations completed successfully!');
    console.log('\n💡 The GitHub MCP Server is fully functional and ready to use.');
    console.log('   You can now use these tools through your MCP client configuration.\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response?.data) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

demo();
