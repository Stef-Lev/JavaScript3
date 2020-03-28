'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      function renderRepoDetails(repo, parent) {
        parent.innerHTML = `
            <div class="info-block">
            <p class="property"><strong>Repository: </strong></p>
            <p class="value"><a href="${repo.html_url}">${repo.name}</a></p>
            <p class="property"><strong>Description: </strong></p>
            <p class="value">${repo.description}</p>
            <p class="property"><strong>Forks: </strong></p>
            <p class="value">${repo.forks_count}</p>
            <p class="property"><strong>Updated: </strong></p>
            <p class="value">${repo.updated_at.slice(8, 10)}/${repo.updated_at.slice(5, 7)}/${repo.updated_at.slice(0, 4)}, ${repo.updated_at.slice(12, -1)}</p>
            </div>
            `;
      }
      let parent = document.querySelector(".repo-container");
      renderRepoDetails(repo, parent);
    }
  }

  window.RepoView = RepoView;
}
