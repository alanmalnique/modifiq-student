/// coloca mascaras de acordo com o tipo
function mascaraTipos(){
	
	/// percorre todos os campos do tipo telefone
	$("[tipo=telefone]").each(function(index, element) {
        var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, ''); 
		if (phone.length > 10) {
			element.mask("(99) 99999-999?9"); 
		} else { 
			element.mask("(99) 9999-9999?9"); 
		} 
    });
	$("[tipo=telefone]").focus(function(){ 
		var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, ''); 
		if (phone.length > 10) {
			element.mask("(99) 99999-999?9"); 
		} else { 
			element.mask("(99) 9999-9999?9"); 
		} 
	}); 
	$("[tipo=telefone]").focusout(function () { 
		var phone, element;
		element = $(this);
		element.unmask();
		phone = element.val().replace(/\D/g, '');
		if (phone.length > 10) {
			element.mask("(99) 99999-999?9"); 
		} else { 
			element.mask("(99) 9999-9999?9"); 
		} 
	});
	
	
	
	/// percorre todos os campos do tipo cep
	$("[tipo=cep]").mask('99.999-999');
	
	/// percorre todos os campos do tipo rg
	$("[tipo=rg]").mask('99.999.999-*');
	
	/// percorre todos os campos do tipo mascara
	$("[temmascara=sim]").each(function(){
		$(this).mask($(this).attr('mascara'));
	});

	/// percorre todos os campos do tipo cpf
	$("[tipo=cpf]").mask('999.999.999-99');
	
	/// percorre todos os campos do tipo cnpj
	$("[tipo=cnpj]").mask('99.999.999/9999-99');
	
	/// percorre todos os campos do tipo data
	$("[tipo=data]").mask('99/99/9999');
	
	/// percorre todos os campos do tipo datahora
	$("[tipo=datahora]").mask('99/99/9999 99:99');	
}

/// assim que carregar o site...
$(document).ready(function(){	
	mascaraTipos();
});