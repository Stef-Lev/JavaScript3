"use strict";

{

    let theRoot = document.querySelector("#root");
    let mainCont = document.querySelector(".main-container")
    let repoCont = document.querySelector(".repo-container");
    let contrCont = document.querySelector(".contributor-container");
    let repoSelect = document.querySelector("#repo-selection");

    //--OK-->
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
    //--OK--<

    //--OK-->
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
    //--OK--<


    //--OK-->
    function sortThemAll(repos) {
        repos.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    }
    //--OK--<



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
        parent.add(option);
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

            const element = createAndAppend('div', repoCont);
            sortThemAll(repos);
            for (let i = 0; i < repos.length; i++) {
                renderRepoDetails(repos[i], repoCont);
                addOptions(repos[i], parent)
            }

        });
    }


    //--OK-->
    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
    //--OK--<
}