/**
 * @Description:animation.js
 * @Author:LCore
 */

function showNumberWithAnimation(randx, randy, randNum) {
    var numberCell = $("#number-cell-" + randx + randy);
    numberCell.css({
        "background-color": getBackgroundColorByNum(randNum),
        "color": getPreColorByNum(randNum)
    });
    numberCell.text(randNum);
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPostionTop(randx, randy),
        left: getPostionLeft(randx, randy)
    }, 100);
}


function showMoveAnimation(fromX, fromY, toX, toY) {
    var numberCell = $("#number-cell-" + fromX + fromY);
    numberCell.animate({
        top: getPostionTop(toX, toY),
        left: getPostionLeft(toX, toY)
    }, 200);
}


function updateScore(score) {
    $('#score').text(score);
}

/**
 *@Description:积分增加动画
 *@Author:LCore
 *@pagram:坐标
 *@pagram:数值
*/

function anp(element,num){
	var $i=$("<b>").text("+"+num);
	var x=element.offset().left,y=element.offset().top;
	$i.css({top:y,left:x+40,position:"absolute",color:"#E94F06"});
	$("body").append($i);
	$i.animate({top:y-20,opacity:0,"font-size":"14pt"},1500,function(){
		$i.remove();
	});
	//element.stopPropagation();
}