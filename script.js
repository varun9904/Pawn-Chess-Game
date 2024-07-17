var is_selected = 0;
var possible_moves = [];
var prev_index = -1;
var whos_playing = 0; 
var playing = ["White's Turn", "Black's Turn"];
var gameover = false;
var black_pieces = 8;
var white_pieces = 8;

placeWhitePawns();
placeBlackPawns();

function playMoveSound() {
    var audio = document.getElementById("moveSound");
    audio.play();
}
function playCaptureSound() {
    var audio = document.getElementById("captureSound");
    audio.play();
}


$('.container > *').click(function () {
    var index = $(this).index();
    var is_piece = $(this).hasClass("piece");

    if (gameover == false) {
        if (is_piece == 1) {
            var current_s = "." + (index + 1);
            var s = "." + (index + 1) + " img";
            var is_black_piece = $(s).hasClass("black-piece");
            if (is_selected == 0) {
                if (whos_playing % 2 == 0 && is_black_piece == 0 || whos_playing % 2 == 1 && is_black_piece == 1) {
                    is_selected = 1;
                    prev_index = index;
                    $(s).toggleClass("selected");
                    if ($(s).hasClass("white-piece") && $(s).hasClass("pawn")) {
                        moveWhitePawn(index);
                    }
                    else if ($(s).hasClass("black-piece") && $(s).hasClass("pawn")) {
                        moveBlackPawn(index);
                    }
                }
            }
            else {
                if (prev_index == index) {
                    is_selected = 0;
                    remove_moves(to_skip = index + 1);
                    $(s).toggleClass("selected");
                }
                else {
                    if ($(s).hasClass("circle")) {
                        is_selected = 0;
                        var s1 = "." + (index + 1);
                        remove_moves(to_skip = index + 1);
                        s = "." + (prev_index + 1) + " img";
                        $(s).toggleClass("selected");
                        s = "." + (prev_index + 1);
                        $(s).toggleClass("piece");
                        $(s1).html($(s).html());
                        $(s).html("");
                        if ($(s1 + " img").hasClass("white-piece") && $(s1 + " img").hasClass("pawn")) {
                            playCaptureSound()
                        }
                        else if ($(s1 + " img").hasClass("black-piece") && $(s1 + " img").hasClass("pawn")) {
                            playCaptureSound()
                        }
                        prev_index = index;
                        whos_playing += 1;
                        if (whos_playing % 2 == 0) {
                            white_pieces--;
                        }
                        else {
                            black_pieces--;
                        }
                        $(".whos-turn h1").html(playing[whos_playing % 2]);
                        if (white_pieces == 0) {
                            $("h1").html("Black Wins");
                            $("h2").html("Press R to restart the game");
                            gameover = true;
                        }
                        else if (black_pieces == 0) {
                            $("h1").html("White Wins");
                            $("h2").html("Press R to restart the game");
                            gameover = true;
                        }
                        if (!gameover) {
                            if ($("." + (index + 1) + " img").hasClass("white-piece") && $("." + (index + 1) + " img").hasClass("pawn") && index + 1 <= 8) {
                                $("h1").html("White Wins");
                                $("h2").html("Press R to restart the game");
                                gameover = true;
                            } else if ($("." + (index + 1) + " img").hasClass("black-piece") && $("." + (index + 1) + " img").hasClass("pawn") && index + 1 >= 57) {
                                $("h1").html("Black Wins");
                                $("h2").html("Press R to restart the game");
                                gameover = true;
                            }
                        }
                    }
                    else if (whos_playing % 2 == 0 && is_black_piece == 0 || whos_playing % 2 == 1 && is_black_piece == 1) {
                        remove_moves(to_skip = index + 1);
                        var prev_s = "." + (prev_index + 1) + " img";
                        is_selected = 1;
                        $(prev_s).toggleClass("selected");
                        prev_index = index;
                        $(s).toggleClass("selected");
                        if ($(s).hasClass("white-piece") && $(s).hasClass("pawn")) {
                            moveWhitePawn(index);
                        }
                        else if ($(s).hasClass("black-piece") && $(s).hasClass("pawn")) {
                            moveBlackPawn(index);
                        }
                    }
                }
            }
        }
        else {
            console.log("is_piece == 0");
            if (is_selected == 1) {
                var current_s = "." + (index + 1);
                var prev_s = "." + (prev_index + 1) + " img";
                if ($(current_s + " img").hasClass("move") == 1) {
                    remove_moves(to_skip = index + 1);
                    is_selected = 0;
                    $(prev_s).toggleClass("selected");
                    $(current_s).toggleClass("piece");

                    prev_s = "." + (prev_index + 1);
                    $(prev_s).toggleClass("piece");
                    $(current_s).html($(prev_s).html());

                    $(prev_s).html("");

                    if ($(current_s + " img").hasClass("white-piece") && $(current_s + " img").hasClass("pawn")) {
                        playMoveSound();
                    }
                    else if ($(current_s + " img").hasClass("black-piece") && $(current_s + " img").hasClass("pawn")) {
                        playMoveSound();
                    }

                    prev_index = index;
                    whos_playing += 1;
                    $(".whos-turn h1").html(playing[whos_playing % 2]);

                    if ($(current_s).hasClass("victory")) {
                        $("h1").html(whos_playing % 2 == 1 ? "White Wins" : "Black Wins");
                        $("h2").html("Press R to restart the game");
                        gameover = true;
                    }
                    if (!gameover) {
                        if ($(current_s + " img").hasClass("white-piece") && $(current_s + " img").hasClass("pawn") && index + 1 <= 8) {
                            whos_playing++; 
                            $(".whos-turn h1").html(playing[whos_playing % 2]);
                            $("h1").html("White Wins"); 
                            $("h2").html("Press R to restart the game");
                            gameover = true; 
                        } else if ($(current_s + " img").hasClass("black-piece") && $(current_s + " img").hasClass("pawn") && index + 1 >= 57) {
                            whos_playing++; 
                            $(".whos-turn h1").html(playing[whos_playing % 2]);
                            $("h1").html("Black Wins"); 
                            $("h2").html("Press R to restart the game");
                            gameover = true;
                        }
                    }
                }
            }
        }
    }
    console.log(this);
});
function moveWhitePawn(index) {
    console.log("moveWhitePawn");
    var current_s = "." + (index + 1);
    var up_index = (index + 1) - 8;
    var next_s = "." + up_index;
    if (!$(next_s).hasClass("piece")) {
        if (!$(next_s).hasClass("victory white-v")) {
            $(next_s).html('<img class="move" src="dot.png" alt="">');
            possible_moves.push(up_index);
        }
    }
    var right = up_index + 1;
    var left = up_index - 1;
    var touch_right = index + 1;
    var touch_left = index - 1;
    if (right >= 1 && up_index % 8 != 0) {
        var right_s = "." + right;
        var touch_right_s = "." + touch_right;
        if ($(right_s).hasClass("piece") && $(right_s + " img").hasClass("black-piece")) {
            $(right_s + " img").toggleClass("circle");
            possible_moves.push(right);
        } 
    }
    if (left >= 1 && up_index % 8 != 1) {
        var left_s = "." + left;
        var touch_left_s = "." + touch_left;
        if ($(left_s).hasClass("piece") && $(left_s + " img").hasClass("black-piece")) {
            $(left_s + " img").toggleClass("circle");
            possible_moves.push(left);
        } 
    }
    if (index + 1 >= 49 && index + 1 <= 56) {
        var double_up_index = (index + 1) - 16;
        var double_next_s = "." + double_up_index;
        if (double_up_index >= 1 && !$(double_next_s).hasClass("piece") && !$(next_s).hasClass("piece")) {
            $(double_next_s).html('<img class="move" src="dot.png" alt="">');
            possible_moves.push(double_up_index);
        }
    }
}
function moveBlackPawn(index) {
    console.log("moveBlackPawn");
    var current_s = "." + (index + 1);
    var down_index = (index + 1) + 8;
    var next_s = "." + down_index;
    if (!$(next_s).hasClass("piece")) {
        if (!$(next_s).hasClass("victory black-v")) {
            $(next_s).html('<img class="move" src="dot.png" alt="">');
            possible_moves.push(down_index);
        }
    }
    var right = down_index + 1;
    var left = down_index - 1;
    var touch_right = index + 1;
    var touch_left = index - 1;
    if (right <= 64 && down_index % 8 != 0) {
        var right_s = "." + right;
        var touch_right_s = "." + touch_right;
        if ($(right_s).hasClass("piece") && $(right_s + " img").hasClass("white-piece")) {
            $(right_s + " img").toggleClass("circle");
            possible_moves.push(right);
        } 
    }
    if (left <= 64 && down_index % 8 != 1) {
        var left_s = "." + left;
        var touch_left_s = "." + touch_left;
        if ($(left_s).hasClass("piece") && $(left_s + " img").hasClass("white-piece")) {
            $(left_s + " img").toggleClass("circle");
            possible_moves.push(left);
        } 
    }
    if (index + 1 >= 9 && index + 1 <= 16) {
        var double_down_index = (index + 1) + 16;
        var double_next_s = "." + double_down_index;
        if (double_down_index <= 64 && !$(double_next_s).hasClass("piece") && !$(next_s).hasClass("piece")) {
            $(double_next_s).html('<img class="move" src="dot.png" alt="">');
            possible_moves.push(double_down_index);
        }
    }
}
function remove_moves(to_skip) {
    for (var i = 0; i < possible_moves.length; i++) {
        if (possible_moves[i] == to_skip) {
            continue;
        }
        var s = "." + possible_moves[i];
        if ($(s + " img").hasClass("circle") == 1) {
            $(s + " img").toggleClass("circle");
        }
        else {
            $(s).html("");
        }
    }
    possible_moves = [];
}
function create_game_temp() {
    for (var i = 49; i <= 56; i++) {
        var s = "." + i;
        $(s).html('<img class="white-piece pawn" src="pawn.png" alt="white-pawn">');
        $(s).addClass("piece");
    }
    for (var i = 9; i <= 16; i++) {
        var s = "." + i;
        $(s).html('<img class="black-piece pawn" src="black_pawn.png" alt="black-pawn">');
        $(s).addClass("piece");
    }
}
document.addEventListener("keypress", function (event) {
    if (event.key === "r" && gameover == true) {
        location.reload();
    }
});
function placeWhitePawns() {
    for (var i = 49; i <= 56; i++) {
        var cellSelector = "." + i;  
        $(cellSelector).html('<img class="white-piece pawn" src="LightPawn.webp">');
        $(cellSelector).toggleClass("piece");  
    }
}
function placeBlackPawns() {
    for (var i = 9; i <= 16; i++) {
        var cellSelector = "." + i;  
        $(cellSelector).html('<img class="black-piece pawn" src="DarkPawn.webp" alt="white-pawn">');
        $(cellSelector).toggleClass("piece");  
    }
}
