$(document).ready(function () {

    if(document.location.pathname.match(/\/$/)) {

        $("#url-input-form").hide();

        $("#by-url-button").click(function (event) {
            $("#certificate-input-form").hide();
             $("#url-input-form").show();

        });
        $("#by-file-button").click(function(event){
            $("#certificate-input-form").show();
             $("#url-input-form").hide();
        });
        $("#ocsp-submit-button").click(function (event) {

            event.preventDefault();
            var form = $('#certificate-input-form')[0];
            var data = new FormData(form);
            data.append("action", "Check OCSP Response");

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "response-check",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 5000,
                success: function (data) {

                    localStorage.setItem('ocsp-response', data);
                    window.location.href = window.location.protocol + "//" + window.location.host + "/response"
                    //console.log(window.location)
                },
                error: function (e) {

                    console.log("ERROR : ", e);

                }
            });

        });
        $("#ocsp-url-submit-button").click(function (event){

            event.preventDefault();
            var form = $('#url-input-form')[0];
            var data = new FormData();
            data.append("url", $("#url-field").val());
            data.append("action", "Check OCSP Response URL");
            
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "response-check",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 5000,
                success: function (data) {

                    localStorage.setItem('ocsp-response', data);
                    window.location.href = window.location.protocol + "//" + window.location.host + "/response"
                    //console.log(window.location)
                },
                error: function (e) {

                    console.log("ERROR : ", e);

                }

            });
        });
    }
    
    else if(document.location.pathname.match(/\/response$/)){
        
        var json_response = localStorage.getItem('ocsp-response');
        var json_obj = JSON.parse(json_response)
        var error_ul = document.getElementById("error-lint-list");
        var warn_ul = document.getElementById("warning-lint-list");

        if (!json_obj.hasOwnProperty("fatal_error")){
            if (json_obj.hasOwnProperty("domain")){
                document.getElementById("domain").innerHTML = "Domain: " + json_obj["domain"];
            }
            if (json_obj.hasOwnProperty("ocsp_url")){
                document.getElementById("ocspurl").innerHTML = "OCSP URL: " + json_obj["ocsp_url"]
            }
             if (json_obj.hasOwnProperty("warnings")){
                var warn_json = json_obj["warnings"]
                for (var warn in warn_json){
                    warn_ul.appendChild(return_li(warn, warn_json[warn], 1))
                }
            }  
            if (json_obj.hasOwnProperty("errors")){
                var error_json = json_obj["errors"]
                for (var error in error_json){
                    error_ul.appendChild(return_li(error, error_json[error], 0))
                }
            }
        }
        else{
            document.getElementById("domain").innerHTML = "Fatal Error: " + json_obj["fatal_error"];
        }     
    }

});

function return_li(key, data, flag){

    var list_item = document.createElement('li');
    list_item.setAttribute("id", key);
    list_item.setAttribute("class", "lint-list-item");
    var img = document.createElement('img');
    if (key == "NoFailure" || key == "NoWarning"){
        img.setAttribute("src", "/static/images/success.png");
    }
    else if (flag == 0){
        img.setAttribute("src", "/static/images/error.png")
    }
    else {
        img.setAttribute("src", "/static/images/warning.png")
    }
    img.setAttribute("height", "25px");
    img.setAttribute("width", "25px");
    list_item.appendChild(img);
    var p = document.createElement('p');
    p.innerHTML = data;
    list_item.append(p);
    return list_item;
}