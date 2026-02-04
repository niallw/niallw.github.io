jQuery(document).ready( function($){
// Some event will trigger the ajax call, you can push whatever data to the server, 
// simply passing it to the "data" object in ajax call
$('.saveoptions').on('click', 'div.savepost', function(){
	var postID = $("#postID").val();
	var userID = $("#userID").val();
	$.ajax({
			url: ajax_object.ajaxurl, // this is the object instantiated in wp_localize_script function
			type: 'POST',
			data:{ 
			action: 'savepost', // this is the function in your functions.php that will be triggered
			postid: postID,
			userid: userID
		},
		success: function( data ){
			//Do something with the result from server
			console.log( data );
		}
	});
	$('.savepost').html('<i class="fas fa-bookmark"></i> Saved');
	$('.savepost').addClass('savedpost').removeClass('savepost');
	
	$('<div class="deletepost"><i class="fas fa-minus-circle"></i> Remove</div>').insertBefore( $('.managepost') );
	$('.deletepost').css({"margin": "0 5px 5px 0"});
});
	
$('.saveoptions').on('click', 'div.deletepost', function(){
	var postID = $("#postID").val();
	var userID = $("#userID").val();
	$.ajax({
			url: ajax_object.ajaxurl, // this is the object instantiated in wp_localize_script function
			type: 'POST',
			data:{ 
			action: 'deletepost', // this is the function in your functions.php that will be triggered
			postid: postID,
			userid: userID
		},
		success: function( data ){
			//Do something with the result from server
			console.log( data );
		}
	});
	$('.deletepost').fadeTo(1000, 0.01, function(){ 
		$(this).slideUp(150, function() {
			$(this).remove(); 
		}); 
	});
	$('.savedpost').addClass('savepost').removeClass('savedpost');
	$('.savepost').html('<i class="far fa-bookmark"></i> Save');
});
$('.userposts').hover(
	function(){
		var neededID = $(this).attr("id");
		var splitID = neededID.split("_");
		var postID = splitID[0];
		var userID = splitID[1];
		var htmlAdd = `<div class="deletepostsmall"><i class="fas fa-minus-circle"></i><input type="hidden" id="status" value="delete" /><input type="hidden" id="postID" value="${postID}" /><input type="hidden" id="userID" value="${userID}" /></div>`;
		$(this).prepend(htmlAdd);
	},
	function(){
		$('.deletepostsmall').remove();
	}
);

$('.userposts').on('click', 'div.deletepostsmall', function(){
	var postID = $("#postID").val();
	var userID = $("#userID").val();
	var containerID = postID+"_"+userID;
	console.log(containerID);
	$.ajax({
			url: ajax_object.ajaxurl, // this is the object instantiated in wp_localize_script function
			type: 'POST',
			data:{ 
			action: 'deletepost', // this is the function in your functions.php that will be triggered
			postid: postID,
			userid: userID
		},
		success: function( data ){
			//Do something with the result from server
			console.log( data );
		} 
	});
	$(`#${containerID}`).fadeTo(1000, 0.01, function(){ 
		$('#'+containerID).slideUp(150, function() {
			$('#'+containerID).remove(); 
		}); 
	});
});
});