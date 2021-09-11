var socket = io();

// scroll to bottom every time add a new message
// determines whether should scroll to bottom
// scroll to bottom if necessary
function scrollToBottom() {

    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to the server ...');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            window.location.href = '/';
        } else {
            console.log('No error!');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server ...');
});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    })
    jQuery('#users').html(ol);
})

var timeout;
var typing;

// timeout function to indicate that typing has stopped
function timeoutFunction() {
    typing = false;
    socket.emit('typing', false);
}

// keyup event listener 
// while typing is true, keep typing message alive
jQuery('[name=message]').keyup(function(data) {
    console.log('Happening');
    typing = true;
    socket.emit('typing', data);
    timeout = setTimeout(timeoutFunction, 50);
})

// custom (typing) event to let everyone in room know who is typing
socket.on('typing', function(data) {
    if (data) {
        jQuery('ol#typing').html(data);
    } else {
        jQuery('ol#typing').html('');
    }
})

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('H:mm:ss a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    jQuery('ol#typing').html('');
    scrollToBottom();
})

// for creating location url
socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('H:mm:ss a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        // just sending text across now because the name is
        // being stored by server.js in socket.id
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('')
        jQuery('ol#typing').html('');
    })
});
// so that user cannot submit message using enter/return key
jQuery(window).keydown(function(e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
        e.preventDefault();
        return false;
    }
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('geolocation is not supported by your browser!');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            locationButton.removeAttr('disabled').text('Send location');
            // adding coords object in users position
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        },
        function() {
            locationButton.removeAttr('disabled').text('Send location');
            alert('unable to fetch location');
        })
})