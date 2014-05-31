$(function() {

	$("#login-form").submit(function(e){
		$form = $("#login-form");
		$.ajax({
	        type: $form.attr('method'),
	        url: $form.attr('action'),
	        data: $form.serialize(),
	        success: function (msg) {
	        	alert(msg.status);
	     	},
	        error: function (err) {
	        	alert(err.responseText)
	        }
    	});
		return false;
	});
	
});