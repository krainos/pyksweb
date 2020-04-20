//console.log('2222222')

$(function () {
    $("#btn").click(function () {
        $(".mask-wrapper").show();
    });
    $(".close-btn").click(function () {
        $(".mask-wrapper").hide();
    });
});

$(function () {
    $(".switch").click(function () {
        var scroolWrapper = $(".scroll-wrapper");
        var currentLeft = scroolWrapper.css("left");
        currentLeft = parseInt(currentLeft);
        if (currentLeft < 0 ){
            scroolWrapper.animate({"left":'0'});
        }else{
            scroolWrapper.animate({"left":'-400px'});
        }

    })
});