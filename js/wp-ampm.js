var WP_AMPM = {};

(function($){
	
	$(document).ready(function(){
		"use strict";
			
		// usa date
			WP_AMPM = {
				hours12: null,
				type: null,
				datePreview: function() {
					var mins = $("#mn").val();
					
					var timestamp = $("#timestamp b").text();
					var ts_splitted = timestamp.split("@");
					
					timestamp = timestamp.replace(ts_splitted[1], '<span class="js-ampm">'+this.hours12+':'+mins+this.type+'</span><span style="display: none;">'+ts_splitted[1]+'</span>');
					
					$("#timestamp b").html(timestamp);
				},
				
				dateChanged: function() {
					var hours24 = null;
					this.hours12 = parseInt($(".js-wpampm-hour").val());
					
					var mins = $("#mn").val();
					
					this.type = $(".js-wpampm-type option:selected").val();
					
					if (this.hours12 >= 12) {
						hours24 = 12;
					}
					
					if (this.type == 'pm') {
						hours24 = this.hours12 + 12;
					}
					
					$("#hh").val(hours24);
					$(".js-ampm").text(this.hours12+':'+mins+this.type);
				},
				
				addingNewElements: function() {
					$("#hh").hide();
					$("#hh").before('<input type="text" class="js-wpampm-hour wpampm-hour" value="'+this.hours12+'" /><select class="js-wpampm-type wpampm-type"><option value="am">AM</option><option value="pm">PM</option></select>');
					$(".js-wpampm-type option[value='"+this.type+"']").attr("selected", "selected").prop("selected", true);
				},
				
				setUpHours: function() {
					var hours24 = $("#hh").val();
					
					this.type = "am";
					if (hours24 >= 12) {
						this.hours12 = hours24 - 12;
						this.type = "pm";
					}
					else {
						this.hours12 = hours24;
					}
					
					if (this.hours12 == 0) {
						this.hours12 = 12;
					}
				}
			};
				
		
			if ($("#hh").size()) {

				// set up hours
					WP_AMPM.setUpHours();
			
				// adding new inputs
					WP_AMPM.addingNewElements();
					
				// view part
					WP_AMPM.datePreview();
				
				// changing					
					$(".save-timestamp").on("click", function(){
						WP_AMPM.datePreview();
						WP_AMPM.dateChanged();
					});
					
					$(".cancel-timestamp").on("click", function(){
						WP_AMPM.datePreview();
					});
			}
		
	});
})(jQuery);
