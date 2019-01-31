'use strict';


function getGitHubRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;

    const options = {
        headers: new Headers({
            Accept: 'application/vnd.github.v3+json'})
    };

    console.log(`Finding repos for ${username}`);
    fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            $('.repo-list').empty();
            data.forEach(obj =>
                $('.repo-list').append(`<li><a href='${obj.svn_url}'>${obj.name}</a></li>`)
                );
                $('username').text(`${username}`)
                $('.results').removeClass('hidden');
        })
        .catch(error => {
            $('.js-error-message').text(`Something went wrong: ${error.message}`);
        });
    
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let username = $('.username-input').val();
        $('.results').empty;
        getGitHubRepos(username);
    });
}

$(function() {
    console.log('App loaded! Waiting on submission');
    watchForm();
});