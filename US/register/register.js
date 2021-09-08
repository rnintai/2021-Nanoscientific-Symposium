jQuery('#theForm').submit(function(event){ 
    event.preventDefault();  
    
    var isSubmit = false; 
    jQuery.ajax({ 
        url:'[주소]', 
        type:'post', 
        data:jQuery('form').serialize(), 
        dataType:'json',
        async: false, 
        success:function(data) { 
            var message = data.message;
            console.log(data.message);
        }
    });
});
