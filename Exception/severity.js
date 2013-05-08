define([],
function(){
	return {
        NOTICE   : 1,
        WARNING  : 2,
        ERROR    : 3,
        codeToString: function(code){
            if (code == 3){
                return 'ERROR';
            }
            if (code == 2){
                return 'WARNING';
            }
            if (code == 1){
                return 'NOTICE';
            }
            return code;
        }
    }
});
