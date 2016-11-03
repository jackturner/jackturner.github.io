var s = Snap( "#cords" )

var l = s.line( 0, 100, 200, 215 ).attr( { stroke: 'rgb(0,0,0)', 'stroke-width': 2 } )
var l = s.line( 0, 120, 200, 310 ).attr( { stroke: 'rgb(0,0,0)', 'stroke-width': 2 } )
var l = s.line( 0, 190, 200, 400 ).attr( { stroke: 'rgb(0,0,0)', 'stroke-width': 2 } )


$(function() {

	var $timeline = $("#timeline"),
			born = moment("1981-08-01T15:00").unix(),
			now = moment().unix(),
			timespan = now - born

	$("#events .event time").each(function() {
		var date_str = $(this).attr("datetime")
		var m = moment(date_str)
		var percent =  (m.unix() - born) / timespan * 100
		$("<div class='marker' />").css("bottom", percent + "%").appendTo($timeline)
		console.log(top)
	})

})
