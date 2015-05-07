$('#user_form').on('submit', function() {
    var params = $(this).serializeArray();
    var data = {};
    for (var i = 0; i < params.length; i++) {
        var param = params[i];
        data[param["name"]] = param["value"] ? param["value"] : "";
    }
    var redirectUrl = getQueryVariable("redirect_url");
    var url = "https://open-whisper-cla.appspot.com/cla-server/form";
    if (redirectUrl) url = url + "?redirect_url=" + redirectUrl;
    var locked = false;
    if (!locked) {
        $('#loading').show();
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function(html) {
                locked = true;
                if (html.status == 'ERROR') {
                    $('#loading').hide();
                    var fields = html.errorFields;
                    $('.error-msg').hide();
                    for (var i = 0; i < fields.length; i++) {
                        $('#error_' + fields[i]).show();
                    }
                    $('#error-container').show();
                } else {
                    window.location = html.authorizeUrl;
                }
            }
        });
    }
    return false;
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}