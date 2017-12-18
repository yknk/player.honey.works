(function($) {
  $(function() {
    $.getJSON('/json/object.json', function(object) {
      Handlebars.registerHelper('join', function(context, options) {
        return context.join(options.hash.separator);
      });
      Handlebars.registerHelper('ifRenai', function(context, options) {
        if ($.inArray('renai', context) !== -1) {
          return options.fn(this);
        }
      });
      Handlebars.registerHelper('ifCwhw', function(context, options) {
        if ($.inArray('CHiCO', context) === 0) {
          return options.fn(this);
        }
      });
      Handlebars.registerHelper('ifHnwk', function(context, options) {
        if (context === 'HoneyWorks56410') {
          return options.fn(this);
        }
      });
      Handlebars.registerHelper('ifSmej', function(context, options) {
        if ((context === 'chicoxxx') || (context === 'sonymusicnetwork')) {
          return options.fn(this);
        }
      });
      var source = $('#youtube-list-template').html();
      var template = Handlebars.compile(source);
      $('#youtube-list').html(template(object));
      var source = $('#youtube-renai-list-template').html();
      var template = Handlebars.compile(source);
      $('#youtube-renai-list').html(template(object));
      var source = $('#youtube-cwhw-list-template').html();
      var template = Handlebars.compile(source);
      $('#youtube-cwhw-list').html(template(object));
      var source = $('#youtube-hnwk-list-template').html();
      var template = Handlebars.compile(source);
      $('#youtube-hnwk-list').html(template(object));
      var source = $('#youtube-smej-list-template').html();
      var template = Handlebars.compile(source);
      $('#youtube-smej-list').html(template(object));
      var source = $('#amazon-list-template').html();
      var template = Handlebars.compile(source);
      $('#amazon-list').html(template(object));
    });

    $.extend($.fancybox.helpers.media, {
      defaults: {
        youtube: {
          matcher: /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/,
          params: {
            autoplay: 1,
            enablejsapi: 1,
            origin: location.origin,
            rel: 0
          },
          type: 'iframe',
          url: 'https://www.youtube.com/embed/$1'
        }
      }
    });

    $('.fancybox').fancybox({
      width: 640,
      height: 360,
      autoCenter: true,
      aspectRatio: true,
      mouseWheel: false,
      keys: {
        play: null
      }
    });

    onYouTubeIframeAPIReady = function() {
      $('.fancybox-youtube').fancybox({
        width: 1280,
        height: 720,
        autoCenter: true,
        aspectRatio: true,
        mouseWheel: false,
        keys: {
          play: null
        },
        helpers: {
          media: true
        },
        beforeShow: function() {
          var id = $.fancybox.inner.find('iframe').attr('id');
          var player = new YT.Player(id, {
            events: {
              'onStateChange': onPlayerStateChange
            }
          });
        }
      });
    };

    function onPlayerStateChange(event) {
      if (event.data === 0) {
        $.fancybox.close();
      }
    }

    $(window).on('load', function() {
      $('#loading').delay(1000).fadeOut();
    });

    $(window).on('load', function() {
      $('a[href^="https://"], a[href^="http://"]').attr('target', '_blank');
    });

    $('a[href="' + location.pathname + '"]').on('click', function(event) {
      event.preventDefault();
      location.reload();
    });

    $('a[href="#top"]').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      });
    });

    if (isMobile.apple.device) {
      $('body').css('cursor', 'pointer');
    }

    if (!navigator.doNotTrack) {
      $.getScript('https://platform.twitter.com/widgets.js');
      $.getScript('https://connect.facebook.net/ja_JP/sdk.js');
      $.getScript('https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js');
      $.getScript('https://www.googletagmanager.com/gtag/js?id=UA-110779746-1');
    }

    if (!navigator.doNotTrack) {
      fbAsyncInit = function() {
        FB.init({
          version: 'v2.11',
          xfbml: true
        });
      };
    }

    if (!navigator.doNotTrack) {
      dataLayer = window.dataLayer || [];
      gtag = function() {
        dataLayer.push(arguments);
      };
      gtag('js', new Date());
      gtag('config', 'UA-110779746-1', {
        'anonymize_ip': true
      });
    }
  });
})(jQuery);
