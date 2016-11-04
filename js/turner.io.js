$(function() {

	var $cords = $("#cords"),
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

		var timeline_top = $timeline.position().top

		$markers.each(function(i, el) {
			var y1 = timeline_top + $(this).position().top + 10,
					y2 = $events.eq(i).offset().top - $(window).scrollTop() + 12,
					path_str = 'M0 ' + y1 + ' C ' + handle_distance + ' ' + y1 + ', ' + (cord_width - handle_distance) + ' ' + y2 + ', ' + cord_width + ' ' + y2

			if ( has_drawn_cords )
				$cords.eq(i).attr({"d": path_str})
			else
				// $cords[0].innerHTML += '<line x1="0" x2="190" y1="'+y1+'" y2="'+y2+'"></line>'
			  $cords[0].innerHTML += '<path d="'+path_str+'" stroke="black" fill="transparent"/>'

		})

		if ( !has_drawn_cords ) {
			$cords = $cords.find("path")
			has_drawn_cords = true
		}

	}

	draw_lines()
	$(window).scroll(draw_lines).resize(draw_lines)

})