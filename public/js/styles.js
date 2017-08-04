$('.grupo input').focus(
    function(){
        $(this).parent('.grupo').parent('.box').css('border-color','#ffd08c');
        $(this).parent('.grupo').css('border-color','#ffd08c');
    }).blur(
    function(){
        $(this).parent('.grupo').css('border-color','#ddd');
        $(this).parent('.grupo').parent('.box').css('border-color','#ddd');
    });

$('.box').hover(
    function(){
    	if(!$(this).children('.grupo').children('input').is(':focus')){
        $(this).css('border-color','#ffd08c');
    }
    },
    function(){
    	if(!$(this).children('.grupo').children('input').is(':focus')){
        $(this).css('border-color','#ddd');
    }
    });

$('.grupo').hover(
    function(){
    	if(!$(this).children('input').is(':focus')){
        $(this).css('border-color','#ffd08c');
    }
    },
    function(){
    	if(!$(this).children('input').is(':focus')){
        $(this).css('border-color','#ddd');
    }
    });

