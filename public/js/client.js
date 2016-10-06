$(function() {
	// ask the server for songs, and then draw them
	getSongs();
	// listen for submit events and send new songs to the server
	$('form').on('submit', function(event) {
		event.preventDefault();
		var formData = $(this).serialize();
		$.ajax({
			type: 'POST',
			url: '/songs',
			data: formData,
			success: getSongs,
			statusCode: {
				403: function() {
					alert('You have blank fields!')
				},
				409: function() {
					alert('That song is already here!')
				}
			}
		});
		$(this).find('input[type=text]').val('');
	});
	$('ul').on('click', 'button', function() {
		console.log('I was clicked');
		var index = $(this).attr('id');
		$.ajax({
			type: 'POST',
			url: '/songs/delete',
			data: 'index=' + index,
			success: function() {
				$('#songs').empty();
				getSongs();
			}
		})
	})
});

function getSongs() {
	$.ajax({
		type: 'GET',
		url: '/songs',
		success: function(songs) {
			$('#songs').empty();
			var i = 0;
			songs.forEach(function(song) {
				var $li = $('<li></li>');
				$li.append('<p>' + song.title + '</p>');
				$li.append('<p>by: ' + song.artist + '</p>');
				$li.append('<p>Time added: ' + song.date + '</p>')
				$li.append('<button class="delete" id="' + i + '">Delete</button></li>')
				$('#songs').append($li);
				i++;
			});
		}
	});
}
