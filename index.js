function getRepositories() {
  const username = document.getElementById('username').value
  const url = 'https://api.github.com/users/' + username + '/repos'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", url);
  req.send();
  return false;
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
  const dataUsername = 'data-username="' + repo.owner.login + '"'
  const dataRepoName = 'data-repository="' + repo.name + '"'
  return(`<li>
          <h2>${repo.name}</h2>
          <a href="${repo.html_url}">${repo.html_url}</a><br>
          <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
          <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
        </li>`
        )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  name = el.dataset.repository
  user = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList =
  `<ul>${commits.map(commit =>
    '<li>' + commit.author.login + commit.commit.message + commit.commit.author.name + '</li>').join('')}
  </ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  name = el.dataset.repository
  user = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList =
  `<ul>${branches.map(branch =>
    '<li>' + branch.name + '</li>').join('')}
  </ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
