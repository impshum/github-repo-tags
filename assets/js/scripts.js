var github_username = 'impshum';
var github_repos = document.getElementById('github-repos');
var github_followers = document.getElementById('github-followers');
var github_tags = document.getElementById('github-tags');
var load_me_items = document.getElementsByClassName('load-me');

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

async function getJSON(url) {
  var response = await fetch(url);
  var data = await response.json()
  return data;
}

getJSON(`https://api.github.com/users/${github_username}/repos?page=1&per_page=100&sort=created`)
  .then(function(data) {
    var results = '';
    for (i = 0; i < data.length; i++) {
      item = data[i];
      name = item.name;
      name = titleCase(name.replace(/-/g, ' '));
      url = item.html_url;
      results += `<span class='tag'><a href='${url}' target='_blank'>${name}</a></span>`
    }
    github_tags.innerHTML = results;
    for (var i = 0; i < load_me_items.length; i++) {
      load_me_items[i].style.opacity = 1;
    }
  });

getJSON(`https://api.github.com/users/${github_username}`)
  .then(function(data) {
    github_repos.innerHTML = data.public_repos;
    github_followers.innerHTML = data.followers;
  });
