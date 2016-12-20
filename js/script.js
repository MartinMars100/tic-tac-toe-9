var gameRun = (function(){
    //The following 3 variables will be used to build the 3 screens, start, board-play and win
    var htmlStart = '<div class="screen screen-start" id="start">' +
      '<header>' +
      '<h1>Tic Tac Toe</h1>' +
      '<p class="intro-message">Pick an opponent</p>' +
      '<div class="player-names">' +
      '	<input type="text" placeholder="Player One" id="p1-name" class="p1-name">' +
      '	<input type="text" placeholder="Player Two" id="p2-name" class="p2-name">' +
      '</div>' +
      
      '<a href="#" class="button btn-opp-human">Human</a>' +
      '<a href="#" class="button btn-opp-computer">Computer</a>' +
      '<a href="#" class="button btn-start">Start game</a>' +
      '</header>';
    
   var htmlBoard = '<div class="board" id="board"><header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><h2 id="p1-name-text"></h2><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
    '<g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/>' +
    '</g></g></g></svg></li><li class="players" id="player2"><h2 id="p2-name-text"></h2><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)">' +
    '<path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header>' +
    '<ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li> <li class="box"></li></ul></div>';
  
   var htmlWin = '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p id="message" class="message"></p><a href="#" id="new-game-button" class="button">New game</a></header></div>';
 
  return {
    start: function(){  // Start screen Has a header Tic-Tac-Toe and Buttons Human and Opponent
      $('body div').remove();
      $('body').prepend(htmlStart);
      $('.p1-name').hide();
      $('.p2-name').hide();
      $('.btn-start').hide();
      
      $(".btn-opp-human").on('click', function() { //Player chooses a human opponet
        $('.btn-start').show();
        $('.p1-name').show();                      //Player names will be entered
        $('.p2-name').show();

        $('.intro-message').html("Enter Player Names");
        $('.btn-opp-human').hide();
        $('.btn-opp-computer').hide();
        $('#p1-name').focus();
        $('#p2-name').addClass('grayBackground');
        $('#p1-name').addClass('whiteBackground');
      });
      
       $(".btn-opp-computer").on('click', function() { //Player chooses the computer as opponent
        $('.btn-start').show();
        $('.p1-name').show();                          // Play can enter their name
        $('.p1-name').attr("placeholder", "Player Name");
        $('.intro-message').html("Enter Player Name");
        $('.btn-opp-human').hide();
        $('.btn-opp-computer').hide();
        $('#p1-name').focus();
        $('#p1-name').addClass('whiteBackground');
        // $('input[type="text"]').hide();
      });
      
      $('.btn-start').on('click', function() {
        var htmlTextP1 = "";
        var htmlTextP2 = "";
        if ($.trim($('#p1-name').val()) === '') { //Trim will trim beginning and ending spaces from input
          htmlTextP1 = "Player One";         //If Player One did not enter their name they will be called Player One
        } else {
           htmlTextP1 = ($('#p1-name').val());
        }
        if ($.trim($('#p2-name').val()) === '') { //Trim will trim beginning and ending spaces from input
          htmlTextP2 = "Player Two";         //If Player Two did not enter their name they will be called Player Two
        } else {
           htmlTextP2 = ($('#p2-name').val());
        }
        
        if ($('#p2-name').is(":visible")){   // If the Player 2 field is not visible the computer is playing
        }else {
          htmlTextP2 = "Computer"; // Opponent is Computer
        }
         
        gameRun.board(htmlTextP1, htmlTextP2);  // The board will be loaded
        
      });
      $("#p1-name").focus(function() {
        $(this).addClass("whiteBackground");
        $("#p1-name").removeClass("grayBackground");
        $("#p2-name").removeClass("whiteBackground");
        $("#p2-name").addClass("grayBackground");
      });
      
      $("#p2-name").focus(function() {
        $(this).addClass("whiteBackground");
        $(".p2-name").removeClass("grayBackground");
        $(".p1-name").removeClass("whiteBackground");
        $(".p1-name").addClass("grayBackground");
      });
      
      $("#p1-name").on('change', function() {
        $('#p2-name').focus();
      });
    }, // end Start function
    board: function(htmlTextP1,htmlTextP2){
      $('body div').remove();
      $('body').prepend(htmlBoard);
      $('#p1-name-text').html(htmlTextP1);
      $('#p2-name-text').html(htmlTextP2);
      $("#player1").addClass("active"); // Player one goes first
      
      // $('.boxes li:nth-child(1)').on("mouseover", function () {
      $('.boxes li').on ({  
        mouseenter: function () { //Show a white "X" or "O" when player hovers over box
        if ($("#player1").hasClass("active") && !$(this).hasClass("box-filled-1") && !$(this).hasClass("box-filled-2")) {
          $(this).addClass("box-hover-1");
        }//end if
        if ($("#player2").hasClass("active") && !$(this).hasClass("box-filled-1") && !$(this).hasClass("box-filled-2")) { 
          $(this).addClass("box-hover-2");
        }//end if
        },//end function
        mouseleave: function () {
          if ($("#player1").hasClass("active")) {
          $(this).removeClass("box-hover-1");
        }else {
          $(this).removeClass("box-hover-2");
         }
        }
      });
      
      gameRun.Play(htmlTextP1,htmlTextP2); // After board loads, play begins

    }, // end board function
    Play: function(htmlTextP1,htmlTextP2){ //Pass names through to winning player message
      var cntTurns = 0;
      var move = "";
      var won = "";
      var resultArray = [];
      
      $('ul.boxes li').on('click', function() {
        if ($(this).hasClass("box-x") || $('this').hasClass("box-o")){ // Don't allow boxes that are already filled with x/o to be clicked
          return;  // That box is taken
        }
          
        cntTurns += 1;
        var player = '';
        if ($("#player1").hasClass("active")) { //Id player 1 is playing
          $(this).text = "O";
          $(this).addClass("box-filled-1 box-o"); //box-filled-1 will change the color / box-o will be used by computer player logic
          player = "p1";
        } else {
          $(this).text = "X";
          $(this).addClass("box-filled-2 box-x");
          player =  "p2";
        }
        //Check to see if all boxes are filled
        if (($('.boxes li:nth-child(1)').hasClass("box-filled-1") || $('.boxes li:nth-child(1)').hasClass("box-filled-2")) && // If all boxes are filled
          ($('.boxes li:nth-child(2)').hasClass("box-filled-1") || $('.boxes li:nth-child(2)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(3)').hasClass("box-filled-1") || $('.boxes li:nth-child(3)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(4)').hasClass("box-filled-1") || $('.boxes li:nth-child(4)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(5)').hasClass("box-filled-1") || $('.boxes li:nth-child(5)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(6)').hasClass("box-filled-1") || $('.boxes li:nth-child(6)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(7)').hasClass("box-filled-1") || $('.boxes li:nth-child(7)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(8)').hasClass("box-filled-1") || $('.boxes li:nth-child(8)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(9)').hasClass("box-filled-1") || $('.boxes li:nth-child(9)').hasClass("box-filled-2")) 
          ) { cntTurns = 9; //game over
          } // end if
       resultArray = gameRun.turnWinner(cntTurns, player);
       won = resultArray[0]; 
       move = resultArray[1];
       switch (won) {  
        case 'p1':
          gameRun.gameOver('p1',htmlTextP1,htmlTextP2);
          break;
        case 'p2':
          gameRun.gameOver('p2',htmlTextP1,htmlTextP2);
           break;
        case 'computer':
          gameRun.computerWin(move, htmlTextP1, htmlTextP2); // Computer Wins pass the winning move necessary for blinking wins
           break;   
        case 'tie':
           gameRun.gameOver('tie');
           break;
        case 'notOver':
           if ($("#player1").hasClass("active")) {
           }
          gameRun.newTurn();
           break;
           } // end switch
      
      }); // end box click function
      
    }, // end Play function
    checkWin: function(player){ 
      var cntTurns = 0;
      var resultArray = [];
      // check for player1 win
      if ($('.boxes li:nth-child(1)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(2)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(3)').hasClass("box-filled-1") ||
          $('.boxes li:nth-child(4)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(6)').hasClass("box-filled-1") ||
          $('.boxes li:nth-child(7)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(8)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(9)').hasClass("box-filled-1") ||  
          $('.boxes li:nth-child(1)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(4)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(7)').hasClass("box-filled-1") ||
          $('.boxes li:nth-child(2)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(8)').hasClass("box-filled-1") ||
          $('.boxes li:nth-child(3)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(6)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(9)').hasClass("box-filled-1") ||
          $('.boxes li:nth-child(1)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(9)').hasClass("box-filled-1") ||
          $('.boxes li:nth-child(3)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-1") &&
          $('.boxes li:nth-child(7)').hasClass("box-filled-1")){
          resultArray = ['p1', 0];
          return resultArray;
          }
      
      // check for player2 win
      if ($('.boxes li:nth-child(1)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(2)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(3)').hasClass("box-filled-2") ||
          $('.boxes li:nth-child(4)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(6)').hasClass("box-filled-2") ||
          $('.boxes li:nth-child(7)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(8)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(9)').hasClass("box-filled-2") ||  
          $('.boxes li:nth-child(1)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(4)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(7)').hasClass("box-filled-2") ||
          $('.boxes li:nth-child(2)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(8)').hasClass("box-filled-2") ||
          $('.boxes li:nth-child(3)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(6)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(9)').hasClass("box-filled-2") ||
          $('.boxes li:nth-child(1)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(9)').hasClass("box-filled-2") ||
          $('.boxes li:nth-child(3)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(5)').hasClass("box-filled-2") &&
          $('.boxes li:nth-child(7)').hasClass("box-filled-2")){
          resultArray = ["p2", 0];  // We need an array for switch to work on return
          return resultArray;
          }
      //check if all boxes are full
      if (($('.boxes li:nth-child(1)').hasClass("box-filled-1") || $('.boxes li:nth-child(1)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(2)').hasClass("box-filled-1") || $('.boxes li:nth-child(2)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(3)').hasClass("box-filled-1") || $('.boxes li:nth-child(3)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(4)').hasClass("box-filled-1") || $('.boxes li:nth-child(4)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(5)').hasClass("box-filled-1") || $('.boxes li:nth-child(5)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(6)').hasClass("box-filled-1") || $('.boxes li:nth-child(6)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(7)').hasClass("box-filled-1") || $('.boxes li:nth-child(7)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(8)').hasClass("box-filled-1") || $('.boxes li:nth-child(8)').hasClass("box-filled-2")) &&
          ($('.boxes li:nth-child(9)').hasClass("box-filled-1") || $('.boxes li:nth-child(9)').hasClass("box-filled-2")) 
          ) { cntTurns = 9; //game over
              resultArray = ['tie', 0];
              return resultArray;
          } else {
              resultArray = ['notOver', 0];
              return resultArray;
          } //end else
        
    }, // end checkWin function
    turnWinner: function(cntTurns, player){ 
      var resultArray = [];
        
      var player2Html = $('#p2-name-text').html(); //The element's html is applied in Board function
      if (player2Html !== "Computer") { // This is a human playing a human game
        resultArray = gameRun.checkWin(player);
        return resultArray;
      }  
      resultArray = gameRun.checkWin(player);
      
      if ((resultArray[0] === "notOver") && player2Html === "Computer") {
        resultArray.length = 0;
        resultArray = gameRun.startComputerSearch(cntTurns, player);
        return resultArray;
      }
      return resultArray;
      
    }, // end turnWinner function
    newTurn: function(){
      document.getElementById("player1")     
         .classList.toggle("active");
        document.getElementById("player2")     
         .classList.toggle("active");
      if ($("#player1").hasClass("active")) {
        $("#player1").css("background-color","#99bbff","color", "white");//active - light blue background with white name
        $("#player2").css("background-color","#003380","color","#ffe066") //not active - dark blue background with yellow name
          .show(4500);
        
      }else {
        $("#player1").css("background-color","#003380","color", "#99bbff"); //not active - dark blue background with light blue name
        $("#player2").css("background-color","#ffe066","color","white") //active - yellow background with white name
          .show(4500);
      }
      
    }, // end newTurn function
    computerNewTurn: function(){
      document.getElementById("player1")     
         .classList.toggle("active");
        document.getElementById("player2")     
         .classList.toggle("active");
        if ($("#player1").hasClass("active")) {
          $("#player1").css("background-color","#99bbff","color", "white");//active - light blue background with white name
          $("#player2").css("background-color","#003380","color","#ffe066") //not active - dark blue background with yellow name
            .show(4500);
          
        }else {
          $("#player1").css("background-color","#003380","color", "#99bbff"); //not active - dark blue background with light blue name
          $("#player2").css("background-color","#ffe066","color","white") //active - yellow background with white name
            .show(4500);
        }
      
    }, // end newComputerTurn function
    gameOver: function(player,htmlTextP1,htmlTextP2){
      $('body div').remove();
      $('body').prepend(htmlWin);
      $('#new-game-button').on('click', function() { //New Game Button Click
        gameRun.start();
      });
      
      switch (player) {  
        case 'p1':
          $("#finish").addClass("screen-win-one");
          document.getElementById('message').innerHTML = htmlTextP1 + " Wins!";
          break;
        case 'p2':
           $("#finish").addClass("screen-win-two");
           if (htmlTextP2 === "Computer"){
             document.getElementById('message').innerHTML = "Computer Wins!";
           }else{
           document.getElementById('message').innerHTML = htmlTextP2 + " Wins!";
           }
           break;
        case 'tie':
          // $("#finish").addClass("screen-win-one");
           document.getElementById('message').innerHTML = 'TIE GAME';
           break;
      }
      
    }, // end gameOver function
    computerWin: function(move, htmlTextP1, htmlTextP2) { // move is the winning computer move
      $('.boxes li:nth-child(1)').addClass("box-x"); //Fill every box so no more clicks are possible
      $('.boxes li:nth-child(2)').addClass("box-x");
      $('.boxes li:nth-child(3)').addClass("box-x");
      $('.boxes li:nth-child(4)').addClass("box-x");
      $('.boxes li:nth-child(5)').addClass("box-x");
      $('.boxes li:nth-child(6)').addClass("box-x");
      $('.boxes li:nth-child(7)').addClass("box-x");
      $('.boxes li:nth-child(8)').addClass("box-x");
      $('.boxes li:nth-child(9)').addClass("box-x");
      
      $('.boxes li:nth-child(' + move + ')').addClass("blink");
      
      $('.blink').each(function() {
      $('.box li').attr("disabled", true);
      var elem = $(this);
      // count the blinks
      var count = 1;
      var intervalId = setInterval(function() {
      if (elem.css('visibility') == 'hidden') {
        elem.css('visibility', 'visible');
        // increment counter when showing to count # of blinks and stop when visible
        if (count++ === 4) {
            clearInterval(intervalId);
            gameRun.gameOver('p2', htmlTextP1, htmlTextP2);
        }
        } else {
          elem.css('visibility', 'hidden');
      }    
    }, 600);
}); 
    
    }, // end computerWin function
    buildGame: function(player) {
      var game = [];
      
      for (var i=1; i < 10; i++){
        if (!$('.boxes li:nth-child(' + i + ')').hasClass("box-filled-1") && 
            !$('.boxes li:nth-child(' + i + ')').hasClass("box-filled-2")) {
            game.push(i);
        }
      }
      return game;
    }, //end buildGame
    miniMax: function(game) { // Checks the first open boxes for winning moves
      var scoreBox = [];
      var stateGame = [];
      var player = game[0];       // Every score that is pushed corresponds to a new game position
      scoreBox = gameRun.quickWin(game); // Check to see if the first open boxes(game array) 
                                         // contains a winning move for the computer
      if (scoreBox === "none") {   // No quick winning move found for computer player
      }else{
        return scoreBox;                 // Return the winning box for the computer player
      }
      
      scoreBox = gameRun.quickBlock(game); // Check to see if the first open boxes(game array)
                                           // contains a winning move for computer's opponent
      if (scoreBox === "none") {   // No quick winning move found for computer's opponent
      }else{
        return scoreBox;
      }
      scoreBox = [];
      scoreBox = (game[0]); //scoreBox array will always begin with the first x potential move (game[i))
      scoreBox = gameRun.stateBuildGame(player, game, stateGame);// Find the next open boxes
      return scoreBox;
    }, // end miniMax function
    quickWin: function(game) {
      var scoreBox = [];
      var boxFill = "";
      if (game[0] === "p1") {
        boxFill = "box-o";
      }else{                //This should always be true - computer - X
        boxFill = "box-x";
      }
      for (var i=1; i < game.length; i++){  //starts at first computer move
        $('.boxes li:nth-child(' + game[i] + ')').addClass(boxFill);
        if ($('.boxes li:nth-child(1)').hasClass(boxFill) && // Winning Move Found
          $('.boxes li:nth-child(2)').hasClass(boxFill) &&
          $('.boxes li:nth-child(3)').hasClass(boxFill) ||
          $('.boxes li:nth-child(4)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(6)').hasClass(boxFill) ||
          $('.boxes li:nth-child(7)').hasClass(boxFill) &&
          $('.boxes li:nth-child(8)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||  
          $('.boxes li:nth-child(1)').hasClass(boxFill) &&
          $('.boxes li:nth-child(4)').hasClass(boxFill) &&
          $('.boxes li:nth-child(7)').hasClass(boxFill) ||
          $('.boxes li:nth-child(2)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(8)').hasClass(boxFill) ||
          $('.boxes li:nth-child(3)').hasClass(boxFill) &&
          $('.boxes li:nth-child(6)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||
          $('.boxes li:nth-child(1)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||
          $('.boxes li:nth-child(3)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(7)').hasClass(boxFill)){
          $('.boxes li:nth-child(' + game[i] + ')').removeClass(boxFill);
          scoreBox.push(game[i]);  // The move came from game array
          return scoreBox;
        } //end if
        $('.boxes li:nth-child(' + game[i] + ')').removeClass(boxFill);
      } //end for
      return "none"; //quick move win was not found
    }, //end quickWin function
    quickBlock: function(game) { //Is the opponent one move away from a win? If so block it.
      var scoreBox = [];
      var boxFill = "";
      if (game[0] === "p1") {
        boxFill = "box-x"; //opposite of computer - X
      }else{                
        boxFill = "box-o";
      }
      for (var i=1; i < game.length; i++){  
        $('.boxes li:nth-child(' + game[i] + ')').addClass(boxFill);
        if ($('.boxes li:nth-child(1)').hasClass(boxFill) && // Winning Move Found
          $('.boxes li:nth-child(2)').hasClass(boxFill) &&
          $('.boxes li:nth-child(3)').hasClass(boxFill) ||
          $('.boxes li:nth-child(4)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(6)').hasClass(boxFill) ||
          $('.boxes li:nth-child(7)').hasClass(boxFill) &&
          $('.boxes li:nth-child(8)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||  
          $('.boxes li:nth-child(1)').hasClass(boxFill) &&
          $('.boxes li:nth-child(4)').hasClass(boxFill) &&
          $('.boxes li:nth-child(7)').hasClass(boxFill) ||
          $('.boxes li:nth-child(2)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(8)').hasClass(boxFill) ||
          $('.boxes li:nth-child(3)').hasClass(boxFill) &&
          $('.boxes li:nth-child(6)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||
          $('.boxes li:nth-child(1)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||
          $('.boxes li:nth-child(3)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(7)').hasClass(boxFill)){
          $('.boxes li:nth-child(' + game[i] + ')').removeClass(boxFill);
          scoreBox.push(game[i]);  //scoreBox is the winning or blocking move
          return scoreBox;
        } //end if
        $('.boxes li:nth-child(' + game[i] + ')').removeClass(boxFill);
      } //end for
      return "none"; //quick block was not found
         
    }, //end quickBlock function
    stateBuildGame: function(player, game, stateGame) { //This function builds an array of computer's possible first moves 
     var randomMovesArray = [];
     var scoreBox = "";
     var index = 0;
     if (player === "p1"){ // Switch player for next potential move
        player = "p2";
      }else {
        player = "p1";  //test - player is p1
      }
      stateGame = gameRun.gameMoveBuild(player, game, stateGame);
      if (stateGame < 1) {  
      }else { 
        scoreBox = stateGame[0];
        return scoreBox;
      }
      
      for (var i=0; i < game.length; i++){
        randomMovesArray.push(game[i]); // Create array of the moves with the same non-winning score of 0
      }
      index = Math.floor(Math.random() * ((randomMovesArray.length) -1)); // Set index to random number for our randomMovesArray length
      scoreBox = randomMovesArray[index];
      return scoreBox; //if a winning move isn't found, then just return a random from the open squares
    }, //end buildGame
    gameMoveBuild: function(player, game, stateGame) { 
      for (var x=0; x < (game.length - 1); x++) { // The length of the game array is less than 9
        stateGame = [game[x]]; //A first computer move
        $('.boxes li:nth-child(' + game[x] + ')').addClass("box-x");
        stateGame = gameRun.opponentMoveBuild(stateGame, player); // Check the opponent moves possible after the computer's first move
        // $('.boxes li:nth-child(' + stateGame[stateGame.length -1] + ')').removeClass("box-x"); //remove class added to check for other open boxes
        $('.boxes li:nth-child(' + game[x] + ')').removeClass("box-x"); //remove computer class move - go get another from game array
        $('.boxes li:nth-child(' + x + ')').removeClass("box-x");
        // return stateGame;
        stateGame = gameRun.checkStateGameArray(stateGame);
        if (stateGame.length < 1){
        }else{
          return stateGame; // Return array that has a +10/-10
        }
      } //end for - go get another computer first move -build new array
        return stateGame; // should be empty array after all loops
      
    }, // end gameMoveBuild
      opponentMoveBuild: function(stateGame, player) { 
        var boxFill = "";
        var stateScore = 0;
        for (var i=1; i < 10; i++){ // Look for open boxes for all possible "O" moves
          if (!$('.boxes li:nth-child(' + i + ')').hasClass("box-o") && //Look for open boxes
            !$('.boxes li:nth-child(' + i + ')').hasClass("box-x")) {
            stateGame.push(player);
            stateGame.push(i); //Push first potential computer move---(2)
            if (player === "p1") { 
              boxFill = "box-o";
            }else{
              boxFill = "box-x";
            }
            // $('.boxes li:nth-child(' + stateGame[stateGame.length -1] + ')').addClass(boxFill); //add box-x or box-o to potential move
            $('.boxes li:nth-child(' + i + ')').addClass(boxFill); //add box-x or box-o to potential move
            stateScore = gameRun.stateMiniMax (player, stateGame); //use empty box to check for win/return score
            stateGame.push(stateScore);
            if (stateScore === -10) { //if there is a winning move found for opponent, don't do 2 move build
              $('.boxes li:nth-child(' + i + ')').removeClass(boxFill);
            } // end if
            else{
              stateGame = gameRun.stateTwoMoveBuild(player, stateGame); // add to above array with a 2nd computer move and possible scores 
              $('.boxes li:nth-child(' + i + ')').removeClass(boxFill); //remove move added above--- go look for next possible move
              if (stateGame[stateGame.length - 1] === +10){ //A winning 2nd move found for the computer-take first move now
                // $('.boxes li:nth-child(' + game[x] + ')').removeClass("box-x");
                return stateGame; // Return the stateGame with computer's two move win
                // return scoreBox; //scoreBox has been set to current game array element/the computer's first move
              } // end if
            } //end else
          } //end if

        // $('.boxes li:nth-child(' + i + ')').removeClass("box-o box-x");
        
        }
        return stateGame; // Return stateGame with opponent's win or draw
      }, // end opponentMoveBuild();
      stateTwoMoveBuild: function(player, stateGame) {
      var stateScore = 0;
      //This function simulates a second move for the computer, looking for a win
      var boxFill = "";
      if (player === "p1"){ // Switch player for next potential move
          player = "p2";
        }else {
          player = "p1";  
        }
      if (player === "p1") { 
        boxFill = "box-o";
      }else{
        boxFill = "box-x";
      }

      for (var b=1;  b < 10; b++){ // Look for open boxes for all possible next moves
        if (!$('.boxes li:nth-child(' + b + ')').hasClass("box-o") && //Look for open boxes
          !$('.boxes li:nth-child(' + b + ')').hasClass("box-x")) {
          stateGame.push(player);
          // stateMove = i;
          stateGame.push(b); 
          $('.boxes li:nth-child(' + b + ')').addClass(boxFill); //add box-x or box-o to potential move
          stateScore = gameRun.stateMiniMax (player, stateGame); //empty box found
          stateGame.push(stateScore); 
          // stateGame[0] = game[b];
          $('.boxes li:nth-child(' + b + ')').removeClass(boxFill);//remove class added above
          if (stateScore === +10) { // return best computer move now
            return stateGame;  
          }// end if
          
        } //end if
      } //end for
      return stateGame;
    }, //end stateTwoMoveBuild
    // gameRun.checkStateGameArray(stateGame);
    checkStateGameArray: function(stateGame) { 
      var scoreBox = 0;
      for (var n=1; n < (stateGame.length - 1); n++){  // Check each first move for a winner -- if not found, build new array
        if (stateGame[stateGame.length - 1] === +10 || stateGame[n] === -10 ) {
          scoreBox = stateGame[0];  // The first move is always the first element of the array
          return stateGame;
        }else{
          stateGame = []; //Go get another first move for computer from game array
          return stateGame;
        } //end else
      } // end for
    },
    stateMiniMax: function(player, stateGame) {
        var boxFill = "";
        var stateScore = 0;
        if (player === "p1") { 
          boxFill = "box-o";
        }else{
          boxFill = "box-x";
        }
        if ($('.boxes li:nth-child(1)').hasClass(boxFill) && // Winning Move Found
          $('.boxes li:nth-child(2)').hasClass(boxFill) &&
          $('.boxes li:nth-child(3)').hasClass(boxFill) ||
          $('.boxes li:nth-child(4)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(6)').hasClass(boxFill) ||
          $('.boxes li:nth-child(7)').hasClass(boxFill) &&
          $('.boxes li:nth-child(8)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||  
          $('.boxes li:nth-child(1)').hasClass(boxFill) &&
          $('.boxes li:nth-child(4)').hasClass(boxFill) &&
          $('.boxes li:nth-child(7)').hasClass(boxFill) ||
          $('.boxes li:nth-child(2)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(8)').hasClass(boxFill) ||
          $('.boxes li:nth-child(3)').hasClass(boxFill) &&
          $('.boxes li:nth-child(6)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||
          $('.boxes li:nth-child(1)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(9)').hasClass(boxFill) ||
          $('.boxes li:nth-child(3)').hasClass(boxFill) &&
          $('.boxes li:nth-child(5)').hasClass(boxFill) &&
          $('.boxes li:nth-child(7)').hasClass(boxFill)){
          if (player === "p2") {
            stateScore = +10; // Computer X - The winning move came from a computer potential move 
            $('.boxes li:nth-child(' + stateGame[stateGame.length-1] + ')').removeClass(boxFill);
            return stateScore;
          }else {
            stateScore = -10; // No need to store losses or draws
          }
          
        }else {  // No winning move found
          // $('.boxes li:nth-child(' + stateMove + ')').removeClass("box-o box-x");
          // moves.push(move);
          stateScore = 0; 
        } 
        // $('.boxes li:nth-child(' + stateGame[stateGame.length - 1] + ')').removeClass("box-o box-x");
        return stateScore;
    }, // end stateMiniMax function
    startComputerSearch: function(cntTurns, player) { // Computer looks for best move and takes it
      var game = [];
      var scoreBox = [];
      var resultArray = [];
      var winner = "";
      if (cntTurns >= 1) {  //Switch to Computer Player
        // resultArray = [];
        game = gameRun.buildGame(player); //build an array of possible Computer first moves
        scoreBox = gameRun.miniMax(game); //Use the game array to create the following states or possible moves and scores that would follow
        $('.boxes li:nth-child(' + scoreBox + ')').addClass("box-x box-filled-2"); //Make the computer move
        winner = gameRun.checkWin(player); 
        
        if (winner[0] === "p2") {
          resultArray.length = 0;
          resultArray = ["computer", scoreBox];
          return resultArray;
        }
        gameRun.computerNewTurn();
        winner = "p2";
      } // end if 
      resultArray = ["notOver", 0];
      return resultArray;
    } // end startComputerSearch
  }; // end Return
}()); // end gameRun function

gameRun.start();

