"use strict";

{

    let theRoot = document.querySelector("#root");
    let repoCont = document.querySelector(".repo-container");
    let contrCont = document.querySelector(".contributor-container");
    let displayed = 0;


    function fetchJSON(url, cb) {
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    return cb(new Error(`Network error: ${response.status} - ${response.statusText}`))
                }
                return response.json();
            })
            .then(data => {
                console.log("Loaded!", data);
                cb(false, data);
            })
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

    function renderRepoDetails(repo, parent) {
        createAndAppend('div', parent, {
            text: `
            <p class="property"><strong>Repository: </strong></p>
            <p class="value"><a href="${repo.html_url}">${repo.name}</a></p>
            <p class="property"><strong>Description: </strong></p>
            <p class="value">${repo.description}</p>
            <p class="property"><strong>Forks: </strong></p>
            <p class="value">${repo.forks_count}</p>
            <p class="property"><strong>Updated: </strong></p>
            <p class="value">${repo.updated_at.slice(8, 10)}/${repo.updated_at.slice(5, 7)}/${repo.updated_at.slice(0, 4)}, ${repo.updated_at.slice(12, -1)}</p>
            `,
            class: "info-block"
        });
    }

    function addOptions(repo, parent) {
        parent = document.querySelector("#repo-selection");
        let option = document.createElement("option");
        option.innerHTML = repo.name;
        option.value = repo.name;
        parent.add(option);
    }

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

    function deleteElement(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.firstChild)
        }
    }

    function main(url) {
        createAndAppend("header", theRoot, {
            text: `
            <h1>Test</h1>
            <select id="repo-selection">
            </select>
            `,
            class: "header-content"
        });

        fetchJSON(url, (err, repos) => {
            if (err) {
                createAndAppend('div', theRoot, {
                    text: err.message,
                    class: 'alert-error',
                });
                return;
            }

            sortThemAll(repos);
            for (let i = 0; i < repos.length; i++) {
                addOptions(repos[i], parent);
            }
            let repoSelect = document.querySelector("#repo-selection");
            repoSelect.value = repos[displayed].name;
            renderRepoDetails(repos[displayed], repoCont);

            fetchJSON(repos[displayed].contributors_url, (err, contributors) => {
                if (err) {
                    createAndAppend('div', theRoot, {
                        text: err.message,
                        class: 'alert-error',
                    });
                    return;
                }

                createAndAppend("div", contrCont);
                renderContributions(contributors, contrCont);
            });
            repoSelect.addEventListener("change", () => {
                repos.forEach(repo => {
                    if (repo.name === repoSelect.value) { displayed = repos.indexOf(repo) }
                })
                let header = document.querySelector("header");
                deleteElement(repoCont);
                deleteElement(theRoot);
                main(HYF_REPOS_URL);
            })
        });
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);

}