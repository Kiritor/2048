/**
 * @Description:support.js
 * @Author:LCore
 */


var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92*documentWidth;
var cellSideLength = 0.18*documentWidth;
var cellSpace = 0.04*documentWidth;
var headerWidth=window.screen.availWidth;
function getPostionTop(i, j) {

    return (i * cellSideLength + (i + 1) * cellSpace);
}

function getPostionLeft(i, j) {
    return (j * cellSideLength + (j + 1) * cellSpace);
}

function getBackgroundColorByNum(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }

    return "black";
}

function getPreColorByNum(number) {
    if (number <= 4)
        return "#776e65";
    return "white";
}

function isNoSpace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;

    return true;
}


function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1])
                    return true;
            }

        }
    }
    return false;
}

function canMoveRight(borad) {
    for (var i = 3; i >= 0; i--) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1])
                    return true;
            }

        }
    }
    return false;
}

/**
 *@Desciption:重新构造canMove方法(包括上、下、左、右)
 *@author:LCore
 *@pragram board:棋盘格
 *@pragram direction:移动方向
 */

function canMove(board, direction) {
    if (direction == 1) {
        //左移
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1])
                        return true;
                }

            }
        }
    } else if (direction == 2) {
        //上移
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[j][i] != 0) { //可以移动
                    if (board[j - 1][i] == 0 || board[j][i] == board[j - 1][i])
                        return true;
                }
            }
        }
    } else if (direction == 3) {
        //下移
        for (var i = 3; i >= 0; i--) {
            for (var j = 2; j >= 0; j--) {
                if (board[j][i] != 0) { //可以移动
                    if (board[j + 1][i] == 0 || board[j][i] == board[j + 1][i])
                        return true;
                }
            }
        }
    } else if (direction == 4) {
        //右移
        for (var i = 3; i >= 0; i--) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j] != 0) {
                    if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1])
                        return true;
                }

            }
        }
    } else
        return false;

}

/**
 *@Description:横向判断是否存在障碍物
 *@pagram row:第几行
 *@pagram col1:开始索引
 *@pagram col2:结束索引
 *@pagram board:棋盘格
 */
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0)
            return false;
    }
    return true;
}

/**
 *@Description:纵向判断是否存在障碍物
 *@pagram col:第几列
 *@pagram row1:开始索引
 *@pagram row2:结束索引
 *@pagram board:棋盘格
 */
function noBlockVectal(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0)
            return false;
    }
    return true;
}