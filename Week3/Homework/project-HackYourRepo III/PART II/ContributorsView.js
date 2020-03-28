'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      function renderContributions(contributors, container) {
        container.innerHTML = `<p><strong>Contributions</strong></p>`;
        contributors.forEach(contrb => {
          container.innerHTML += `
            <div class="contributions">
            <img src="${contrb.avatar_url}" class="user-photo">
            <a href="${contrb.html_url}" class="contr-link">${contrb.login}</a>
            <span class="number-square">${contrb.contributions}</span>
            </div>
            <hr>
            `
        })
      }
      renderContributions(contributors, document.querySelector(".contributor-container"));
    }
  }

  window.ContributorsView = ContributorsView;
}
