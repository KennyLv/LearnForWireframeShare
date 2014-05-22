function commonControl_PageTurnning(div_PageTurnning) {
    var length = $('#' + div_PageTurnning).children('div').length;
    $('#' + div_PageTurnning).children('div').each(function (index, elem) {
        $(elem).css('display', 'none');
        $(elem).attr('index', index);
    });

    var mydiv = document.createElement("div");
    mydiv.style.position = "absolute";
    mydiv.style.width = "100%";
    $(mydiv).attr('class','page-bar');
	mydiv.setAttribute('id', div_PageTurnning+"_PageTurn");
    //mydiv.className = 'menuPageTurn';

    var myleftdiv = document.createElement("div");
    myleftdiv.style.width = "35%";
    myleftdiv.style.height = "15px";
    myleftdiv.style.position = "relative";
    myleftdiv.style.cssFloat = "left";
	myleftdiv.style.cursor = "pointer";
    myleftdiv.setAttribute('id', div_PageTurnning+"leftdiv");

    var mycenterdiv = document.createElement("div");
    mycenterdiv.style.width = "15%";
    mycenterdiv.style.height = "15px";
    $(mycenterdiv).attr('class','page-txt');
    mycenterdiv.style.position = "relative";
    mycenterdiv.style.cssFloat = "left";
    mycenterdiv.setAttribute('id', div_PageTurnning+"centerdiv");


    var myrightdiv = document.createElement("div");
    myrightdiv.style.width = "35%";
    myrightdiv.style.height = "15px";
    myrightdiv.style.position = "relative";
    myrightdiv.style.cssFloat = "left";
	myrightdiv.style.cursor = "pointer";
    myrightdiv.setAttribute('id', div_PageTurnning+"rightdiv");

    mydiv.appendChild(myleftdiv);
    mydiv.appendChild(mycenterdiv);
    mydiv.appendChild(myrightdiv);
    //$(document.body).append(mydiv);	
    $('#'+div_PageTurnning).append(mydiv);
    $("#"+div_PageTurnning+"leftdiv").text('<<');
    $("#"+div_PageTurnning+"rightdiv").text('>>');

    $("#" + div_PageTurnning + " div[index='0']").css('display', 'block');
    var currentIndex = 0;
    $("#"+div_PageTurnning+"centerdiv").text(1 + '/' + length);

    $("#"+div_PageTurnning+"leftdiv").click(function () {
        $("#" + div_PageTurnning + " div[index='" + currentIndex + "']").css('display', 'none');
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = length - 1;
        }

        $("#" + div_PageTurnning + " div[index='" + currentIndex + "']").css('display', 'block');
        $("#"+div_PageTurnning+"centerdiv").text((currentIndex + 1) + '/' + length);

    });

    $("#"+div_PageTurnning+"rightdiv").click(function () {
        $("#" + div_PageTurnning + " div[index='" + currentIndex + "']").css('display', 'none');
        currentIndex += 1;
        if (currentIndex > length - 1) {
            currentIndex = 0;
        }


        $("#" + div_PageTurnning + " div[index='" + currentIndex + "']").css('display', 'block');
        $("#"+div_PageTurnning+"centerdiv").text((currentIndex + 1) + '/' + length);

    });
};
