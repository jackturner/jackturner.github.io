var s = Snap( "#cords" )

// var l = s.line( 0, 100, 200, 215 ).attr( { stroke: 'rgb(0,0,0)', 'stroke-width': 2 } )
// var l = s.line( 0, 120, 200, 310 ).attr( { stroke: 'rgb(0,0,0)', 'stroke-width': 2 } )
// var l = s.line( 0, 190, 200, 400 ).attr( { stroke: 'rgb(0,0,0)', 'stroke-width': 2 } )


$(function() {

	var $body = $("body"),
			$timeline = $("#timeline"),
			$events = $("#events .event"),
			born = moment("1981-08-01T15:00").unix(),
			now = moment().unix(),
			timespan = now - born

	$events.each(function() {
		var m = moment( $(this).find("time").attr("datetime") )
		var percent =  (m.unix() - born) / timespan * 100
		$("<div class='marker' />").css("bottom", percent + "%").appendTo($timeline)
	})

	var $markers = $timeline.children(".marker")

	var draw_lines = function() {

		var timeline_top = $timeline.position().top

		s.clear()

		$markers.each(function(i, el) {
			if(i==0) console.log($events.eq(i).scrollTop())
			var marker_top = timeline_top + $(this).position().top + 10
			var event_top = $events.eq(i).offset().top + 12 - $body.scrollTop()
			var l = s.line( 0, marker_top, 200, event_top ).attr( { stroke: 'rgb(0,0,0)', 'stroke-width': 2 } )
		})	

	}

	draw_lines()
	$(window).scroll(draw_lines).resize(draw_lines)

})
