let username = `xgqfrms-GitHub`;
    repo = `Node-CLI-Tools/commits`;

fetch(`https://api.github.com/users/${username}/${repo}`,{
    data: {
        client_id: '08ecc2f68d922f18800e',
        client_secret: '5846d428b5340812b76c9637eceaee979340b922'
    }
})
.then((response) => response.json())
.then((json)=> {
    console.log(`json = ${json}`);
    return repos = json;
})
.then((repos)=>{
    console.log(`repos = ${repos}`);
    console.log(`repos = ${repos.length}`);
    console.log(`repos$ 0  = ${repos[0]}`);
    console.log(`repos$ 1  = ${repos[1]}`);
    for (let i = 0; i < repos.length; i++) {
        console.log(`repos${i}  = ${repos[i]}`);
    }
});

// https://api.github.com/users/xgqfrms

// https://api.github.com/users/xgqfrms/react2 ???










