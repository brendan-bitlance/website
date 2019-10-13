/**
 * Fallback placeholder behaviour for non HTML5 browsers.
 * 
 * @author Brendan Markham
 * @version 3rd March 2012
 */
$(function() {
	var placeholders = $("input[type='text'], input[type='email'], textarea");
	var empty_class = "empty";

	function prefil_with_placeholder(input) {
		var value = input.val();
		var placeholder = input.attr("placeholder");

		if (placeholder) {
			if (value === "") {
				input.val(placeholder);
				value = placeholder;
			}
			if (value === placeholder) {
				input.addClass(empty_class);
			} else if (input.hasClass(empty_class)) {
				input.removeClass(empty_class);
			}
		}
	}

	placeholders.each(function() {
		prefil_with_placeholder($(this));
	});

	placeholders.focus(function() {
		var input = $(this);

		if (input.hasClass(empty_class)) {
			$(this).removeClass(empty_class).val("");
		}
	});

	placeholders.blur(function() {
		prefil_with_placeholder($(this));
	});
});