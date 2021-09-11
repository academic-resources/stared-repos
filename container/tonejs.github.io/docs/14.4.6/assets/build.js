// THE SEARCH FIELD
var searchField = document.querySelector('#search');
if (searchField) {
    var elements_1 = document.querySelectorAll('#sidebar .instance');
    function testSearch(searchString) {
        elements_1.forEach(function (el) {
            if (searchString === '') {
                el.style.display = null;
            }
            else if (!el.textContent.toLowerCase().includes(searchString)) {
                el.style.display = 'none';
            }
            else {
                el.style.display = null;
            }
        });
        //check the containers
        document.querySelectorAll('#sidebar .category').forEach(function (category) {
            category.style.display = Array.from(category.querySelectorAll('.instance')).every(function (el) {
                return el.style.display === 'none';
            }) ? 'none' : null;
        });
    }
    searchField.querySelector('input').addEventListener('input', function (e) {
        var input = e.target;
        var searchString = input.value.toLowerCase().trim();
        testSearch(searchString);
    });
    searchField.querySelector('button').addEventListener('click', function () {
        //clear the value
        searchField.querySelector('input').value = '';
        testSearch('');
    });
}
//make sure you're not running an in iframe
if (window.location === window.parent.location) {
    document.querySelectorAll('.type a').forEach(function (element) {
        element.parentNode.addEventListener('mouseenter', function (e) {
            if (e instanceof MouseEvent) {
                var el = document.elementFromPoint(e.clientX, e.clientY);
                if (el.parentNode === element.parentNode) {
                    //create an iframe
                    var iframe_1 = document.createElement('iframe');
                    element.parentNode.appendChild(iframe_1);
                    iframe_1.classList.add('hover');
                    if (el.getBoundingClientRect().top < 260) {
                        iframe_1.classList.add('down');
                    }
                    iframe_1.onload = function () {
                        if (iframe_1.contentWindow.document.body.scrollHeight > 0) {
                            var iframeHeight = Math.min(iframe_1.contentWindow.document.body.scrollHeight + 10, 260);
                            iframeHeight = Math.max(iframeHeight, 100);
                            iframe_1.style.height = iframeHeight + "px";
                        }
                    };
                    iframe_1.src = element.href;
                }
            }
        });
        element.parentNode.addEventListener('mouseleave', function (e) {
            var iframe = element.parentNode.querySelector('iframe');
            if (iframe) {
                iframe.remove();
            }
        });
    });
    //make all external links open in a new page
    document.body.querySelectorAll('a').forEach(function (a) {
        var link = a.getAttribute('href');
        if (link && link.startsWith('http')) {
            a.target = '_blank';
        }
    });
}
else {
    //remove all of the internal links when it's opened as an iframe
    document.body.querySelectorAll('a').forEach(function (a) {
        if (a.target !== '_blank') {
            a.href = '#';
            a.style.pointerEvents = 'none';
        }
    });
}
