let url = `https://raw.githubusercontent.com/gildata/json/master/datas/ntb-F9/csjj-old.json`;

fetch(url)
.then((response) => response.json())
.then((json)=> {
    console.log(`json = ${json}`);
    return repos = json;
})
.then((repos)=>{
    console.log(`repos = ${repos}`);
    // Object.keys(myArray).length
    console.log(`json.length = ${Object.keys(repos).length}`);
    console.log(`Button = ${repos.ToolBar.Button[0]}`);
    console.log(`Button = ${repos.ToolBar.Button[1]}`);
    // "@name"
    // @json-error.json
    let name = "@name";
    console.log(`name = ${repos.name}`);
});



url = `https://raw.githubusercontent.com/gildata/json/master/datas/ntb-F9/csjj.json`;

fetch(url)
.then((response) => response.json())
.then((json)=> {
    console.log(`json = ${json}`);
    return repos = json;
})
.then((repos)=>{
    console.log(`repos = ${repos}`);
    // Object.keys(myArray).length
    console.log(`json.length = ${Object.keys(repos).length}`);
    console.log(`Button = ${repos.ToolBar.Button[0]}`);
    console.log(`Button = ${repos.ToolBar.Button[1]}`);
    console.log(`name = ${repos.name}`);
});













url = `https://cdn.xgqfrms.xyz/json/user1.json`;

fetch(url)
.then((response) => response.json())
.then((json)=> {
    console.log(`json = ${json}`);
    return repos = json;
})
.then((repos)=>{
    console.log(`firstName = ${repos.firstName}`);
    console.log(`age = ${repos.age}`);
    console.log(`city = ${repos.address.city}`);
    console.log(`phoneNumber = ${repos.phoneNumber[0].number}`);
    console.log(`repos.length = ${repos.length}`);
});







