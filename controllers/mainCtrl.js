angular.module("homeApp")
.constant("authUrl", "http://127.0.0.1/silex/web/")
.controller("mainCtrl", function($scope, $http, $location, authUrl) {

	
	/*domyślny język z którego tłumaczymy*/
	$scope.lang_version = 'polish';	
	
   /*domyślne ukrycie formularza dodawawnia słów*/
   $scope.show_word_forms = false;
   
   /*licznik zaktualizowanych rekordów*/
   $scope.updated_words =0;
   $scope.updated_words = 0;
   
	/*funkcja testowa*/
	$scope.test = function () {
        $http.get("http://127.0.0.1/silex/web/api_wer",
				"",
				{  }
				).then( function(data) {						
						$scope.authenticationError = null;
						$scope.response = data.data;
					},
				function(error) 
        {
			window.alert("Błąd:\n" + error.data );
            $scope.authenticationError = error;
			
        });
		
    }
	
	
	
	/*pobranie listy słówek*/
	$scope.get_word_list = function () {
        $http.get("http://127.0.0.1/silex/web/api_word_list",
				"",
				{  }
				).then( function(response) {						
						$scope.authenticationError = null;
						$scope.response = response.data;
						$scope.words = JSON.parse(''+ response.data.data);
						
					},
				function(error) 
        {
			window.alert("Błąd:\n" + error.data );
            $scope.authenticationError = error;
			
        });
		
    }
	
	
	
	$scope.get_word_list();
	/*aktualizacja danych */
	$scope.update_word = function (item,interval) {
			item.hide = true;
			item.updated = true;
			item.balance =  parseInt(item.balance) + interval;		
			item.reply_number =  parseInt(item.reply_number) +1;			
			var d = new Date();
			item.last_reply =ISODateString(d);
			$scope.updated_words++;	
			$scope.total_updated_words++;
			if($scope.updated_words >=10 ){			
				synchronize_words($scope.words);
				$scope.updated_words = 0;
			}
			if($scope.total_updated_words == 30){
				$scope.total_updated_words =0;
				//$scope.get_word_list();
			}
			
	}
	
	
	$scope.synchronize_words = function (items) {
			synchronize_words(items);
		
	}
	
	/*synchronizacja danych*/
	function synchronize_words(items) {
		if( typeof items === 'undefined' || items === null ){
			//TODO co jak zmienna jest pusta
			console.log("Próba synchronizacji pustej tabeli");
		}
		else {
		 $http.post("http://127.0.0.1/silex/web/api_update_words",
				items,
				{  }
				).then( function(response) {						
					$scope.response = response.data;	
						
					},
				function(error) 
			{
				window.alert("Błąd:\n" + error.data );          
			
        });
		
		}
	}
	
	
	
	
	
	
	/*ustawienie języka*/
	$scope.set_language = function (lang_version) {
       $scope.lang_version = lang_version;
		
    }
	
	/*ustawienie widoczności szczegółów*/
	$scope.show_details = function () {
		if($scope.details){
				 $scope.details = false;
		}
		else {
				$scope.details = true;
		}
		
    }
	
	
	/**/
	$scope.show_words_form = function () {
		if($scope.show_word_forms){
				 $scope.show_word_forms = false;
		}
		else {
				$scope.show_word_forms = true;
		}
		
    }
	
	
	
	/*konwersja daty do postaci poprawnej*/
	function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+' '
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+''
}
	
	
	
	
});