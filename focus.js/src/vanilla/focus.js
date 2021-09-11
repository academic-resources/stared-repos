/**
 * Vanilla version of script using ES5. Simply add a script tag to the page to use.
 */

(function(window) {

    /**
     * CONSTANTS
     */
    var ZOOMFACTOR = '250%'; // Default zoom factor of the image when user hovers with mouse

    /**
     * Initializes the focus object with properties and methods
     */
    function init() {
        console.log('Initializing focus.js...');
        var Focus = {};
        
        /**
         * 
         * @param {*} config - follows this structure:
         *      {
         *          elementID
         *          zoomFactor
         *      }
         */
        Focus.init = function(config) {
            elID = config.elementID;
            ZOOMFACTOR = config.zoomFactor || '250%';

            console.log(ZOOMFACTOR, config.zoomFactor);

            // Iterate over all elements in the container by class
            var container = (elID !== '') ? document.getElementById(elID) : document; // The container
            var focusImgs = container.querySelectorAll('.focus-img'); // Get all the elements in the container that support zooming

            // Add handlers for each image element
            Array.from(focusImgs).forEach(function(img) {

                // Add handler for mouse enter
                img.addEventListener('mouseenter', function(e) {
                    this.style.backgroundSize = ZOOMFACTOR; // Not even a lexical 'this' :(
                }, false);

                // Add handler for when the user moves the mouse around
                img.addEventListener('mousemove', function(e) {

                    // Get the bounding rectangle of the image (so only mouse movements inside that rectangle will register)
                    var imgDimensions = this.getBoundingClientRect();

                    // Calculate position of cursor relative to the image in pixels
                    var x = e.clientX - imgDimensions.left;
                    var y = e.clientY - imgDimensions.top;

                    // Get the position of the cursor as a percentage of the total image size
                    var percentX = Math.round(100 / (imgDimensions.width / x));
                    var percentY = Math.round(100 / (imgDimensions.height / y));

                    // Update the image background position
                    this.style.backgroundPosition = percentX + '% ' + percentY + '%';
                        
                }, false);

                // Add handler for when the user leaves
                img.addEventListener('mouseleave', function(e) {
                    this.style.backgroundPosition = 'center';
                    this.style.backgroundSize = 'cover';
                }, false);
            });
        }
        return Focus;
    }

    // Define the lib object in global scope
    if (typeof(Focus) === 'undefined')
        window.Focus = init();
    else
        console.log('focus.js has been initialized already.');

})(window); // Loads the library in window object