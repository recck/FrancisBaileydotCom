

$( document ).ready( function() {

		
		
	//Courtesy of CSS-Tricks: http://css-tricks.com/snippets/jquery/smooth-scrolling/
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			&& location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 500);
					return false;
				}
			}
		});
	});
	
	
	//Fix for android phones
	viewport = document.querySelector("meta[name=viewport]");
	
	if ( navigator.userAgent.match(/Android/i) )
	{
		viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0;' );
	}
	
	//Responsive Menu
	var navMenu = $( '.full-menu' );
	var resMenu = $( '.mobile-menu' );
	
	resMenu.on( "click", function()
	{
		navMenu.slideToggle(100);
	});
	
	$( '.menu-li a' ).on( 'click', function()
	{
		if ( navMenu.is( ':visible' ) && resMenu.is( ':visible' ) )
		{
			navMenu.slideUp();
		}
	}); 
	
	$( window ).on( "resize", function() 
	{
		if ( $( this ).width() > 768 )
			navMenu.css( 'display', 'block' );
		else
			navMenu.css( 'display', 'none' );
	});
	
	
	
	//Project Dialog
	$( '.project-logos' ).on( 'click', 'img', function( e ) 
	{
		e.preventDefault();
		$( '#' + e.target.id + '-splash' ).fadeIn();
	});
	
	$( '.splash, .close' ).on( 'click', function()
	{
		$( '.splash' ).fadeOut();
	});
	
	$( '.popup' ).on( 'click', function( e )
	{
		e.stopPropagation();
	});
	
		
	//Ajax Request
	$( '#contact' ).submit( function( event ) {
	
		event.preventDefault();
		resetFormErrors();
		
		var button = $( '.contact-button' );
		button.prop( 'disabled', true ).val("Sending").addClass( 'button-animate' );
		var old = button.val();
		var n = setInterval( function()	{
			button.val( old + '.' );
			old = button.val();
			if( old === "Sending...." )
				old = "Sending";
			else 
				return;
		}, 800 );
		
		
		$.post( "contact.php", $( '#contact' ).serialize() )
		
		.done( function( data ) {
			handleResponse( data );
		})
		.fail( function( data ) {
			console.log( data );
		})
		.always( function() {
			button.prop( 'disabled', false ).val( 'Contact Me' ).removeClass( 'button-animate' );
			clearInterval( n );
		});
		
	});

	
	//Handle Errors and Messages
	function handleResponse( data )
	{
		if ( data['status'] == true )
		{
			alert( 'success' );
		}
		else
		{
			if ( typeof(data['error']['all']) == 'undefined' )
			{
				$.each( data['error'], function( field, error ) 
				{
					$( '.msg-container' )
					.append( '<p class="error">' + error + '</p>' );
					
					$( '[name=' + field + ']' ).css( 'border', '1px solid #e74c3c'); 
							
				});
			}
			else
			{
				alert( data['error']['all'] );
			}
			scrollToErrors();
		}	
	}
	
	function resetFormErrors()
	{
		var fields = [ 'name', 'email', 'msg' ];
		
		for ( var i = 0; i < fields.length; i++ )
		{
			$( '[name=' + fields[i] + ']' ).css( 'border', '1px solid #95a5a6' );
			$( '.msg-container' ).html( '' );
		}
	}
	
	//Scrolls to errors on mobile phone
	function scrollToErrors()
	{
		if ( $( window ).height() < 450 )
		{
			$( 'html, body' ).animate( {scrollTop: $( '.msg-container' )
			.offset().top }, 'slow' );
		}
	}
			
});
	
	
