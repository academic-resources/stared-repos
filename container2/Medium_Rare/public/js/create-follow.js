// const followButtons = document.querySelectorAll(".followbutton");
// console.log(followButtons);
// followButtons.forEach((button) => {
//     button.addEventListener("click", async (e) => {
//     const userId = localStorage.getItem("MEDIUM_USER_ID");
//     const authorId = e.target.id
//     console.log(authorId)
//     try {

//         const res = await fetch(`/users/${authorId}/addFollow`, {
//             method: "POST",
//             body: JSON.stringify({ userId, authorId }),
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem('MEDIUM_ACCESS_TOKEN')}`
//             }
//         });
//         if (!res.ok) {
//             throw res;
//         }
//         const data = await res.json();

//     } catch(e) {
//         console.log(e)
//     }
// })
// });
