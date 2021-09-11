# Collapsible lists

> 可折叠列表

```js
    
//
```


http://code.stephenmorley.org/javascript/collapsible-lists/

# Dynamic nested `ul\li` list from `json data` using Javascript

https://gist.github.com/xgqfrms-gildata/50d9af7fe5749fe199146e4e5e2f3f1e#gistcomment-2133425


https://jsonformatter.curiousconcept.com/




```js
const data = [
    {"id": "1", "name": "name_1", "parent_id": "0", "depth": "0"},
    {"id": "2", "name": "name_2", "parent_id": "0", "depth": "0"},
    {"id": "3", "name": "name_3", "parent_id": "1", "depth": "1"},
    {"id": "4", "name": "name_4", "parent_id": "3", "depth": "2"}
];


function getMenu(parentID){
    const cc = {
        "color": "red",
        "font-size": "32px"
    };
    JSON.stringify(cc);
    // "{"color":"red","font-size":"32px"}"
    let style = `
        color: rgba(0,2555,0,0.7);
        font-size: 32px;
        border: 1px solid red;
        background: #000;
    `;
    return (
        data.filter(
            function(node){
                console.log(`%c nodes = `, `${style}`, node);
                return node.parent_id === parentID;
            }
        ).map(
            function(node){
                var exists = data.some(
                    function(childNode){
                        console.log(`%c childNode = `, `${style}`, node);
                        return childNode.parent_id === node.id;
                    }
                );
                // recursive
                /* A recursive function (DEF) is a function which either calls itself or is in a potential cycle of function calls. */
                let subMenu = exists ? `<ul> ${getMenu(node.id).join('')} </ul>` : ``;
                return `<li> ${node.name} ${subMenu} </li>`;
            }
        )
    );
}


var initLevel = 0;

var endMenu =getMenu("0");

console.log(`<ul> ${endMenu.join('')} </ul>`);


/*
<ul>
    <li> name_1
        <ul>
            <li> name_3
                <ul>
                    <li> name_4 </li>
                </ul>
            </li>
        </ul>
    </li>
    <li> name_2 </li>
</ul>
*/




```


