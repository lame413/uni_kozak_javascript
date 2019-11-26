setInterval(function(){time()},1000);
var sec = 0;
var ended = true;
var maxSec = -1;

function time()
{
	if (!ended) {
        $('#time').html(sec++);
		if (sec >= maxSec) {
			endGame();
		}
	}
}

function getId(strId) {
    arr = new Array(2);
    arr[0]=strId.substring(3, strId.indexOf('_'));
    arr[1]=strId.substring(strId.indexOf('_')+1, strId.length);
    return arr 
}



function Picture(accept) {
    this.val;
    do{
        rand = Math.floor(Math.random() * accept.length);
    }while(accept[rand]==2);
    accept[rand]++;
    this.val = rand;
}

function GameBoard(n,m) {
    this.n = n;
    this.m = m;
    
    score = 0;

    picBoard = new Array(n);
    last = -1;

    accepTab = new Array(n*m/2);
    for (var i=0; i<accepTab.length; i++){
        accepTab[i] = 0;
    }

    for (var i=0; i<picBoard.length; i++){
        picBoard[i] = new Array(m);
        for (var j=0; j<picBoard[i].length; j++){
            picBoard[i][j] = new Picture(accepTab);
        }
    }

    function getPicture(id) {
        return picBoard[id[0]][id[1]].val;
    }

    function show(obj){
		if($(obj).html() == "X") {
		    val = getPicture(getId(obj.id));
		    $(obj).html(val);
			if(last==-1){
		        last = val;
		        lastId = getId(obj.id);
		    } else {
				if (last==val) {
					$('#score').html(++score);
					tmpEnded = checkEnd();
				} else {
		            setTimeout(function(){
		                $(obj).html("X");
		                $("#col"+lastId[0]+"_"+lastId[1]).html("X");
		            }, 1000);
		            
		        }
		        last=-1;
		    }
		}
	
		if (tmpEnded) {
			tmpEnded = false;
			endGame();
		}
    }
	
	$("#board").html("");	

    for(var i=0; i<n; i++){
        $("#board").append("<div class=row id=row"+i+"> ");
        for(var j=0; j<m; j++){
			$("#board #row"+i).append("<span class=col id=col"+i+"_"+j+">X");
            $("#col"+i+"_"+j).bind("click", function() {
                show(this);
            });
        }        
    }    
}

function endGame() {
	if (!ended) {
		alert("Koniec gry, końcowy wynik: " + $('#score').html() + ", osiągnięty w " + sec + " sekund.");
		ended = true;

	    for(var i=0; i<picBoard.length; i++){
	        for(var j=0; j<picBoard[i].length; j++){
	            $("#col"+i+"_"+j).unbind("click");
            }
        }

		$("#start").bind("click", function() {
			startGame();
		});
    }    

}

function checkEnd() {
	// checks if all the fields are uncovered, a better solution is possible
	// fe. check if the score is equal to the max possible score for said board
	// scoring is wonky though, so not going for that
	for (var i = 0; i < picBoard.length; i++) {
		for (var j = 0; j < picBoard[i].length; j++) {
			if ($("#col"+i+"_"+j).html() == "X") {
				return false;
			}
		}
	}
	return true;
}

var board;

function start(n, m){
    sec = 0;
	ended = false;
    board = new GameBoard(parseInt(n),parseInt(m));
    $("#start").unbind("click");
}


function startGame() {
	var width = document.getElementById('width').value;
  	var height = document.getElementById('height').value;
	var timelimit = document.getElementById('timelimit').value;
 
	if ((width*height) % 2 == 0 
		&& (width*height) > 3
	    && width < 10
	    && height < 10) 
	{
		if (timelimit > 0) {
			maxSec = timelimit;
			start(height, width);
		} else {
			alert("Podaj maksymalny czas gry wyższy od 0.");
		}
	} else {
		alert("Podaj parzysty rozmiar planszy (min. 2x2, max. 9x9)");
	}        
}

$().ready(function () {
    $("#start").bind("click", function() {
		startGame();
	});
});

/*


Wczytać wielkość planszy i przekazać w parametrze do konstruktora, przy okazji:

   - założyć maksymalną i minimalną wielkość oraz sprawdzić poprawność tych wartości,
   - sprawdzić, czy iloczyn liczby wierszy i kolumn jest parzysty.

Dodać zakończenie gry:

   - po skończonym czasie (np. podanym przez użytkownika) – podać liczbę punktów,
   - po odkryciu wszystkich pól – podać czas,
   - dodać możliwość gry od nowa.

*/
