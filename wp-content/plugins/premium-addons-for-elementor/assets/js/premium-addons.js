(function($){
    //Premium Progress Bar Handler
    var PremiumProgressBarWidgetHandler = function ($scope,$){
        var progressbarElement = $scope.find('.premium-progressbar-progress-bar').each(function(){
            
            var settings = $(this).data('settings');
            
            var length  = settings['progress_length'];
            
            $(this).animate({width: length + '%'} , length * 25);
        });
    };
    //Premium Progress Bar on Scroll Handler
    var PremiumProgressBarScrollWidgetHandler = function ($scope,$){
        elementorFrontend.waypoint($scope, function (direction) {
            PremiumProgressBarWidgetHandler($(this), $);
        }, {
            offset: $.waypoints('viewportHeight') - 150,
            triggerOnce: true
        });
    };
    //Premium Video Box Handler
    var PremiumVideoBoxWidgetHandler = function($scope,$){
        var videoBoxElement = $scope.find('.premium-video-box-container'),
            vidSrc,
            checkRel;
        videoBoxElement.on( "click", function(){
            $( this ).children( ".premium-video-box-video-container" ).css(
                {
                    'opacity': '1',
                    'visibility': 'visible'
                } );
            setTimeout(function(){
                vidSrc = videoBoxElement.find("iframe").attr('src');
                checkRel = vidSrc.indexOf('rel=0');
//                if( -1 !== checkRel ) {
//                    videoBoxElement.find("iframe").attr('src', videoBoxElement.find("iframe").attr('src') + '&autoplay=1');
//                } else {
                    videoBoxElement.find("iframe").attr('src', videoBoxElement.find("iframe").attr('src') + '&autoplay=1');
//                }
            },600);
        });
    };
    //Premium Grid Handler
    var PremiumGridWidgetHandler = function($scope,$){ 
        if ($().isotope === undefined) {
            return;
        }
        var gridElement = $scope.find('.premium-img-gallery');
        if (gridElement.length === 0) {
            return;
        }
        var htmlContent = $scope.find('.premium-gallery-container');
        var isotopeOptions = htmlContent.data('settings');
        if(isotopeOptions['img_size'] === 'original'){
            htmlContent.isotope({
            // options
                itemSelector: '.premium-gallery-item',
                percentPosition: true,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            htmlContent.imagesLoaded(function () {
                setTimeout(function(){
                    htmlContent.isotope({layoutMode: 'masonry'});    
                }, 1000);
                
            });
        } else if(isotopeOptions['img_size'] === 'one_size'){
            
            htmlContent.isotope({
            // options
                itemSelector: '.premium-gallery-item',
                percentPosition: true,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            setTimeout(function() {
                htmlContent.isotope({layoutMode: 'fitRows'});
            }, 1000);
//            htmlContent.isotope({layoutMode: 'fitRows'});
            $(window).on('load', function(){
                setTimeout(function() {
                    htmlContent.isotope({layoutMode: 'fitRows'});
                }, 1000);
            });
        }
        $scope.find('.premium-gallery-cats-container li a').click(function(e){
            e.preventDefault();        
            $scope.find('.premium-gallery-cats-container li .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            htmlContent.isotope({filter: selector});
            return false;
        });
        $(".premium-img-gallery a[data-rel^='prettyPhoto']").prettyPhoto({
            theme: 'pp_default',
            hook: 'data-rel',
            opacity: 0.7,
            show_title: false,
            deeplinking: false,
            overlay_gallery: false,
            custom_markup: '',
            default_width: 900,
            default_height: 506,
            social_tools: ''
        });
    };
    //Premium Counter Handler
    var PremiumCounterHandler = function($scope,$){
        var counterElement = $scope.find('.premium-counter').each(function(){
        var counterSettings = $(this).data('settings');

        var counter_offset = $(this).offset().top;
        var counter = new CountUp(
            'counter-' + counterSettings['id'],
            0,
            counterSettings['value'],
            counterSettings['d_after'],
            counterSettings['speed'],
            {
                useEasing: true,
                separator: counterSettings['separator'],
                decimal: counterSettings['decimal']
            }
        );
        if(counter_offset < $(window).outerHeight() - 150) {
            counter.start();
        }
        function start_counter(){
            if($(window).scrollTop() >  counter_offset - 600 ) {
                counter.start();
            }
        }
        function isScrolledIntoView(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = elem.offset().top;
            var elemBottom = elemTop + elem.height();
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
        function addAnimation() {
            $('.premium-counter-init').each( function() {
                var $this = $(this),
                parentId = $this.parents('.premium-counter-area').attr('id'),
                iconClass = $('#' + parentId ).find('.icon'),
                animation = iconClass.data('animation');
                if( iconClass.length ) {
                    if( isScrolledIntoView( iconClass ) ) {
                        if( ! iconClass.hasClass('animated') ) {            
                            $('#' + parentId ).find('.icon').addClass('animated ' + animation );
                                }
                            }
                        }
                    });
                }
            addAnimation();
            $(document).ready(function(){
                $(window).on('scroll', function() {
                    addAnimation();
                    start_counter();
                });
            });
        });        
    };
    //Premium Fancy Text Handler
    var PremiumFancyTextHandler = function($scope,$){
        var fancyTextElement = $scope.find('.premium-fancy-text-wrapper');
        var fancyTextSettings = fancyTextElement.data('settings');
        function escapeHtml(unsafe) {
            return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
        if(fancyTextSettings['effect'] === 'typing'){
            var fancyStrings = [];
            fancyTextSettings['strings'].forEach(function(item){
                fancyStrings.push(escapeHtml(item));
            });
            fancyTextElement.find('.premium-fancy-text').typed( {
                strings: fancyStrings,
                typeSpeed: fancyTextSettings['typeSpeed'],
                backSpeed: fancyTextSettings['backSpeed'],
                startDelay:fancyTextSettings['startDelay'],
                backDelay: fancyTextSettings['backDelay'],
                showCursor:fancyTextSettings['showCursor'],
                cursorChar:fancyTextSettings['cursorChar'],
                loop: fancyTextSettings['loop']
                } );
        } else {
            fancyTextElement.find('.premium-fancy-text').vTicker( {
                speed: fancyTextSettings['speed'],
                showItems: fancyTextSettings['showItems'],
                pause: fancyTextSettings['pause'],
                mousePause : fancyTextSettings['mousePause'],
                direction: "up"
            });
        }
    };
    //Premium Countdown Handler
    var PremiumCountDownHandler = function ($scope,$){
        var countDownElement = $scope.find('.premium-countdown').each(function(){
            var countDownSettings = $(this).data('settings');
            var label1 = countDownSettings['label1'],
                label2 = countDownSettings['label2'],
                newLabe1 = label1.split(','),
                newLabe2 = label2.split(',');
                if(countDownSettings['event'] === 'onExpiry'){
                    $(this).find('.premium-countdown-init').pre_countdown({
                        labels      : newLabe2,
                        labels1     : newLabe1,
                        until       : new Date( countDownSettings['until'] ),
                        format      : countDownSettings['format'],
                        padZeroes   : true,
                        onExpiry    : function() {
                            $(this).html(countDownSettings['text']);
                        },
                        serverSync : function() { return new Date(countDownSettings['serverSync']); }
                    });
                } else if(countDownSettings['event'] === 'expiryUrl') {
                    $(this).find('.premium-countdown-init').pre_countdown({
                        labels      : newLabe2,
                        labels1     : newLabe1,
                        until       : new Date( countDownSettings['until'] ),
                        format      : countDownSettings['format'],
                        padZeroes   : true,
                        expiryUrl   : countDownSettings['text'],
                        serverSync : function() { return new Date(countDownSettings['serverSync']); }
                    });
                }
                times = $(this).find('.premium-countdown-init').pre_countdown('getTimes');
                function runTimer( el ) {
                    return el == 0;
                    }
                if( times.every( runTimer ) ) {
                    if( countDownSettings['event'] === 'onExpiry' ){
                        $(this).find('.premium-countdown-init').html(countDownSettings['text']);
                    }
                    if( countDownSettings['event'] === 'expiryUrl' ){
                        var editMode = $('body').find('#elementor').length;
                        if( editMode > 0 ) {
                            $(this).find('.premium-countdown-init').html( '<h1>You can not redirect url from elementor Editor!!</h1>' );
                        } else {
                            window.location.href = countDownSettings['text'];
                        }
                    }               
                }
            });
        };
    //Premium Carousel Handler
    var PremiumCarouselHandler = function ($scope,$){
        var carouselElement = $scope.find('.premium-carousel-wrapper').each(function(){
            var carouselSettings = $(this).data('settings');
            function slideToShow( slick ) {
                slidesToShow = slick.options.slidesToShow;
                
                windowWidth = jQuery( window ).width();
                if ( windowWidth < 1025 ) {
                    slidesToShow = carouselSettings['slidesDesk'];
                }
                if ( windowWidth < 769 ) {
                    slidesToShow = carouselSettings['slidesTab'];
                }
                if ( windowWidth < 481 ) {
                    slidesToShow = carouselSettings['slidesMob'];
                }
                return slidesToShow;
            }
            $(this).on('init', function (event, slick ) {
                event.preventDefault();
                $(this).find('item-wrapper.slick-active').each(function (index, el) {
                    $this = $(this);
                    $this.addClass($this.data('animation'));
                });
                $('.slick-track').addClass('translate');
                });
            $(this).find('.premium-carousel-inner').slick({
                vertical        : carouselSettings['vertical'],
                slidesToScroll  : carouselSettings['slidesToScroll'],
                slidesToShow    : carouselSettings['slidesToShow'],
                responsive      : [{breakpoint: 1025,settings: {slidesToShow: carouselSettings['slidesDesk'],slidesToScroll: carouselSettings['slidesToScroll']}},{breakpoint: 769,settings: {slidesToShow: carouselSettings['slidesTab'],slidesToScroll: carouselSettings['slidesTab']}},{breakpoint: 481,settings: {slidesToShow: carouselSettings['slidesMob'],slidesToScroll: carouselSettings['slidesMob']}}],
                infinite        : carouselSettings['infinite'],
                speed           : carouselSettings['speed'],
                autoplay        : carouselSettings['autoplay'],
                autoplaySpeed   : carouselSettings['autoplaySpeed'],
                draggable       : carouselSettings['draggable'],
                touchMove       : carouselSettings['touchMove'],
                rtl             : carouselSettings['rtl'],
                useTransform    : false,
                adaptiveHeight  : carouselSettings['adaptiveHeight'],
                pauseOnHover    : carouselSettings['pauseOnHover'],
                centerMode      : carouselSettings['centerMode'],
                centerPadding   : carouselSettings['centerPadding'],
                arrows          : carouselSettings['arrows'],
                nextArrow       : carouselSettings['nextArrow'],
                prevArrow       : carouselSettings['prevArrow'],
                dots            : carouselSettings['dots'],
                customPaging    : function(slider, i) {return '<i class="' + carouselSettings['customPaging'] + '"></i>';}
            });
            $(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
                slidesScrolled = slick.options.slidesToScroll;
                slidesToShow = slideToShow( slick );
                centerMode = slick.options.centerMode;
                $currentParent = slick.$slider[0].parentElement.id;
                slideToAnimate = currentSlide + slidesToShow - 1;
                if (slidesScrolled == 1) {
                    if ( centerMode == true ) {
                        animate = slideToAnimate - 2;
                        $inViewPort = $( '#' + $currentParent + " [data-slick-index='" + animate + "']");
                        $inViewPort.addClass($inViewPort.data('animation'));
                    } else {
                        $inViewPort = $( '#' + $currentParent + " [data-slick-index='" + slideToAnimate + "']");
                        $inViewPort.addClass($inViewPort.data('animation'));
                        }
                    } else {
                        for (var i = slidesScrolled + currentSlide; i >= 0; i--) {
                        $inViewPort = $( '#' + $currentParent + " [data-slick-index='" + i + "']");
                        $inViewPort.addClass($inViewPort.data('animation'));
                    }
                }
            });
            $(this).on('beforeChange', function (event, slick, currentSlide) {
                    $inViewPort = $("[data-slick-index='" + currentSlide + "']");
                    $inViewPort.siblings().removeClass($inViewPort.data('animation'));
            });
            if( carouselSettings['vertical']) {
                var maxHeight = -1;
                    $('.slick-slide').each(function() {
                        if ($(this).height() > maxHeight) {
                            maxHeight = $(this).height();
                        }
                    });
                    $('.slick-slide').each(function() {
                        if ($(this).height() < maxHeight) {
                            $(this).css('margin', Math.ceil((maxHeight-$(this).height())/2) + 'px 0');
                        }
                    });
                }
                var marginFix = {
                    element : $('a.ver-carousel-arrow'),
                    getWidth :  function() {
                        var width = this.element.outerWidth();
                        return width / 2;
                    },
                    setWidth : function( type ) {
                        type = type || 'vertical';
                        this.element.css( 'margin-' + 'vertical' === type ? 'left' : 'top' , '-' + this.getWidth() + 'px' );
                    }
                }
                marginFix.setWidth();
                marginFix.element = $('a.carousel-arrow');
                marginFix.setWidth('horizontal');
        });   
    };
    //Premium Banner Handler
    var PremiumBannerHandler = function ($scope,$){
        var bannerElement = $scope.find('.premium_banner');
        bannerElement.find('.premium_addons-banner-ib').hover(
            function() {
                $(this).find('.premium_addons-banner-ib-img').addClass('active');
            },
            function() {
                $(this).find('.premium_addons-banner-ib-img').removeClass('active');
            });
    };
    //Premium Modal Box Handler
    var PremiumModalBoxHandler = function ($scope,$){
        var modalBoxElement = $scope.find('.premium-modal-box-container'),
            modalBoxSettings = modalBoxElement.data('settings');
        
        if(modalBoxElement.length > 0) {
            if(modalBoxSettings['trigger'] === 'pageload'){
                $(document).ready(function($){
                  setTimeout( function(){
                      modalBoxElement.find('.premium-modal-box-modal').modal();
                  }, modalBoxSettings['delay'] * 1000);
                });
            }
        }
    };
        //Premium Blog Handler
        var PremiumBlogHandler = function ($scope,$){
            var blogElement = $scope.find('.premium-blog-wrap'),
                masonryBlog = blogElement.data('pa-masonry');
            if ( masonryBlog ) {
                blogElement.imagesLoaded(function(){
                    blogElement.isotope({
                        itemSelector: '.premium-blog-post-container',
                        percentPosition: true,
                        animationOptions: {
                            duration: 750,
                            easing: 'linear',
                            queue: false
                        }
                    });
                });
            }
        };
        
        //Premium Vertical Scroll Handler
        var PremiumVerticalScrollHandler = function($scope,$){
            
            var vScrollElem = $scope.find('.premium-vscroll-wrap'),
                instance = null,
                vScrollSettings = vScrollElem.data('settings');
        
                instance = new premiumVerticalScroll( vScrollElem, vScrollSettings );
                instance.init();
            
        };
    
        window.premiumVerticalScroll = function( $selector, settings ) {
            var self        = this,
            $window         = $( window ),
            $instance       = $selector,
            checkTemps      = $selector.find('.premium-vscroll-sections-wrap').length,
            $htmlBody       = $( 'html, body' ),
            $itemsList      = $( '.premium-vscroll-dot-item', $instance ),
            $menuItems      = $( '.premium-vscroll-nav-item', $instance ),
            sectionList     = [],
            defaultSettings = {
                speed: 700,
                offset: 1,
                fullSection: true
            },
            settings        = $.extend( {}, defaultSettings, settings ),
            sections        = {},
            currentSection  = null,
            isScrolling     = false;

            jQuery.extend( jQuery.easing, {
                easeInOutCirc: function (x, t, b, c, d) {
                    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                }
            });
            
            self.checkNextSection = function( object, key ) {
                var keys      = Object.keys( object ),
                    idIndex   = keys.indexOf( key ),
                    nextIndex = idIndex += 1;

                if( nextIndex >= keys.length ) {
                    return false;
                }

                var nextKey = keys[ nextIndex ];

                return nextKey;
            };

            self.checkPrevSection = function( object, key ) {
                var keys      = Object.keys( object ),
                    idIndex   = keys.indexOf( key ),
                    prevIndex = idIndex -= 1;

                if ( 0 > idIndex ) {
                    return false;
                }

                var prevKey = keys[ prevIndex ];

                return prevKey;
            };
            
            self.debounce = function( threshold, callback ) {
                var timeout;

                return function debounced( $event ) {
                    function delayed() {
                        callback.call( this, $event );
                        timeout = null;
                    }

                    if ( timeout ) {
                        clearTimeout( timeout );
                    }

                    timeout = setTimeout( delayed, threshold );
                };
            };

            self.init = function() {
                self.setSectionsData();
                $itemsList.on( 'click.premiumVerticalScroll', self.onNavDotChange );
                $menuItems.on( 'click.premiumVerticalScroll', self.onNavDotChange );
                
                
                $itemsList.on( 'mouseenter.premiumVerticalScroll', self.onNavDotEnter );
                
                $itemsList.on( 'mouseleave.premiumVerticalScroll', self.onNavDotLeave );

                $window.on( 'scroll.premiumVerticalScroll', self.onWheel );
                $window.on( 'resize.premiumVerticalScroll orientationchange.premiumVerticalScroll', self.debounce( 50, self.onResize ) );
                $window.on( 'load', function() { self.setSectionsData(); } );

                $( document ).keydown( function( event ) {

                    if ( 38 == event.keyCode ) {
                        self.onKeyUp( event, 'up' );
                    }

                    if ( 40 == event.keyCode ) {
                        self.onKeyUp( event, 'down' );
                    }
                } );
                if ( settings.fullSection ) {
                    var vSection = document.getElementById($instance.attr('id'));
                    if( checkTemps ){
                        document.addEventListener?(vSection.addEventListener("wheel",self.onWheel,!1)):vSection.attachEvent("onmousewheel",self.onWheel);
                    } else {
                        document.addEventListener?(document.addEventListener("wheel",self.onWheel,!1)):document.attachEvent("onmousewheel",self.onWheel);
                    }
                }

                for ( var section in sections ) {
                    
                    var $section = sections[section].selector;
                    elementorFrontend.waypoint( $section, function( direction ) {
                        var $this = $( this ),
                            sectionId = $this.attr( 'id' );
                            if ( 'down' === direction && ! isScrolling ) {
                                currentSection = sectionId;
                                $itemsList.removeClass( 'active' );
                                $menuItems.removeClass( 'active' );
                                $( '[data-menuanchor=' + sectionId + ']', $instance ).addClass( 'active' );
                            }
                    }, {
                        offset: '95%',
                        triggerOnce: false
                    } );

                    elementorFrontend.waypoint( $section, function( direction ) {
                        var $this = $( this ),
                            sectionId = $this.attr( 'id' );
                            if ( 'up' === direction && ! isScrolling ) {
                                currentSection = sectionId;
                                $itemsList.removeClass( 'active' );
                                $menuItems.removeClass( 'active' );
                                $( '[data-menuanchor=' + sectionId + ']', $instance ).addClass( 'active' );
                            }
                    }, {
                        offset: '0%',
                        triggerOnce: false
                    } );
                }
            };

            self.setSectionsData = function() {
                $itemsList.each( function() {
                    var $this         = $( this ),
                        sectionId     = $this.data('menuanchor'),
                        $section      = $( '#' + sectionId );
                    if ( $section[0] ) {
                        sections[ sectionId ] = {
                            selector: $section,
                            offset: Math.round( $section.offset().top ),
                            height: $section.outerHeight()
                        };
                    }
                } );
            };
            
            self.onNavDotEnter = function() {
                var $this = $( this ),
                    index = $this.data("index");
                if( settings.tooltips ) {
                    $('<div class="premium-vscroll-tooltip"><span>' + settings.dotsText[index] + "</span></div>").hide().appendTo($this).fadeIn(200);
                }        
            };
            
            self.onNavDotLeave = function() {
                $(".premium-vscroll-tooltip").fadeOut(200, function() {
                    $(this).remove();
                });
            };

            self.onNavDotChange = function( event ) {
                var $this     = $( this ),
                    index     = $this.index(),
                    sectionId = $this.data('menuanchor'),
                    offset    = null;
                    
                if ( ! sections.hasOwnProperty( sectionId ) ) {
                    return false;
                }

                offset = sections[sectionId].offset - settings.offset;
                
                if ( ! isScrolling ) {
                    isScrolling = true;
//                    window.history.pushState( null, null, '#' + sectionId );
                    currentSection = sectionId;
                    $menuItems.removeClass('active');
                    $itemsList.removeClass( 'active' );
                    
                    if($this.hasClass("premium-vscroll-nav-item")) {
                        $($itemsList[index]).addClass('active');
                    } else {
                        $($menuItems[index]).addClass('active');
                    }
                    
                    $this.addClass( 'active' );
                    
                    $htmlBody.stop().clearQueue().animate( { 'scrollTop': offset }, settings.speed, 'easeInOutCirc', function() {
                        isScrolling = false;
                    } );
                }
            };

            self.onKeyUp = function( event, direction ) {
                var direction = direction || 'up',
                    sectionId,
                    nextItem = $( '.premium-vscroll-dot-item[data-menuanchor=' + currentSection + ']', $instance ).next(),
                    prevItem = $( '.premium-vscroll-dot-item[data-menuanchor=' + currentSection + ']', $instance ).prev();

                event.preventDefault();

                if ( isScrolling ) {
                    return false;
                }

                if ( 'up' === direction ) {
                    if ( prevItem[0] ) {
                        prevItem.trigger( 'click.premiumVerticalScroll' );
                    }
                }

                if ( 'down' === direction ) {
                    if ( nextItem[0] ) {
                        nextItem.trigger( 'click.premiumVerticalScroll' );
                    }
                }
            };

            self.onScroll = function( event ) {
                /* On Scroll Event */
                if ( isScrolling ) {
                    event.preventDefault();
                }
            };
            
            function getFirstSection( object ) {
                return Object.keys( object )[0];
            };
            
            function getLastSection( object ) {
                return Object.keys( object )[ Object.keys( object ).length - 1 ];
            };

            function getDirection(e){
                e = window.event || e;
                var t = Math.max( -1, Math.min( 1, ( e.wheelDelta || -e.deltaY || -e.detail ) ) );
                return t;
            }

            self.onWheel = function( event ) {
                if ( isScrolling ) {
                    event.preventDefault();
                    return false;
                }
                
                var $target         = $( event.target ),
                    sectionSelector = checkTemps ? '.premium-vscroll-temp' : '.elementor-top-section',
                    $section        = $target.closest( sectionSelector ),
                    $vTarget        = $instance.visible(true,false,'vertical'),
                    sectionId       = $section.attr( 'id' ),
                    offset          = 0,
                    newSectionId    = false,
                    prevSectionId   = false,
                    nextSectionId   = false,
                    delta           = getDirection(event),
                    direction       = ( 0 > delta ) ? 'down' : 'up',
                    windowScrollTop = $window.scrollTop(),
                    deviceType      = $( 'body' ).data('elementor-device-mode'),
                    dotIndex        = $('.premium-vscroll-dot-item.active').index();
                if('mobile' === deviceType || 'tablet' === deviceType ) {
                    $(".premium-vscroll-tooltip").hide();
                    if( dotIndex === $itemsList.length - 1 && ! $vTarget ) {
                        $(".premium-vscroll-dots, .premium-vscroll-nav-menu").addClass('premium-vscroll-dots-hide');
                    } else if( dotIndex === 0 && ! $vTarget ) {
                        if( $instance.offset().top - $(document).scrollTop() > 200  ) {
                            $(".premium-vscroll-dots, .premium-vscroll-nav-menu").addClass('premium-vscroll-dots-hide');
                        }
                    } else {
                        $(".premium-vscroll-dots, .premium-vscroll-nav-menu").removeClass('premium-vscroll-dots-hide');
                    }
                    
                }
                
                if ( beforeCheck() ) {
                    sectionId = getFirstSection( sections );
                }

                if ( afterCheck() ) {
                    sectionId = getLastSection( sections );
                }
                if ( sectionId && sections.hasOwnProperty( sectionId ) ) {
                    prevSectionId = self.checkPrevSection( sections, sectionId );
                    nextSectionId = self.checkNextSection( sections, sectionId );
                    if ( 'up' === direction ) {
                        if ( ! nextSectionId && sections[sectionId].offset < windowScrollTop ) {
                            newSectionId = sectionId;
                        } else {
                            newSectionId = prevSectionId;
                        }
                    }

                    if ( 'down' === direction ) {
                        if ( ! prevSectionId && sections[sectionId].offset > windowScrollTop + 5 ) {
                            newSectionId = sectionId;
                        } else {
                            newSectionId = nextSectionId;
                        }
                    }
                    
                    if ( newSectionId ) {
                        $(".premium-vscroll-dots, .premium-vscroll-nav-menu").removeClass('premium-vscroll-dots-hide');
                        event.preventDefault();
                        offset = sections[newSectionId].offset - settings.offset;
                        currentSection = newSectionId;
                        $itemsList.removeClass( 'active' );
                        $menuItems.removeClass( 'active' );
                        $( '[data-menuanchor=' + newSectionId + ']', $instance ).addClass( 'active' );

                        isScrolling = true;
                        self.scrollStop();
                        $htmlBody.animate( { 'scrollTop': offset }, settings.speed, 'easeInOutCirc', function() {
                            isScrolling = false;
                        } );
                    } else {
                        var $lastselector = checkTemps ? $instance : $('#' + sectionId);
                        if('down' === direction ) {
                            if( ( $lastselector.offset().top + $lastselector.innerHeight() ) - $(document).scrollTop() > 600  ) {
                                $(".premium-vscroll-dots, .premium-vscroll-nav-menu").addClass('premium-vscroll-dots-hide');
                            }    
                        } else if('up' === direction) {
                            if( $lastselector.offset().top - $(document).scrollTop() > 200  ) {
                                $(".premium-vscroll-dots, .premium-vscroll-nav-menu").addClass('premium-vscroll-dots-hide');
                            }    
                        }
                    }
                }

            };

             function beforeCheck ( event ) {
                var windowScrollTop = $window.scrollTop(),
                    firstSectionId = getFirstSection( sections ),
                    offset = sections[ firstSectionId ].offset,
                    topBorder = windowScrollTop + $window.outerHeight(),
                    visible = $instance.visible(true,false,'vertical');
                
                if ( topBorder > offset ) {
                    return false;
                } else if( visible ) {
                    return true;
                }
                return false;
            };

            function afterCheck( event ) {
                var windowScrollTop = $window.scrollTop(),
                    lastSectionId = getLastSection( sections ),
                    offset = sections[ lastSectionId ].offset,
                    bottomBorder = sections[ lastSectionId ].offset + sections[ lastSectionId ].height,
                    visible = $instance.visible(true,false,'vertical');

                if ( windowScrollTop < bottomBorder ) {
                    return false;
                } else if ( visible ) {
                    return true;
                }

                return false;
            };

            self.onResize = function( event ) {
                self.setSectionsData();
            };

            self.scrollStop = function() {
                $htmlBody.stop( true );
            };

    };
        
    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-video-box.default',PremiumVideoBoxWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-img-gallery.default',PremiumGridWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-fancy-text.default',PremiumFancyTextHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-counter.default',PremiumCounterHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-countdown-timer.default',PremiumCountDownHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-carousel-widget.default',PremiumCarouselHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-banner.default',PremiumBannerHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-modal-box.default',PremiumModalBoxHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-blog.default',PremiumBlogHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/premium-vscroll.default',PremiumVerticalScrollHandler);
        if(elementorFrontend.isEditMode()){
            elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-progressbar.default', PremiumProgressBarWidgetHandler);
        } else {
            elementorFrontend.hooks.addAction('frontend/element_ready/premium-addon-progressbar.default', PremiumProgressBarScrollWidgetHandler);
        }
    });
})(jQuery);