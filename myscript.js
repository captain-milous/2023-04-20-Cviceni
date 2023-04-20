$(document).ready(function(){

	// Funkce pro uložení přihlašovacích údajů do JSON soubor
	function saveData(){

		var username = $("#R-username").val();
		var password = $("#R-password").val();
		var loginData = { "username": username, "password": password };
		var jsonString = JSON.stringify(loginData);

		$.ajax({
			type: "POST",
			url: "data.json",
			data: jsonString,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(){
					alert("Přihlašovací údaje byly uloženy.");
				},
			error: function(){
					alert("Nepodařilo se uložit přihlašovací údaje.");
				}
		});
	}
			
	function loginUser(){
		var username = $("#L-username").val();
		var password = $("#L-password").val();
				
		$.ajax({
			type: "GET",
			url: "data.json",
			dataType: "json",
			success: function(data){
				if(data.username == username && data.password == password){
					alert("Byli jste úspěšně přihlášeni.");
				}
				else{
					alert("Chybné přihlašovací údaje.");
				}
			},
			error: function(){
				alert("Nepodařilo se načíst přihlašovací údaje.");
			}
		});
	}

	$.getJSON('data.json', function(data) {
		// uložení dat do proměnné
		var users = data;

		// funkce pro přihlášení uživatele
		function login(username, password) {
			// projití seznamu uživatelů
			for (var i = 0; i < users.length; i++) {
				// pokud najdeme uživatele se správným jménem a heslem
				if (users[i].username === username && users[i].password === password) {
					// uložíme údaje o přihlášeném uživateli do session storage
					sessionStorage.setItem('loggedUser', JSON.stringify(users[i]));
					// přesměrujeme na hlavní stránku
					window.location.href = 'index.html';
					return true;
				}
			}
			return false;
		}

		$('#loginForm').submit(function(event) {

			event.preventDefault();
			console.log("Submit Přihlášení");
			var username = $('#L-username').val();
			var password = $('#L-password').val();

			if (login(username, password)) {
				alert('Přihlášení proběhlo úspěšně.');
			} else {
				alert('Zadané údaje jsou chybné.');
			}
		});
	});

	$.getJSON('data.json', function(data) {
		var users = data;

		function register(username, password) {
			for (var i = 0; i < users.length; i++) {
				if (users[i].username === username) {
					alert('Uživatelské jméno již existuje.');
					return false;
				}
			}
			var newUser = {
				username: username,
				password: password
			};
			users.push(newUser);
			$.ajax({
				type: 'POST',
				url: 'save.php',
				data: {data: JSON.stringify(users)},
				success: function() {
					alert('Registrace proběhla úspěšně.');
				},
				error: function() {
					alert('Nepodařilo se uložit nové údaje.');
				}
			});
		}

		$('#registrationForm').submit(function(event) {
			saveData();
			event.preventDefault();
			console.log("Submit Registrace");
			var username = $('#R-username').val();
			var password = $('#R-password').val();
			console.log(username+" "+password);

			if (register(username, password)) {
				alert('Registrace proběhla úspěšně.');
			} else {
				alert('Uživatel již existuje.');
			}
		});
	});


	
});
