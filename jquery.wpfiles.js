/*
 	jquery.wpfiles
	
	This plugin give smart developers power to use wordpress's built in file handling and upload in their meta_box interfaces

*/

(function($){
	$(window).ready(function(){
		$.fn.wpfiles = function(callback){
			this.live('click',function(e){
				e.preventDefault();

				var button = $(this);
				var input = $('input[name="'+button.attr('rel')+'"]');
				var original_callback = window.send_to_editor;

				var new_callback = function(html){
					var src = $(html).attr('href');
					if(input.length > 0)input.val(src);
					callback.apply(button,[src]);
					tb_remove();
				};

				clearInterval(window.tb_observer);
				
				window.tb_observer = setInterval(function(){
					if($('#TB_window').length > 0) return false;
					clearInterval(window.tb_observer);
					window.send_to_editor = original_callback;
				},500);

				window.send_to_editor = new_callback;
				tb_show('Files', 'media-upload.php?post_id=1&amp;type=image&amp;TB_iframe=true');
			});
		}
	});
})(jQuery);