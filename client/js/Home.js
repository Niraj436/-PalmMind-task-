$(document).ready(function() {
    const $navbar = $('.navigation');
    const $toggle = $('.icon');
    let isTransformed = false;

    $toggle.on('click', function() {
        if (!isTransformed) {
            $navbar.css('transform', 'translateX(100%)');
            isTransformed = true;
        } else {
            $navbar.css('transform', '');
            isTransformed = false;
        }
    });
   
    
});


