setInterval(function(){time()},1000); // co sekundę wywołaj funkcje time
var sec = -1;
var mines = 5;
var ended = true;
var board;
var board2;

function time()
{
    if(sec>-1){
        $('#time').html(sec++);
    }
}




function GameBoard(n, m) {
	this.n = n;
	this.m = m;

	tmpboard = new Array(n);
	for (var i=0; i<tmpboard.length; i++){
		tmpboard[i] = new Array(m);
		for (var j=0; j<tmpboard[i].length; j++){
		    tmpboard[i][j]=0;
		}
	}

	$("#boardHTML").html("");	

    for(var i=0; i<n; i++){
        $("#boardHTML").append("<tr id=\"row"+i+"\">");
        for(var j=0; j<m; j++){
			$("#row"+i).append("<td id=\""+(parseInt(i)+1)+"_"+(parseInt(j)+1)+"\" ondblclick=\"cellClick(this)\" onclick=\"mine(this)\"></td>");
        }        
    }  

	board = tmpboard.slice(0);

	randomMines(n, m);
	countNeighbors();
}

// Funkcje
function randomMines(n, m){
    var tmp = 0;
    while(tmp<mines){
        var r = Math.floor((Math.random()*n));
        var c = Math.floor((Math.random()*m));
        if(board[r][c]!=-1){
            board[r][c]=-1;
            tmp++;
        }
    }
}


function countNeighbors(){
    for (var i=0; i<board.length; i++){
        for (var j=0; j<board[i].length; j++){
           if(board[i][j]!=-1){
                board[i][j]=countN(i,j);
           }
        }
    }
}


function countN(r, c){
    var count=0;
    for(var i=r-1; i<=r+1; i++){
        for(var j=c-1; j<=c+1; j++){
            if(i>-1 && i<board.length && j>-1 && j<board[i].length){
                if(board[i][j]==-1){
                    count++;
                }
            }
        }
    }
    return count;
}


function showMines(){
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if(board[i][j] == -1) {
				uncoverCell(i, j);
			}
		}
	}
}

function uncoverCell(r, c) {

	r = parseInt(r);
	c = parseInt(c);
    id = (parseInt(r)+1) + "_" + (parseInt(c)+1);

	if($('#'+id).html(board[r][c]) == 'x') {
		$('#'+id).html(board[r][c]);
	}

	if(board[r][c] == 0) {
		$('#'+id).html('');
	}

	//alert("field id: " + id + ", r: " + r + ", c:" + c);
	//alert("current class: " + $('#'+id).attr('class'));
	$('#'+id).removeClass();
	
	//alert("board size n: " + board.length);
	//alert("board contents: " + board[r][c].toString());
	if(board[r][c]==-1){
	    $('#'+id).addClass('mine');
		//alert("mine");
	} else if(board[r][c]==0) {
		//alert("emptyN");
	    $('#'+id).addClass('emptyN');
		for(var i=r-1; i<=r+1; i++){
			for(var j=c-1; j<=c+1; j++){
			    if(i>-1 && i<board.length && j>-1 && j<board[i].length
						&& $('#'+(parseInt(i)+1)+'_'+(parseInt(j)+1)).attr('class') == ''
						&& $('#'+(parseInt(i)+1)+'_'+(parseInt(j)+1)).attr('class') != 'black') {
			    	uncoverCell(parseInt(i), parseInt(j));
			    }
			}
		}
		//alert("recursion done");
	} else {
		//alert("empty");
	    $('#'+id).addClass('empty');
	}
	//alert("finished id " + id );

	

}

function cellClick(obj){
    var id = obj.id;
    var idR = id.substring(0, id.indexOf('_')); 
    var idC = id.substring(id.indexOf('_')+1, id.length);


	uncoverCell(parseInt(idR-1), parseInt(idC-1));
	
    if(board[idR-1][idC-1]==-1){
        alert('Koniec gry');
        $('#time').html(sec);
        sec=-1;
		showMines();
    }
}

function mine(obj){
    var id = obj.id;
    var idR = id.substring(0, id.indexOf('_')); 
    var idC = id.substring(id.indexOf('_')+1, id.length);
    $('#'+id).html('x');
    $('#'+id).removeClass();
    $('#'+id).addClass('black');
}

function start(n, m, minecount){
    sec = 0;
	ended = false;
	mines = minecount;
    board2 = new GameBoard(parseInt(n),parseInt(m));
    $("#start").unbind("click");
}

function startGame() {
	var width = document.getElementById('width').value;
  	var height = document.getElementById('height').value;
  	var minecount = document.getElementById('minecount').value;
 
 
	if ( width < 10 && height < 10
		&& width > 2 && height > 2) 
	{
		if(minecount < width*height/2) {
			start(height, width, minecount);
		} else {
			alert("Podaj ilość min mniejszą, niż pół rozmiaru mapy");
		}
	} else {
		alert("Podaj odpowiedni rozmiar planszy (min 3x3, max 9x9)");
	}        
}

$().ready(function () {
    $("#start").bind("click", function() {
		startGame();
	});
});


