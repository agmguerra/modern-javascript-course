/**
 * Github api access function
 */
class Github {
  constructor() {
    this.clientId = 'd0ee71f15009dce8992b';
    this.clientSecret = '09da7655332e31bbaa4b474b018770120d442452';
    this.reposCount = 5;
    this.reposSort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?
      client_id=${this.clientId}&client_secret=${this.clientSecret}`);

    const profileResponse = await fetch(`https://api.github.com/users/${user}/repos?
      per_page=${this.reposCount}&sort=${this.reposSort}&client_id=${this.clientId}&client_secret=${this.clientSecret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}
