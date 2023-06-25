let userNameInput = document.querySelector("#input .container input");
let getRepos = document.querySelector("#input .container button ");
let inputValue = userNameInput.value.trim("");
let accountName = document.querySelector("#user .container .name");
let userName = document.querySelector("#user .container .username");
let userAvatar = document.querySelector("#user .container .avatar img");
let following = document.querySelector("#user .container .following");
let follower = document.querySelector("#user .container .followers");
let accountURL = document.querySelector("#user .container span .visit");
accountURL.setAttribute(`target`, `_blank`);
let userSec = document.querySelector("#user");
let reposSec = document.querySelector("#repos");

getRepos.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(userNameInput.value.trim(""));
    userSec.style.display = "block";
    reposSec.innerHTML = "";
    showRepos();
    userNameInput.value = "";
});
userNameInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log(userNameInput.value.trim(""));
    userSec.style.display = "block";
    reposSec.innerHTML = "";
    showRepos();
    userNameInput.value = "";
  }
});

function showRepos() {
  fetch(`https://api.github.com/users/${userNameInput.value.trim("")}`)
    .then((user) => {
      return user.json();
    })
    .then((user) => {
      userAvatar.src = user.avatar_url;

      accountName.textContent = user.name;
      userName.textContent = user.login;

      following.textContent = `${user.following} Following`;
      follower.textContent = `${user.followers} follower`;
      accountURL.href = user.html_url;
    });

  fetch(`https://api.github.com/users/${userNameInput.value.trim("")}/repos`)
    .then((repos) => {
      return repos.json();
    })
    .then((repos) => {
      let container = document.createElement("div");
      container.className = "container";

      repos.forEach((repo) => {
        let repoDiv = document.createElement("div");
        repoDiv.className = "repo";
        repoDiv.innerHTML = `
        <div class="repo-name">${repo.name}</div>
        <div>
          <div class="content">
            <span class="stars">
              <span>${repo.stargazers_count}</span>
              <i class="filled fa-solid fa-star"></i>
            </span>
            <span class="watching">
              <span>${repo.watchers}</span>
              <i class="eye fa-solid fa-eye"></i>
            </span>
            <span>
              <a href="${repo.html_url}" class="visit">
                <span>Visit</span>
                <i class="fa-regular fa-arrow-up-right-from-square fa-lg"></i>
              </a>
            </span>
          </div>
        </div>
      `;

        container.appendChild(repoDiv);
      });
      reposSec.appendChild(container);
    });
}
