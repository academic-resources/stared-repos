/* Vars */
const cart = document.getElementById('carrito');
const courses = document.getElementById('lista-cursos');
const coursesList = document.querySelector('#lista-carrito tbody');
const emptyCartBtn = document.getElementById('vaciar-carrito');

/* Listeners */
loadEventListeners();

function loadEventListeners(){
    courses.addEventListener('click', buyCourse);

    cart.addEventListener('click', removeCourse);

    emptyCartBtn.addEventListener('click', emptyCart);

    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

/* Functions */
function buyCourse(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const course = e.target.parentElement.parentElement;

        readCourseData(course);
    }
}

function readCourseData(course){
    const infoCourse = {
        imagen: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    insertShoppingCart(infoCourse);
    saveCourseLocalStorage(infoCourse);
}

function insertShoppingCart(infoCourse){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${infoCourse.imagen}" width="100px">
        </td>
        <td>${infoCourse.title}</td>
        <td>${infoCourse.price}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCourse.id}">X</a>
        </td>
        `;

    coursesList.appendChild(row);

}

function removeCourse(e){
    e.preventDefault();

    let course, courseId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }

    removeCourseLocalStorage(courseId);

}

function emptyCart(e){
    e.preventDefault();

    while(coursesList.firstChild){
        coursesList.removeChild(coursesList.firstChild);
    }

    emptyLocalStorage();

}

function emptyLocalStorage(){
    localStorage.removeItem('courses');
}

function saveCourseLocalStorage(infoCourse){
    let courses;
    courses = getCoursesLocalStorage();

    courses.push(infoCourse);

    localStorage.setItem('courses', JSON.stringify(courses));
}

function getCoursesLocalStorage(){
    let coursesLS;

    if(localStorage.getItem('courses') === null){
        coursesLS = [];
    } else {
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }

    return coursesLS;
}

function readLocalStorage(){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();

    coursesLS.forEach(function(infoCourse){
        insertShoppingCart(infoCourse);
    });
}

function removeCourseLocalStorage(courseId){
    let coursesLS = getCoursesLocalStorage();

    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === courseId){
            coursesLS.splice(index, 1);
        }
    });

    localStorage.setItem('courses', JSON.stringify(coursesLS));
}
