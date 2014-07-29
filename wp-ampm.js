(function($){
	
	$(document).ready(function(){
		"use strict";
			
		// am/pm time
		
			// view part
			function ampmDatePreview() {
				var mins = $("#mn").val();
				
				var timestamp = $("#timestamp b").text();
				var ts_splitted = timestamp.split("@");
				
				timestamp = timestamp.replace(ts_splitted[1], '<span class="js-ampm">'+hours+':'+mins+dd+'</span><span style="display: none;">'+ts_splitted[1]+'</span>');
				
				$("#timestamp b").html(timestamp);
			}
			
			function ampmDateChanged() {
				var hours12 = parseInt($(".js-usa-hour").val());
				console.log("hours12",hours12);
				var mins = $("#mn").val();
				var hours = hours12;
				
				var dd = $(".js-usa-hours-type option:selected").val();
				
				if (hours12 >= 12) {
					hours = 12;
				}
				
				if (dd == 'pm') {
					hours = hours12 + 12;
				}
				console.log("hours",hours);
				$("#hh").val(hours);
				$(".js-ampm").text(hours12+':'+mins+dd);
			}
		
			if ($("#hh").size()) {
				
				// preparing
					// edit part
						$("#hh").hide();
						var hours = $("#hh").val();
						
						var dd = "am";
						if (hours >= 12) {
							hours = hours - 12;
							dd = "pm";
						}
						
						if (hours == 0) {
							hours = 12;
						}
				
				// view part
					ampmDatePreview();
						
				
				// adding new elements
					$("#hh").before('<input type="text" class="js-usa-hour" /><select class="js-usa-hours-type"><option value="am">AM</option><option value="pm">PM</option></select>');
					$(".js-usa-hours-type option[value='"+dd+"']").attr("selected", "selected").prop("selected", true);
				
				// changing
					$(".js-usa-hour").val(hours);
					$(".js-usa-hour, .js-usa-hours-type").on("change", function(){
						ampmDateChanged();
					});
					
					$(".save-timestamp").on("click", function(){
					
						ampmDatePreview();
						ampmDateChanged();
					});
				
				// styles
					$(".js-usa-hour, #jj, #mn").css("width", "2em");
			}
		
	});
})(jQuery);
