var $exp = $("time .exponent")
var exp

var update = function() {
	var d = new Date()
	exp = parseInt(d.getHours()%12 +''+ ('0'  + d.getMinutes()).slice(-2))
	console.log(exp)
    exp = Math.log2(exp)
    exp = Math.round(exp * 100) / 100
	$exp.text(exp)
}

setInterval(update, 1000)
update()
