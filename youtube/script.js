var gapikey = 'AIzaSyCThPrvuKmK2EhbpzP16a3rirh5qHxAoj4';


$(function() {
    
    // Memangil plugin fancybox
    $(".fancyboxIframe").fancybox({
        player = new YT.Player('player', {
        maxWidth    : 10,
        maxHeight    : 10,
        fitToView    : true,
        width        : '10%',
        height        : '10%',
        autoSize    : true,
        closeClick    : false,
        openEffect    : 'move',
        closeEffect    : 'move',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        iframe: {
            scrolling : 'auto',
            position: 'relative',
        }
    });
});
    
    $('#search-form').submit( function(e) {
        e.preventDefault();
    });
});

function cariYoutube() {

    $('#hasil').html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Mohon Tunggu...</span>');
    $('#buttons').html('');
    
    // Untuk get form input
    q = $('#search').val();  
    
    // Untuk GET API youtube
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: gapikey
        }, function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            // Untuk Log data
            console.log(data);
            $('#hasil').html('');
            $.each(data.items, function(i, item) {
                
                // Get Output
                var output = getOutput(item);
                
                // Menampilan hasil
                $('#hasil').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            // Display buttons
            $('#buttons').append(buttons);
        });
}

// Fungsi next page
function nextPage() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    
    
    $('#hasil').html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
    $('#buttons').html('');
    
    // untuk get form input
    q = $('#search').val();
    
     // Untuk GET API youtube
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: gapikey
        }, function(data) {
            
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);
            $('#hasil').html('');
            $.each(data.items, function(i, item) {
                
       
                var output = getOutput(item);
                
                // Menampilkan hasil
                $('#hasil').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            // Display buttons
            $('#buttons').append(buttons);
        });    
}

// Fungsi Halaman Previus
function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    

    $('#hasil').html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Mohon Tunggu...</span>');
    $('#buttons').html('');
    
    // get form input
    q = $('#search').val(); 
    
     // Untuk GET API youtube
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: gapikey
        }, function(data) {
            
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            // Log data
            console.log(data);
            $('#hasil').html('');
            $.each(data.items, function(i, item) {
                
                // Get Output
                var output = getOutput(item);
                
                // Menampilkan 
                $('#hasil').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            // Display buttons
            $('#buttons').append(buttons);
        });    
}


function getOutput(item) {
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    

    var output =        '<div class="col-md-6">' +
                            '<img src="' + thumb + '" class="img-responsive thumbnail" >' +
                        '</div>' +
                        '<div class="input-group col-md-6">' +
                            '<h3><a data-fancybox-type="iframe" class="fancyboxIframe" href="http://youtube.com/embed/' + videoID + '?rel=0">' + title + '</a></h3>' +
                            '<small>By <span class="channel">' + channelTitle + '</span> on ' + videoDate + '</small>' +
                            '<p>' + description + '</p>' +
                        '</div>' +
                    '<div class="clearfix"></div>';
    return output;
}

function getButtons(prevPageToken, nextPageToken) {
    if(!prevPageToken) {
        var btnoutput =     '<ul class="pagination">' +
                                '<li><a href="javascript:;"  id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
                                    'onclick = "nextPage();">Next &raquo;</a></li>' +
                            '</ul>';
    } else {
        var btnoutput =     '<ul class="pagination">' +
                                '<li><a href="javascript:;" id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
                                    'onclick = "prevPage();">&laquo; Previous</a></li>' +            
                                '<li><a href="javascript:;" id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
                                    'onclick = "nextPage();">Next &raquo;</a></li>' +
                            '</ul>';        
    }
    
    return btnoutput;
}