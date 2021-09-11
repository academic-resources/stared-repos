# IndexedDB

```js
"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2019-08-12
 *
 * @description IndexedDB All In One
 * @augments
 * @example
 * @link
 *
 */

let log = console.log;

const IndexDBDemo = (debug = false) => {
    let indexedDB = window.indexedDB || window.webkitIndexedDB;
    // let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
    // let dbVersion = 3.0;
    // let dbVersion = 2.0;
    let dbVersion = 1.0;
    let idb = ``;
    let db = ``;
    if (indexedDB) {
        // 1. create DB / read DB
        let idb_connect = indexedDB.open("xgqfrms_idb", dbVersion);
        window.idb_connect = window.idb_connect || idb_connect;
        // connect success
        idb_connect.onsuccess = function(e) {
            // 2. get db instanced
            let {
                readyState,
                error,
                source,
                transaction,
                result,
                // events: onerror/onblocked/onsucces/onupgradeneeded
            } = idb_connect;
            log("Success creating/accessing IndexedDB database", readyState);
            log(`idb_connect =`, idb_connect);
            // IDBOpenDBRequest
            idb = idb_connect.result;
            window.idb = window.idb || idb;
            log(`%c onsuccess idb =`, `color: #0f0;`, idb);
            // IDBDatabase
            let {
                name,
                version,
                objectStoreNames,
                // events: onclose/onerror/onabort/onversionchange
            } = idb;
            let length = objectStoreNames.length;
            // const storeNames = [`othersDB`, `selfDB`, `errorDB`];
            // if (!length) {
            //     storeNames.forEach(
            //         (name, i) => {
            //             let store = idb.createObjectStore(
            //                 name,
            //                 {
            //                     keyPath: "uid",
            //                 },
            //             );
            //             log(`store`, store);
            //         }
            //     );
            // } else {
            //     // exist
            // }
            idb.onclose = function(e) {
                log("onclose creating/accessing IndexedDB", e);
            };
            idb.onerror = function(e) {
                log("onerror creating/accessing IndexedDB", e);
            };
            idb.onabort = function(e) {
                log("onabort creating/accessing IndexedDB", e);
            };
            idb.onversionchange = function(e) {
                log("onversionchange creating/accessing IndexedDB", e);
                // const storeNames = [`othersDB`, `selfDB`, `errorDB`];
                // if (!length) {
                //     storeNames.forEach(
                //         (name, i) => {
                //             let store = idb.createObjectStore(
                //                 name,
                //                 {
                //                     keyPath: "uid",
                //                 },
                //             );
                //             log(`store`, store);
                //         }
                //     );
                // } else {
                //     // exist
                // }
            };
        };
        // connect erorr
        idb_connect.onerror = function(e) {
            let {
                readyState,
                error,
                source,
                transaction,
                result,
                // events: onerror/onblocked/onsucces/onupgradeneeded
            } = idb_connect;
            log("Error creating/accessing IndexedDB database", readyState, error);
        };
        // connect blocked
        idb_connect.onblocked = function(e) {
            let {
                readyState,
                error,
                source,
                transaction,
                result,
                // events: onerror/onblocked/onsucces/onupgradeneeded
            } = idb_connect;
            log("Blocked creating/accessing IndexedDB database", readyState);
        };
        // connect upgradeneeded
        idb_connect.onupgradeneeded = function(e) {
            let {
                readyState,
                error,
                source,
                transaction,
                result,
                // events: onerror/onabort/onversionchange/onclose
            } = idb_connect;
            log("Upgradeneeded & IndexedDB database", readyState);
            log(`idb_connect =`, idb_connect);
            idb = idb_connect.result;
            window.idb = window.idb || idb;
            log(`%c onupgradeneeded idb =`, `color: #f0f`, idb);
            let {
                name,
                version,
                objectStoreNames,
                // events: onclose/onerror/onabort/onversionchange
            } = idb;
            let length = objectStoreNames.length;
            const storeNames = [`othersDB`, `selfDB`, `errorDB`];
            if (!length) {
                storeNames.forEach(
                    (name, i) => {
                        let store = idb.createObjectStore(
                            name,
                            {
                                keyPath: "uid",
                            },
                        );
                        let msgIdIndex = store.createIndex("by_msgId", "msgId", {unique: true});
                        let timestampIndex = store.createIndex("by_timestamp", "timestamp");
                        if (name === `othersDB`) {
                            store.add({
                                msgId: 20190812133137,
                                timestamp: new Date().getTime(),
                                uid: 7654321,
                            })
                        }
                        log(`store`, store);
                        log(`msgIdIndex`, msgIdIndex);
                        log(`timestampIndex`, timestampIndex);
                    }
                );
            } else {
                // exist
            }
            idb.onclose = function(e) {
                log("IndexedDB onupgradeneeded onclose", idb);
            };
            idb.onerror = function(e) {
                log("IndexedDB onupgradeneeded onerror", idb);
            };
            idb.onabort = function(e) {
                log("IndexedDB onupgradeneeded onabort", idb);
            };
            idb.onversionchange = function(e) {
                log("IndexedDB onupgradeneeded onversionchange", idb);
                // const storeNames = [`othersDB`, `selfDB`, `errorDB`];
                // if (!length) {
                //     storeNames.forEach(
                //         (name, i) => {
                //             let store = idb.createObjectStore(
                //                 name,
                //                 {
                //                     keyPath: "uid",
                //                 },
                //             );
                //             log(`store`, store);
                //         }
                //     );
                // } else {
                //     // exist
                // }
            };
        };
    } else {
        alert(`your browser not support indexedDB!`);
    }
};

const idbTest = () => {
    let writerBtn = document.querySelector(`[data-dom="data-btn-write"]`);
    let readBtn = document.querySelector(`[data-dom="data-btn-read"]`);
    let textarea = document.querySelector(`#show_idb`);
    // write
    writerBtn.addEventListener(`click`, () => {
        log(`async window.idb `, window.idb);
        if (window.idb) {
            let {
                name,
                version,
                objectStoreNames,
                // events: onclose/onerror/onabort/onversionchange
            } = idb;
            let length = objectStoreNames.length;
            log(`write data to idb!`, length);
            let obj = {
                // msgId: btoa(new Date().getTime()),// base64 bug
                msgId: new Date().getTime() + 1024,
                timestamp: new Date().getTime(),
                uid: 1234567,
            };
            let options = {
                datas: [obj],
                storeName: "othersDB",
            };
            textarea.innerHTML = ``;
            textarea.value = JSON.stringify(obj, null, 4);
            writeStoreDatas(options);
        }
    });
    // read
    readBtn.addEventListener(`click`, () => {
        log(`async window.idb `, window.idb);
        if (window.idb) {
            let {
                name,
                version,
                objectStoreNames,
                error,
            } = idb;
            log(`read data from idb!`, objectStoreNames);
            let options = {
                // datas: [obj],
                indexName: "by_msgId",
                storeName: "othersDB",
            };
            let data = readStoreDatas(options);
            log(`read store data`, data);
            // textarea.innerHTML = ``;
            // textarea.value = JSON.stringify(data, null, 4);
        }
    });
};


const writeStoreDatas = (options = {}) => {
    let idb = window.idb;
    if (idb) {
        let {
            name,
            version,
            objectStoreNames,
            error,
        } = idb;
        let length = objectStoreNames.length;
        log(`writeStoreDatas `, objectStoreNames, length);
        // DOMStringList {0: "errorDB", 1: "othersDB", 2: "selfDB", length: 3} 3
        let storeNames = [...objectStoreNames];
        let {
            datas,
            storeName,
        } = options;
        if (storeNames.includes(storeName)) {
            // transaction
            let tx = idb.transaction(storeName, "readwrite");
            log(`transaction `, tx);
            // IDBTransaction
            tx.onabort = function(e) {
                log(`transaction onabort`, e);
            };
            tx.onerror = function(e) {
                log(`transaction onerror`, e);
            };
            tx.oncomplete = function(e) {
                log(`transaction oncomplete`, e);
                log(`All requests have succeeded and the transaction has committed.`);
            };
            let opened_store = tx.objectStore(storeName);
            log(`opened_store `, opened_store);
            // IDBObjectStore
            // let {
            //     autoIncrement,
            //     indexNames,
            //     keyPath,
            //     name,
            //     transaction: {
            //         db: {
            //             //
            //         },
            //         error,
            //         mode, // "readwrite"/ "readonly"
            //         objectStoreNames,
            //         // events: onabort, oncomplete, onerror
            //     },
            // } = opened_store;
            datas.forEach(obj => opened_store.put(obj));
        } else {
            alert(`no exsit this store!`);
        }
    }
};


const readStoreDatas = (options = {}, callback = (obj) => log(`read idb callback`, obj)) => {
    window.DATA = window.DATA || {};
    let result = ``;
    let idb = window.idb;
    if (idb) {
        let {
            name,
            version,
            objectStoreNames,
            error,
        } = idb;
        let length = objectStoreNames.length;
        log(`readStoreDatas `, objectStoreNames, length);
        // DOMStringList {0: "errorDB", 1: "othersDB", 2: "selfDB", length: 3} 3
        let storeNames = [...objectStoreNames];
        let {
            datas,
            storeName,
            indexName,
        } = options;
        if (storeNames.includes(storeName)) {
            // transaction
            let tx = idb.transaction(storeName, "readonly");
            log(`transaction `, tx);
            // IDBTransaction
            tx.onabort = function(e) {
                log(`transaction onabort`, e);
            };
            tx.onerror = function(e) {
                log(`transaction onerror`, e);
            };
            tx.oncomplete = function(e) {
                log(`transaction oncomplete`, e);
                log(`All requests have succeeded and the transaction has committed.`);
                // return result;
                customizeEvent(true);
            };
            let opened_store = tx.objectStore(storeName);
            log(`opened_store `, opened_store);
            let index_store = opened_store.index("by_msgId");
            log(`index_store `, index_store);
            // query
            let request = index_store.get(20190812133137);
            log(`index_store request `, request);
            request.onsuccess = function(e) {
                let matching = request.result;
                log(`index_store request matching `, matching);
                if (matching !== undefined) {
                    let {
                        uid,
                        msgId,
                        timestamp,
                    } = matching;
                    log(`A match was found.`, JSON.stringify(matching, null, 4));
                    result = matching;
                    window.DATA = matching;
                    // callback
                    callback(window.DATA);
                } else {
                    log(`No match was found.`, e);
                }
            };
            // IDBObjectStore
            // let {
            //     autoIncrement,
            //     indexNames,
            //     keyPath,
            //     name,
            //     transaction: {
            //         db: {
            //             //
            //         },
            //         error,
            //         mode, // "readwrite"/ "readonly"
            //         objectStoreNames,
            //         // events: onabort, oncomplete, onerror
            //     },
            // } = opened_store;
        } else {
            alert(`no exsit this store!`);
        }
    }
    // return result;
    setTimeout(() => {
        log(`return result `, result);
        return result;
    }, 3000);
};


const customizeEvent = (flag = false) => {
    let event = new CustomEvent("autoReadStoreData", {
        detail: {
            isFinished: flag,
        },
        bubbles: true,
        cancelable: true,
    });
    document.querySelector(`html`).dispatchEvent(event);
    log(`%c autoReadStoreData dispatchEvent`, `color: red;`, event);
};

const autoShowReadData = () => {
    let data = window.DATA || {};
    log(`read store data`, data);
    let textarea = document.querySelector(`#show_idb`);
    textarea.innerHTML = ``;
    textarea.value = JSON.stringify(data, null, 4);
};

document.addEventListener(`autoReadStoreData`, autoShowReadData, false);

window.addEventListener(`DOMContentLoaded`, (e) => {
    // log(`DOM fully loaded and parsed!`, e);
    IndexDBDemo();
    idbTest();
});

const idb_operations = (idb, datas = []) => {
    let storeWirte = (datas = []) => {
        let store = idb.createObjectStore("books", {keyPath: "isbn"});
        // create index
        let titleIndex = store.createIndex("by_title", "title", {unique: true});
        let authorIndex = store.createIndex("by_author", "author");
        // Populate with initial data.
        store.add({
            title: "Quarry Memories",
            author: "Fred",
            isbn: 123456,
        });
        store.put({
            title: "Water Buffaloes",
            author: "Fred",
            isbn: 234567,
        });
    };
    let storeUpdate = (datas = []) => {
        // transaction
        let tx = idb.transaction("books", "readwrite");
        let opened_store = tx.objectStore("books");
        opened_store.put({
            title: "Quarry Memories",
            author: "Fred",
            isbn: 123456,
        });
        opened_store.put({
            title: "Water Buffaloes",
            author: "Fred",
            isbn: 234567,
        });
        opened_store.put({
            title: "Bedrock Nights",
            author: "Barney",
            isbn: 345678,
        });
        tx.oncomplete = function() {
            log(`All requests have succeeded and the transaction has committed.`);
        };
    };
    let storeRead = (datas = []) => {
        // index & looks up
        let tx = idb.transaction("books", "readonly");
        let opened_store = tx.objectStore("books");
        let index = opened_store.index("by_title");
        // query
        let request = index.get("Bedrock Nights");
        request.onsuccess = function() {
            let matching = request.result;
            if (matching !== undefined) {
                let {
                    isbn,
                    title,
                    author,
                } = matching;
                log(`A match was found.`, isbn, title, author);
            } else {
                log(`No match was found.`);
            }
        };
    };
    return {
        storeWirte,
        storeUpdate,
        storeRead,
    };
};



```

https://codepen.io/xgqfrms/pen/KOGowq

https://codepen.io/xgqfrms/pen/zgmbGj
