setInterval(function(){time()},1000); // co sekundę wywołaj funkcje time
var sec = 0;

function time()
{
    if(sec>-1){
        $('#time').html(sec++);
    }
}


var board = new Array(5)
for (var i=0; i<board.length; i++){
    board[i] = new Array(5);
    for (var j=0; j<board[i].length; j++){
        board[i][j]=0;
    }
}

randomMines();
countNeighbors();

// Funkcje
function randomMines(){
    var tmp = 0;
    while(tmp<5){
        var r = Math.floor((Math.random()*5));
        var c = Math.floor((Math.random()*5));
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

function cellClick(obj){
    var id = obj.id;
    var idR = id.substring(0, id.indexOf('_')); 
    var idC = id.substring(id.indexOf('_')+1, id.length);
    
    $('#'+id).removeClass();
    if(board[idR-1][idC-1]==-1){
        $('#'+id).addClass('mine');
    } else if(board[idR-1][idC-1]==0){
        $('#'+id).addClass('emptyN');
    } else {
        $('#'+id).addClass('empty');
    }

    $('#'+id).html(board[idR-1][idC-1]);

    if(board[idR-1][idC-1]==-1){
        alert('Koniec gry');
        $('#time').html(sec);
        sec=-1;
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
