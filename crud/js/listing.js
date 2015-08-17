$(function()
{
        
   getMentorByOrg();    
	
	$('#addStudent').click(function(event){
		event.preventDefault();
		
		var disable = $(this);
		//disable.prop('disabled',true);
		$(this).prop('disabled',true);
		$.post('include/process.php?action=addStudent',$('#add-student-form').serialize(),function(resp)
		{
			//alert(resp);
			if (resp.success === true)
			{
				location.href = resp.redirect;
			}
			else
			{
				$(this).prop('disabled',false);
				$notice(resp.msg,'error');
			/*	setTimeout(function(){ 
					disable.prop('disabled',false); 
				},15);*/
			}
		},'json');
	});
        
      

});

function getMentorByOrg(){
	$.post('getMentorsByOrg/',function(resp)
		{
			console.log(resp);
			
			if(resp['results'].length>0) {
			var htm = "";
			var opthtm = "";
			var finalhtm = "";
			var numbr = 1;
			var oid = resp['results'][0]['oid'];
			for(var i=0; i<resp['results'].length; i++)
			{
				if(resp['results'][i]['oid'] == oid )
				{
					opthtm    = "<optgroup label='"+resp['results'][i]['name']+"'>";
					htm      += "<option value='"+resp['results'][i]['id']+"'>"+resp['results'][i]['first_name']+" "+resp['results'][i]['last_name']+"</option>";
				}
				else
				{
					finalhtm  += opthtm ;
					finalhtm  += htm ;
					finalhtm  += "</optgroup>";
					htm        = "";
				    oid        = resp['results'][i]['oid'];
					htm       += "<option value='"+resp['results'][i]['id']+"'>"+resp['results'][i]['first_name']+" "+resp['results'][i]['last_name']+"</option>";	
				}
				
				if(resp['results'].length == numbr)
				{
					opthtm        = "<optgroup label='"+resp['results'][i]['name']+"'>";
					finalhtm  += opthtm ;
					finalhtm  += htm ;
					finalhtm  += "</optgroup>";
				}
				
				numbr++;
			}
			}
			$('#mentor_id').html(finalhtm);
			
			
			if(resp['majors'].length>0)
		    {
				 var optin = "<option value=''>Select Major</option>";
				  for(var i=0; i<resp['majors'].length; i++)
				  {
					  if(resp['majors'][i]['type'] != "" && resp['majors'][i]['type'] != null)
					  optin +="<option value='"+resp['majors'][i]['type']+"'>"+resp['majors'][i]['type']+"</option>";
				  }
		    }
			else 
			{
				optin +="<option value=''>No Majors</option>";
			}
			
			$('#major_type').html(optin);

		});
	
	}
	
	function pouplateMentrInfo(id){
			$.post('getMentorsinfo/','id='+id,function(resp)
		    {
				console.log(resp);
				$('#mentor_email').val(resp['results'][0]['email']);
			    $('#mentor_phone').val(resp['results'][0]['phone']);
				$('#showmentorInfo').show();
		    });
		}
	function pouplateMinors(types){
		$.post('getMinorsinfo/','type='+types,function(resp)
		    {
				console.log(resp);
				if(resp['results'].length>0)
		    {
				 var optin = "";
				  for(var i=0; i<resp['results'].length; i++)
				  {
					  if(resp['results'][i]['name'] != "" && resp['results'][i]['name'] != null)
					  optin +="<option value='"+resp['results'][i]['id']+"'>"+resp['results'][i]['name']+"</option>";
				  }
		    }
			else 
			{
				optin +="<option value=''>No Minors</option>";
			}

			$('#major_id').html(optin);
			$('#showMinorInfor').show();
		    });
		
		}	