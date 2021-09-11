console.log('welcome to the registration page')

var mainVm = new Vue({
    el: '#app',
    data: {
        // we'll put one object in our data object for each of our forms
        registerForm: {
            username: '',
            password: '',
        },
        loginForm: {
            username: '',
            password: '',
        }
    },
    methods: {
        register : function() {
            // we don't actually refer to the event object inside of this function, so there's no need to name the event object
            $.post('/register', this.registerForm, function(dataFromServer){
                console.log(dataFromServer)
            })
        },
        login : function() {
            // we don't actually refer to the event object inside of this function, so there's no need to name the event object
            $.post('/login', this.loginForm, function(dataFromServer){
                console.log(dataFromServer)
            })
        },
    }
})