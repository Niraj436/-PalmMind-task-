$(document).ready(function() {
    var jwtToken = localStorage.getItem('jwt');
    if (!jwtToken) {
        window.location.href = '../html/Login.html';
    }
});