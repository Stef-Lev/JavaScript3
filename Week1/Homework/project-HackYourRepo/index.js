'use strict';

{

    let theRoot = document.querySelector("#root")

    function fetchJSON(url, cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 299) {
                cb(null, xhr.response)
                console.log("Loaded!");
                console.log(xhr.response);
            } else {
                cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
            }
        };
        xhr.onerror = () => cb(new Error('Network request failed'));
        xhr.send();
    }

    function createAndAppend(name, parent, options = {}) {
        const elem = document.createElement(name);
        parent.appendChild(elem);
        Object.entries(options).forEach(([key, value]) => {
            if (key === 'text') {
                elem.innerHTML = value;
            } else {
                elem.setAttribute(key, value);
            }
        });
        return elem;
    }

    function sortThemAll(repos) {
        repos.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    }

    function renderRepoDetails(repo, theRoot) {
        createAndAppend('section', theRoot, {
            text: `
            <div class="prop-text">
            <p><strong>Repository: </strong></p>
            <p><strong>Description: </strong></p>
            <p><strong>Forks: </strong></p>
            <p><strong>Updated: </strong></p>
            </div>
            <div class="prop-value">
            <p><a href="${repo.html_url}">${repo.name}</a></p>
            <p>${repo.description}</p>
            <p>${repo.forks_count}</p>
            <p>${repo.updated_at.slice(8, 10)}/${repo.updated_at.slice(5, 7)}/${repo.updated_at.slice(0, 4)},${repo.updated_at.slice(12, -1)}</p>
            </div>
            `,
            class: "info-block"
        });
    }

    function main(url) {
        createAndAppend("header", theRoot, {
            text: `
            <h1>HYF Repositories</h1>
            `
        })

        fetchJSON(url, (err, repos) => {
            const root = document.getElementById('root');
            if (err) {
                createAndAppend('section', root, {
                    text: err.message,
                    class: 'alert-error',
                });
                return;
            }

            const section = createAndAppend('section', root);
            sortThemAll(repos);
            for (let i = 0; i < 10; i++) {
                renderRepoDetails(repos[i], section);
            }
        });
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
}