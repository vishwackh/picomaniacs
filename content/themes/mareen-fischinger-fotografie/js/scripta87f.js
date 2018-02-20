$(function() {
  
  
  
  // Toggle menu
  
  $('.btn-toggle-menu').click(function(e) {
    e.preventDefault();
    $('body').toggleClass('show-menu');
  });
  
  
  
  
  
  
  
  
  // Scale full-size images
  
  if($('.fullsize').length) {
    $(window).resize(function() {
    
      var _w = $(window).width();
      var _h = $(window).height();
      
      if(Modernizr.mq('screen and (max-device-width: 480px) and (orientation: landscape)')) {
        _w = 640;
        _h = 350;
      }

      $('.fullsize').each(function(a, b) {
      
        var _img = $(b).find('img');
        var _iw = _img.attr('width');
        var _ih = _img.attr('height');
      
        var _ratio_width_to_height = _iw/_ih;
        var _ratio_height_to_width = _ih/_iw;
      
        var _top_margin = 0;
        var _left_margin = 0;
        var _new_width = 0;
        var _new_height = 0;

        if((_w * _ratio_height_to_width) >= _h) {
          _new_width = _w;
          _new_height = _w * _ratio_height_to_width;
          _left_margin = 0;
          _top_margin = (_h - _new_height) / 2;
        } else {
          _new_width = _h * _ratio_width_to_height;
          _new_height = _h;
          _left_margin = (_w - _new_width) / 2;
          _top_margin = 0;
        }
      
        _img.css('marginTop', _top_margin).css('marginLeft', _left_margin).width(_new_width).height(_new_height);
      
      });
    
    }).resize();
  }
  
  
  
  
  
  
  
  
  // Slideshow
  
  $('.slideshow').each(function(a, b) {
    
    var _global_z = $(b).find('li').length;
    $(b).find('li').each(function(c, d) {
      $(d).css('z-index', _global_z--);
    });
    $(b).find('li').first().addClass('current');
    _global_z = $(b).find('li').length;
    
    if(_global_z > 1) {
    
      window.setInterval(function() {
        var _next = $(b).find('li.current').next();
        if(!_next.length) _next = $(b).find('li').first();
        $(b).find('li').removeClass('current');
        _next.css('z-index', _global_z++).addClass('current');
      }, $(b).data('interval') * 1000);
      
    }
    
  });
  




  
  
  
  
  // Navigation

  $('.no-touch header.main').mouseenter(function() {
    if($(window).width() <= 480) return false;
    $('body').addClass('show-menu');
  }).mouseleave(function() {
    if($(window).width() <= 480) return false;
    $('body').removeClass('show-menu');
  });
  
  function _fade_based_on_distance(_obj, _max_transparency, _mouse_x, _mouse_y) {
    
    if(_obj.length) {
      var _distance_base = 800;
      var _distance = Math.floor(Math.sqrt(Math.pow(_mouse_x - (_obj.position().left+(_obj.width()/2)), 2) + Math.pow(_mouse_y - (_obj.position().top+(_obj.height()/2)), 2)));    
      var _opacity_percentage = _distance / _distance_base;
      if(_opacity_percentage > _max_transparency) _opacity_percentage = _max_transparency;
      _opacity_percentage = 1 - _opacity_percentage;
      _obj.css('opacity', _opacity_percentage);
    }
    
  }


  if(!Modernizr.touch) {
    $(document).mousemove(function(e) {
    
      _fade_based_on_distance($('body:not(.home) .btn-toggle-menu'), 0.8, e.clientX, e.clientY);
      _fade_based_on_distance($('body:not(.page-id-145):not(.page-id-1161) h1.main'), 0.8, e.clientX, e.clientY);
      _fade_based_on_distance($('section.single-series h1'), 1, e.clientX, e.clientY);
      _fade_based_on_distance($('nav.prev-next-series'), 0.8, e.clientX, e.clientY);
    
    });
  }









  // Single series
  
  if($('body.single-series').length) {
    
    $(window).resize(function() {
      
      $('html').css('overflow', 'scroll').css('overflow-y', 'hidden').height('100%');
      
      var _h = $(window).height();
      var _gallery_width = 0;
      
      $('section.single-series li').each(function(a, b) {
        var _ratio = parseFloat($(b).data('ratio'));
        var _new_width = _h * _ratio;
        _gallery_width += _new_width + 5;
        $(b).find('img, iframe').height(_h).width(_new_width);
      });

      $('section.single-series ul').width(Math.ceil(_gallery_width) - 5);
      
      $('.inner-info').each(function(a, b) {
        $(b).css('margin-top', -($(b).height()/2));
      });
      
    }).resize();
    
    
    
    if(!Modernizr.touch) {
      
      $(document).on('dragstart', function(e) { e.preventDefault(); });
    
      var _speed = 0;
      var _moved = 0;
      var _direction = 1;
      
      $('ul.gallery').mousedown(function() {
        $('body').addClass('grabbing');
      }).mouseup(function() {
        $('body').removeClass('grabbing');
      });
      
      $('body').mouseleave(function() {
        $('ul.gallery').trigger('mouseup');
      });
      
      $('body').mouseup(function(e) {
        if($(e.target) != $('ul.gallery') && !$(e.target).closest('ul.gallery').length) {
          $('ul.gallery').trigger('mouseup');
        }
      });
      
      $('ul.gallery').bind('swipemove', function(e, f) {
        
        var _body_scroll_left = $('body').scrollLeft();
        var _body_scroll_element = 'body';
        if(_body_scroll_left == 0) {
          _body_scroll_left = $('html').scrollLeft();
          _body_scroll_element = 'html';
        }
        
        if($.scrollTo._the_scrollable_element) $.scrollTo._the_scrollable_element.stop();
        
        _speed = f.delta[0].moved / f.duration;
        _moved = f.delta[0].moved;
        _direction = f.direction.startX;
        $(_body_scroll_element).scrollLeft( _body_scroll_left - (f.delta[0].moved * f.direction.startX) );
        
      });
    
      $('ul.gallery').bind('swipeone', function(e, f) {
        
        var _duration = _speed * 200;
        var _distance = _moved * 4;
        
        if(_direction > 0) {
          _distance = '-=' + _distance;
        } else {
          _distance = '+=' + _distance;
        }
        
        $.scrollTo(_distance +'px',{
          axis: 'x',
          duration: _duration,
          easing: 'easeOutExpo'
        });
        
      });
      
      if(window.navigator.appName == 'Microsoft Internet Explorer') $('ul.gallery').addClass('grab-cursor');
      $('body').addClass('grab');
      
    }
    

    
    $('.btn-info').click(function(e) {
      e.preventDefault();
      $(this).closest('li').toggleClass('info-shown');
    });
    
    $('section.single-series li').mouseleave(function(e) {
      $(this).removeClass('info-shown');
    });



    $(document).keydown(function(e) {
      
      var _body_scroll_left = $('body').scrollLeft();
      if(_body_scroll_left == 0) _body_scroll_left = $('html').scrollLeft();
      
      // right
      if(e.keyCode == 39) {
        e.preventDefault();
        if($.scrollTo._the_scrollable_element) $.scrollTo._the_scrollable_element.stop();
        $.scrollTo( _body_scroll_left + (($(window).width()/4)*3) + 'px', {
          axis: 'x',
          duration: 1250,
          easing: 'easeOutExpo'
        });
      }
      
      // left
      if(e.keyCode == 37) {
        e.preventDefault();
        if($.scrollTo._the_scrollable_element) $.scrollTo._the_scrollable_element.stop();
        var _scroll_to = _body_scroll_left - (($(window).width()/4)*3);
        if(_scroll_to < 0) _scroll_to = 0;
        $.scrollTo( _scroll_to + 'px', {
          axis: 'x',
          duration: 1250,
          easing: 'easeOutExpo'
        });
      }
      
      // up
      if(e.keyCode == 38) {
        e.preventDefault();
        if($('nav.prev-next-series .btn-prev').length) window.location.href = $('nav.prev-next-series .btn-prev').attr('href');
      }
      
      // down
      if(e.keyCode == 40) {
        e.preventDefault();
        if($('nav.prev-next-series .btn-next').length) window.location.href = $('nav.prev-next-series .btn-next').attr('href');
      }
      
    });
    
    
    
  }






  
  

  
  
  
});