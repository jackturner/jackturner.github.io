$(function() {

	// Helper function from: http://stackoverflow.com/a/7557433/274826
	function isElementInViewport(el) {
		// special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}
		var rect = el.getBoundingClientRect();
		return (
		(rect.top <= 0
			&& rect.bottom >= 0)
		||
		(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.top <= (window.innerHeight || document.documentElement.clientHeight))
		||
		(rect.top >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
		);
	}

	var $life = $("#life"),
		$cords = $("#cords"),
		$body = $("body"),
		$timeline = $("#timeline"),
		$events = $("#events .event"),
		born = moment("1981-08-01T15:00").unix(),
		now = moment().unix(),
		timespan = now - born,
		has_drawn_cords = false,
		$cords,
		cord_width = $cords.width(),
		handle_distance = cord_width / 2

	$events.each(function() {
		var m = moment( $(this).find("time").attr("datetime") )
		var percent =  (m.unix() - born) / timespan * 100
		$("<div class='marker' />").css("bottom", percent + "%").appendTo($timeline)
	})

	var $markers = $timeline.children(".marker")

	var draw_lines = function() {


		var scrollTop = $(window).scrollTop(),
			timeline_top = $timeline.position().top,
			timeline_height = $timeline.height()

		$markers.each(function(i, el) {

			var $event = $events.eq(i),
				$cord = $cords.eq(i),
				y1 = timeline_height + (timeline_top - $(this).position().top),
				y2 = $event.offset().top - scrollTop + 17,
				path_str = 'M0 ' + y1 + ' C ' + handle_distance + ' ' + y1 + ', ' + (cord_width - handle_distance) + ' ' + y2 + ', ' + cord_width + ' ' + y2

			if ( isElementInViewport( $event ) )
				$cord.addClass('visible')

			if ( has_drawn_cords )
				$cords.eq(i).attr({"d": path_str})
			else
			  $cords[0].innerHTML += '<path d="'+path_str+'" stroke="#000" fill="transparent"/>'
		})

		if ( scrollTop < 20 ) $cords.removeClass( "visible" )

		if ( !has_drawn_cords ) {
			$cords = $cords.find("path")
			has_drawn_cords = true
		}

	}

	const callback = function(entries) {
		entries.forEach(entry => {
			entry.target.classList.toggle("is-visible")
		})
	}
	  
	const observer = new IntersectionObserver(callback)
	  
	const targets = document.querySelectorAll(".show-on-scroll")
	targets.forEach(function(target) {
		observer.observe(target)
	})

	draw_lines()
	$(window).scroll(draw_lines).resize(draw_lines)

})