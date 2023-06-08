

function getLatestCommitDate() {
    const username = 'robertjmendez';
    const token = GITHUB_TOKEN;

    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `token ${token}`
            }
        })
            .then(response => response.json())
            .then(events => {
                const pushEvent = events.find(event => event.type === 'PushEvent');

                resolve(pushEvent.created_at);
            })
            .catch(error => {
                reject(error);
            });
    });
}

getLatestCommitDate()
    .then(date => console.log(date))
    .catch(error => console.log(error));

function wait(num){

    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve()
        }, num)

    })
}

wait(1000).then(() => console.log('You\'ll see this after 1 second'));
wait(3000).then(() => console.log('You\'ll see this after 3 seconds'));