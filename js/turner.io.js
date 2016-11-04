$(function() {

	var $cords = $("#cords"),
			$body = $("body"),
			$timeline = $("#timeline"),
			$events = $("#events .event"),
			born = moment("1981-08-01T15:00").unix(),
			now = moment().unix(),
			timespan = now - born,
			has_drawn_cords = false,
			$cords

	$events.each(function() {
		var m = moment( $(this).find("time").attr("datetime") )
		var percent =  (m.unix() - born) / timespan * 100
		$("<div class='marker' />").css("bottom", percent + "%").appendTo($timeline)
	})

	var $markers = $timeline.children(".marker")

	var draw_lines = function() {

		var timeline_top = $timeline.position().top

		$markers.each(function(i, el) {
			var marker_top = timeline_top + $(this).position().top + 10,
					event_top = $events.eq(i).offset().top - $(window).scrollTop() + 12

			if ( has_drawn_cords )
				$cords.eq(i).attr({"y1": marker_top, "y2": event_top})
			else
				$cords[0].innerHTML += '<line x1="0" x2="190" y1="'+marker_top+'" y2="'+event_top+'"></line>'
		})

		if ( !has_drawn_cords ) {
			$cords = $cords.find("line")
			has_drawn_cords = true
		}

	}

	draw_lines()
	$(window).scroll(draw_lines).resize(draw_lines)

})