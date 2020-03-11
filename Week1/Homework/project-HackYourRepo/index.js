'use strict';

{

    let block = document.querySelector(".info-block")
    let theRoot = document.querySelector("#root")

    function fetchJSON(url, cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 299) {
                cb(null, xhr.response)
                console.log("Loaded!");
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
                elem.textContent = value;
                console.log(value)
            } else {
                elem.setAttribute(key, value);
            }
        });
        return elem;
    }

    function renderRepoDetails(repo, ul) {
        createAndAppend('div', theRoot, { text: repo.name });

    }

    function main(url) {
        fetchJSON(url, (err, repos) => {
            const root = document.getElementById('root');
            if (err) {
                createAndAppend('div', root, {
                    text: err.message,
                    class: 'alert-error',
                });
                return;
            }

            const p = createAndAppend('div', root);
            repos.forEach(repo => renderRepoDetails(repo, p));
        });
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
}