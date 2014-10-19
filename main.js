/**
 * @Description:main,js
 * @Author:LCore
 */

//4*4格子
var board = new Array();
var score = 0;
var hasConflicted = new Array();
var direction = {
    left: 1,
    up: 2,
    down: 3,
    right: 4
};

$(function() {
    newGame();
});

function newGame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
    score = 0;
	$("#score").text(0);
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + j);
            gridCell.css("top", getPostionTop(i, j));
            gridCell.css("left", getPostionLeft(i, j));
        }
    }

    //初始化棋盘
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }

    }

    //更新面板
    updateBoardView();
}

function updateBoardView() {
    $(".number-cell").remove(); //更新之前先删除元素
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //重新生成16个number-cell,并添加到容器中
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + j + '"></div>');
            var numberCell = $("#number-cell-" + i + j);
            if (board[i][j] == 0) {
                //设置居中且”不可见“
                numberCell.css({
                    "width": "0px",
                    "height": "0px",
                    "top": getPostionTop(i, j) + 50,
                    "left": getPostionLeft(i, j) + 50
                });
            } else {
                numberCell.css({
                    "width": "100px",
                    "height": "100px",
                    "top": getPostionTop(i, j),
                    "left": getPostionLeft(i, j)
                });
                //根据数字颜色设置器背景色
                numberCell.css("background-color", getBackgroundColorByNum(board[i][j]));
                //设置前景是
                numberCell.css("color", getPreColorByNum(board[i][j]));
                //显示数字
                numberCell.text(board[i][j]);
                hasConflicted[i][j] = false;
            }

        }
    }

}


function generateOneNumber() {
    if (isNoSpace(board)) {
        return false;
    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    //判断生成的坐标是否合理(若果该坐标存在了值,即不合理)
    while (true) {
        if (board[randx][randy] === 0)
            break;
        //继续生成
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字
    var randNum = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNum;
    showNumberWithAnimation(randx, randy, randNum);
    return true;
}


//按键处理

$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
});

function moveLeft() {
    if (!canMove(board, direction.left))
        return false;
    //左移
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++)
                //可以一次移动多个格子
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                    //move
                    showMoveAnimation(i, j, i, k);
                    //add
                    board[i][k] += board[i][j];
                    board[i][j] = 0;
                    var element = $("#grid-cell-"+i+k);
                    anp(element, board[i][k])
                    score += board[i][k];
                    updateScore(score);
                    continue;
                }

            }
        }
    }
    setTimeout('updateBoardView()', 200); //等待200在执行更新面板操作,避免动画效果被冲掉
    return true
}

function moveRight() {
    if (!canMove(board, direction.right))
        return false;
    //右移
    for (var i = 3; i >= 0; i--) {
        for (var j = 2; j >= 0; j--) {
            //该位置不等于0即可进行移动
            if (board[i][j] != 0)
                for (var k = 3; k > j; k--) {
                    //如果可以一次移动多个格子
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        var element = $("#grid-cell-"+i+k);
                        anp(element, board[i][k])
                        updateScore(score);
                        continue;
                    }
                }
        }
    }
    setTimeout('updateBoardView()', 200); //等待200在执行更新面板操作,避免动画效果被冲掉
    return true
}

function isGameOver() {
    if (isNoSpace(board) && canMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("游戏结束!");
}

/**
  先判断第一列*/
function moveUp() {
    if (!canMove(board, direction.up))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            //该位置不为0即可进行移动
            if (board[j][i] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[k][i] == 0 && noBlockVectal(i, k, j, board)) {
                        //move
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    } else if (board[k][i] == board[j][i] && noBlockVectal(i, k, j, board) && !hasConflicted[k][i]) {
                        //move
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        var element = $("#grid-cell-"+k+i);
                        anp(element, board[k][i])
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200); //等待200在执行更新面板操作,避免动画效果被冲掉
    return true
}

/**
  先判断第一列*/
function moveDown() {
    if (!canMove(board, direction.down))
        return false;
    for (var i = 3; i >= 0; i--) {
        for (var j = 2; j >= 0; j--) {
            //该位置不为0即可进行移动
            if (board[j][i] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[k][i] == 0 && noBlockVectal(i, j, k, board)) {
                        //move
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    } else if (board[k][i] == board[j][i] && noBlockVectal(i, j, k, board) && !hasConflicted[k][i]) {
                        //move
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        var element = $("#grid-cell-"+k+i);
                        anp(element, board[k][i])
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200); //等待200在执行更新面板操作,避免动画效果被冲掉
    return true
}