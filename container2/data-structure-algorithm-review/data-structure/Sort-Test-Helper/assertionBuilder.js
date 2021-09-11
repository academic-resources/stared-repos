/**
 * Created by xliu on 7/4/2017.
 */
function AssertionException(message){
    this.message = message;
}

AssertionException.prototype.toString = function () {
    return "AssertionException " + this.message;
}

function assert(exp, message){
    if(!exp){
        throw new AssertionException(message);
    }
}

function assertionCheck(func){
    try{
        func();
    }catch(e){
        if(e instanceof AssertionException){
            console.log(e.toString());
        }
    }

}