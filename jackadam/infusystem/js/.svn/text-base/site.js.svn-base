$(document).ready(function() {
  var _nav_links = $('nav a').add('#logo_link')
  
  var _color = {
    overview:     '#3DAD51',
    benefits:     '#26ABE5',
    testimonials: '#EF632E',
    contact_us:   '#FDF132'    
  }
  
  var _entrance_offset = {
    overview:     {top: 200,  left: -100},
    benefits:     {top: 250,  left: 0},
    testimonials: {top: 0,    left: 146},
    contact_us:   {top: -300, left: 0}
  }
  
  var _exit_offset = {
    overview:     {top: -168, left: 84},
    benefits:     {top: -250, left: 0},
    testimonials: {top: -150, left: 0},
    contact_us:   {top: 0,    left: 250}
  }
  
  var switch_to_section = function(new_section) {
    var old_section = _nav_links.filter('.active').attr('href')
    if(old_section) {
      old_section = old_section.split('#')[1]

      var scroll_offset = {top: $(window).scrollTop(), left: $(window).scrollLeft()}
      var scroll_duration = Math.max(scroll_offset.top, scroll_offset.left) + 100
      if(scroll_offset.top || scroll_offset.left)
        $('html, body').animate({scrollTop: 0, scrollLeft: 0}, {duration: scroll_duration, complete: function() {
          transition(old_section, new_section)
        }})
      else
        transition(old_section, new_section)
    }
    else {
      $('body').css('backgroundColor', _color[new_section])
      setTimeout(function() {intro(new_section)}, 250)
    }

    _nav_links.removeClass('active')
    $('#' + new_section + '_link').addClass('active')
  }

  var transition = function(old_section, new_section) {    
    $('body').addClass('animated')

    window.location.hash = new_section

    if(old_section == 'testimonials') VideoPlayer.unload()

    $('#' + old_section + ' .content').stop(true).fadeOut(400, function() {

      spotlight_exit(old_section, function() {

        $('body')
          .stop(true)
          .animate({backgroundColor: _color[new_section]}, {duration: 600})

        spotlight_entrance(new_section, function() {
          $('#' + new_section + ' .content')
            .stop(true)
            .fadeIn(400, function() {
              $('body').removeClass('animated')
              if(new_section == 'testimonials') VideoPlayer.load_first()
            })
        })

        if(new_section == 'contact_us' && $('#logo_black').is(':hidden'))
          $('#logo_black').stop(true).fadeIn(400)
        else if(new_section != 'contact_us' && $('#logo_black').is(':visible'))
          $('#logo_black').stop(true).fadeOut(400)

      })
    })

  }

  var intro = function(new_section) {
    $('body').addClass('animated')
    
    spotlight_entrance(new_section, function() {
      $('#' + new_section + ' .content')
        .delay(200)
        .fadeIn()
    })

    $('#immediate_help')
      .delay(1000)
      .animate({top: 0})
    
    if(new_section == 'contact_us') $('#logo_black').css('display', 'block')
    
    $('#logo_link')
      .delay(1400)
      .animate({top: 60})
    
    $('nav ul')
      .delay(1800)
      .animate({left: 0})
    
    $('footer')
      .delay(2400)
      .fadeTo(600, 1, function() {
        $('body').removeClass('animated')
        if(new_section == 'testimonials') VideoPlayer.load_first()
      })
  }
  
  var spotlight_entrance = function(new_section, callback, delay_time) {
    var spotlight = $('#' + new_section + ' .spotlight')
    var start_position = {
      top: spotlight.offset().top + _entrance_offset[new_section].top, 
      left: spotlight.offset().left + _entrance_offset[new_section].left
    }

    spotlight
      .stop(true)
      .delay(delay_time)
      .offset(start_position)
      .show()
      .animate({
        top: spotlight.data('original_position').top,
        left: spotlight.data('original_position').left,
        opacity: 1
      }, {
        easing: 'easeOutBack',
        duration: 600,
        complete: callback || $.noop()
      })
  }

  var spotlight_exit = function(old_section, callback, delay_time) {
    var spotlight = $('#' + old_section + ' .spotlight')
    var end_position = {
      top: spotlight.offset().top + _exit_offset[old_section].top, 
      left: spotlight.offset().left + _exit_offset[old_section].left
    }

    spotlight
      .stop(true)
      .delay(delay_time)
      .animate({
        top: end_position.top,
        left: end_position.left,
        opacity: 0
      }, {
        easing: 'easeInBack',
        duration: 400,
        complete: function() {
          spotlight.offset(spotlight.data('original_position')).hide()
          callback() || $.noop()
        }
      })
  }

  var check_for_hash = function() {
    var hash_str = window.location.hash.split('#')[1]
    if(!hash_str) hash_str = 'overview'
    switch_to_section(hash_str)
  }

  var store_spotlight_positions = function() {
    $('.spotlight').each(function() {
      var spotlight = $(this)

      var offset = spotlight.offset()
      spotlight.data('original_position', offset)

      var background_positions = spotlight.css('backgroundPosition').split(' ')
      var background_offset = {
        top: parseInt(background_positions[1]),
        left: parseInt(background_positions[0])
      }
      spotlight
        .data('original_background_position', background_offset)
        .hide()
    })
  }

  $.preloadCssImages();
  store_spotlight_positions()
  VideoPlayer.setup()
  check_for_hash()  

  // EVENTS
  $(window).bind({
    scroll: function() {
      if($.browser.msie && $.browser.version < 7) return
      var spotlight = $('.spotlight:visible')
      var background_offset = spotlight.data('original_background_position')
      if(!background_offset) return
      var scroll_offset = {top: $(window).scrollTop(), left: $(window).scrollLeft()}
      var new_offset = {
        top: background_offset.top - scroll_offset.top,
        left: background_offset.left - scroll_offset.left
      }
      spotlight.css('backgroundPosition', new_offset.left + 'px ' + new_offset.top + 'px')
    },
    unload: function() {
      window.scrollTo(0, 0)
    }
  })

  _nav_links.click(function(event) {
    event.preventDefault()
    var $this = $(this)
    if($this.hasClass('active') || $('body').hasClass('animated')) return
    var section_name = $this.attr('href').split('#')[1]
    switch_to_section(section_name)
  })
})


var VideoPlayer = function() {
  var _this = {}

  var _video_links
  var _video_player
  var _video_info

  _this.setup = function() {
    _video_links = $('.video_link')
    _video_player = $('#video_player')
    _video_info = $('#video_info')
    
    _video_links.click(function(event) {
      event.preventDefault()
      var $this = $(this)
      if($this.hasClass('active')) return
      switch_to_video($this.attr('id'), true)
    })
  }


  var switch_to_video = function(new_video_name, autoplay) {
    _video_links.removeClass('active')
    var video_link = $('#' + new_video_name)

    var video_info = video_link.attr('rel').split(' - ')
    _video_info.html('<h3>' + video_info[0] + '</h3><p>' + video_info[1] + '</p><p>' + video_info[2] + '</p>')

    var video_url = video_link.addClass('active').attr('href')
    if(is_iphone())
      window.location = video_url.replace(/f4v/g, 'm4v')
    else
      _video_player.html('<object width="200" height="166" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0"><param name="allowFullScreen" value="false" /><param name="quality" value="high" /><param name="movie" value="player.swf?the_source=' + video_url + '&autoplay=' + autoplay + '" /><param name="bgcolor" value="#231F20" /><embed width="200" height="166" src="player.swf?the_source=' + video_url + '&autoplay=' + autoplay + '" bgcolor="#231F20" quality="high" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>')
  }


  var is_iphone = function() {
    return navigator.userAgent.indexOf('AppleWebKit') != -1 && navigator.userAgent.indexOf('Mobile') != -1
  }


  _this.load_first = function() {
    $('#testimonial_chooser').fadeIn(800, function() {

      if(is_iphone())
        _video_info.html('<br /><br /><h3>Click on a thumbnail to hear a testimonial…</h3>')
      else
        switch_to_video($('.video_link').first().attr('id'), false)

    })
  }
  
  
  _this.unload = function() {
    $('#testimonial_chooser').hide()
    _video_links.removeClass('active')
    _video_info.html('')
    _video_player.html('')
  }
  

  return _this
}()



var Contact = function() {
  var _this = {}
  
  // Validate required contact fields
  _this.validate = function() {
    $('#contact_required_note, #contact_error').hide()
    $('#contact_message').html('Sending...').show()
    
    // Loop through each input, and see if it is required
    var error_message = ''
    $('#contact_form .required input').each(function(i, elem) {
      elem = $(elem)
      var parent = elem.parent()
      var val = $.trim(elem.val())
      var placeholder = elem.attr('placeholder')
      
      if(parent.hasClass('required') && (!val || val == placeholder || elem.hasClass('placeholder')))
        error_message += parent.find('label').text() + ' is required.<br />'

      $('.required :input[value=]').first().focus()
    })
    
    if(error_message) {
      $('#contact_message').hide()
      $('#contact_error').html(error_message).show()
      return false
    }
    else {
      $('#contact_form .placeholder').val('')
      return true
    }
  }
  
  
  // This is called when an email has been sent
  _this.sent = function(success) {
    if(success) {
      var message = 'Your information has been sent.<br />We will get back to you as soon as possible!'
      $('#contact_form ol').hide()
      $('#contact_message').html(message).show()
    }
    else {
      var error_message = 'Oops! There was a problem sending your information. Please try again later.'
      $('#contact_message').hide()
      $('#contact_error').html(error_message).show()
    }
    
  }
  
  return _this
}()



$(document).ready(function() {
  $(':input[placeholder]').each(function() {

    var $this = $(this)
    var placeholder = $this.attr('placeholder')
    var is_empty_or_placeholder = function() {
      var current_val = $this.val()
      return current_val == '' || current_val == placeholder
    }

    $this.addClass('placeholder').val(placeholder).bind({

      focus: function() {
        if(is_empty_or_placeholder()) $this.removeClass('placeholder').val('')
      },

      blur: function() {
        if(is_empty_or_placeholder()) $this.addClass('placeholder').val(placeholder)
      }

    })

  })
})