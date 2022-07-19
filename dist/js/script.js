$(document).ready(function () {

// Slider

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        controls: false,
        nav: false,
        responsive: {
            640: {
                edgePadding: 20,
                gutter: 20,
                items: 1
            },
            700: {
                gutter: 30
            },
            900: {
                items: 1
            }
        }
    });

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});


// Tabs
    
    $('ul.catalogue__tabs').on('click', 'li:not(.catalogue__tab_active)', function () {
        $(this)
            .addClass('catalogue__tab_active').siblings().removeClass('catalogue__tab_active')
            .closest('div.container').find('div.catalogue__content').removeClass('catalogue__content_active').eq($(this).index()).addClass('catalogue__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalogue-item__content').eq(i).toggleClass('catalogue-item__content_active');
                $('.catalogue-item__list').eq(i).toggleClass('catalogue-item__list_active');
            });
        });
    }

    toggleSlide('.catalogue-item__link');
    toggleSlide('.catalogue-item__back');

    
// Modal
    
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function () {
            $('.modal__descr').text($('.catalogue-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

// Form Validation
    
    function validateForms(form) {
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Введіть ім'я, будь ласка",
                minlength: jQuery.validator.format("Введіть {0} символа")
            },
            phone: "Введіть свій номер телефона, будь ласка",
            email: {
                required: "Введіть свою електронну пошту, будь ласка",
                email: "Електронна адреса введена невірно"
            }
        }
    });        
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

// Masked Input

    $('input[name=phone]').mask("+3(80) 999-99-99");

// Mailer

    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

// Smooth scroll and page up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#up']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

// WOW js 
    
    new WOW().init();
    
});