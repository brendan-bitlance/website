var SLIDER_WINDOW = "div.slider-window";
var SLIDER_LISTENER = "div.slider-controls a";
var SLIDER_CONTAINER = SLIDER_WINDOW + " ol";
var SLIDER_SUBJECT = "li.slider-slide";
var SLIDER_APPEND = 1;
var SLIDER_PREPEND = 2;
var SLIDER_LAST_INDEX = $(SLIDER_CONTAINER + " " + SLIDER_SUBJECT).length - 1;
var SLIDER_SPEED = 500;
var slider_active = false;
var slider_interval = null;
var window_width = $(window).width();

function slider_next() {
	var width = slider_get_window_width();
	if (slider_set_active()) {
		$(SLIDER_WINDOW).animate({"opacity": 0}, SLIDER_SPEED, function() {
			slider_move(0, SLIDER_APPEND);
			$(this).animate({"scrollLeft": width}, 0).animate({"opacity": 1}, SLIDER_SPEED);
			slider_set_inactive();
		});
	}
}

function slider_prev() {
	var width = slider_get_window_width();
	if (slider_set_active()) {
		$(SLIDER_WINDOW).animate({"opacity": 0}, SLIDER_SPEED, function() {
			slider_move(SLIDER_LAST_INDEX, SLIDER_PREPEND);
			$(this).animate({"scrollLeft": width}, 0).animate({"opacity": 1}, SLIDER_SPEED);
			slider_set_inactive();
		});
	}
}

function slider_set_active() {
	if (slider_active) {
		return false;
	} else {
		slider_active = true;
		return slider_active;
	}
}

function slider_set_inactive() {
	slider_active = false;
}

function slider_move(index, where) {
	var subject = $(SLIDER_CONTAINER + " " + SLIDER_SUBJECT).eq(index);
	switch (where) {
		case SLIDER_PREPEND:
			subject.prependTo($(SLIDER_CONTAINER));
			break;
		case SLIDER_APPEND:
		default:
			subject.appendTo($(SLIDER_CONTAINER));
	}
}

function slider_get_window_width() {
	return $(SLIDER_WINDOW).width();
}

function slider_resize_handler() {
	clearInterval(slider_interval);
	slider_next();
}

$(window).resize(function() {
	var new_width = $(window).width();
	if (window_width !== new_width) {
		window_width = new_width;
		clearInterval(slider_interval);
		slider_interval = setInterval(slider_resize_handler, 500);
	}
});


$(function() {
	// Move slides into position for animation.
	$(SLIDER_WINDOW).animate({"scrollLeft": 0}, 0, function() {
		slider_move(SLIDER_LAST_INDEX, SLIDER_PREPEND);
		$(this).animate({"scrollLeft": slider_get_window_width()}, 0);
	});

	// Listen for action button clicks.
	$(SLIDER_LISTENER).click(function(e) {
		switch ($(this).attr("href")) {
			case "#prev":
				slider_prev();
				break;
			case "#next":
			default:
				slider_next();
		}
		e.preventDefault();
	});
});

$(SLIDER_WINDOW).css("overflow-x", "hidden");