$(function()
{
	$('#addStudent').click(function(event){
		event.preventDefault();
		var disable = $(this);
		disable.prop('disabled',true);
		$(this).prop('disabled',true);
		$.post('include/process.php?action=addStudent',$('#add-student-form').serialize(),function(resp)
		{
			console.log(resp);
			if (resp['status'] == true)
			{
				$("#success-msg").html(resp['msg']);
				$("#success-msg").show();
				setTimeout(function()
				{ 
				location.href = "list.php";
				 },4000);
			}
			else
			{
				alert('else');
				var htm = '<button data-dismiss="alert" class="close" type="button">×</button>';
				$.each(resp['msg'],function(index,val){
					htm += val+" <br>";
					});
					alert(htm);
				$("#error-msg").html(htm);
				$("#error-msg").show();	
				$(this).prop('disabled',false);
			}
		},'json');
	});
	
	
	
	$('#editStudent').click(function(event){
		event.preventDefault();
		var disable = $(this);
		disable.prop('disabled',true);
		$(this).prop('disabled',true);
		$.post('include/process.php?action=editStudent',$('#edit-student-form').serialize(),function(resp)
		{
			if (resp['status'] == true)
			{
				$("#success-msg").html(resp['msg']);
				$("#success-msg").show();
				setTimeout(function()
				{ 
				location.href = "list.php";
				 },4000);
			}
			else
			{
				var htm = '<button data-dismiss="alert" class="close" type="button">×</button>';
				$.each(resp['msg'],function(index,val){
					htm += val+" <br>";
					});
				$("#error-msg").html(htm);
				$("#error-msg").show();	
				$(this).prop('disabled',false);
			}
		},'json');
	});
});


function getStudentId(student_id)
{
	var result = confirm("Want to delete record?");
	var student_id = "student_id="+student_id;
    if (result) {
		
		$.post('include/process.php?action=deleteStudent',student_id,function(resp)
		{
			if (resp['status'] == true)
			{
				$("#row_num_"+student_id).html('');
				$("#success-msg").html(resp['msg']);
				$("#success-msg").show();
			}
			else
			{
				$("#error-msg").html(htm);
				$("#error-msg").show();	
			}
		},'json');
    }	
}

