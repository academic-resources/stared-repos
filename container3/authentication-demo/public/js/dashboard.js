console.log('welcome to the registration page')

var mainVm = new Vue({
    el: '#app',
    data: {
        username: '',
    },
    methods: {
        whoAmI : function() {
            $.get('/who-am-i', function(dataFromServer){
                if ( dataFromServer.success ) {
                    console.log(dataFromServer)
                    mainVm.username = dataFromServer.user.username
                }
            })
        },
    },
    created: function(){
        this.whoAmI()
    }
})