$(document).ready(function() {
    var jwtToken = getCookie('jwt');
    if (!jwtToken) {
        // Redirect user to login page if token doesn't exist
        window.location.href = '../html/Login.html';
    }

    function getCookie(name) {
        var cookieArr = document.cookie.split(';');
        for (var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split('=');
            if (name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }
});