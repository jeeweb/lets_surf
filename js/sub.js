$(document).ready(function () {
    //네비게이션
    var $gnb = $('#gnb > ul');
    var $gnbDep2 = $('#header .area').find('.dep2');
    var dep1 = $('body').data('dep-one') -1;
    var dep2 = $('body').data('dep-two') -1;
    console.log(dep1, dep2);        

    $gnbDep2.hide();

    $gnb.find('> li').on('mouseenter focusin', function() {
        $gnbDep2.slideDown();
        $(this).addClass('on').siblings().removeClass('on');
        $('#header').append('<div class="dep2_bg"></div>');
    })
    
    $('#header').on('mouseleave', gnbReturn);

    function gnbReturn() {
        $gnbDep2.slideUp();
        $gnb.find('> li.on').removeClass('on');
        if (dep1 >= 0) $gnb.children().eq(dep1).addClass('pick').find('> div > ul > li').eq(dep2).addClass('pick');
        $('#header > .dep2_bg').delay(1000).remove();
    }
    gnbReturn();

    $('#header').find('a:first a:last').on('blur', function () {
        setTimeout(function () {
            if (!$('#header').find('a').is(':focus')) gnbReturn();
        }, 10)
    });
    
    //포커스가 네비게이션에서 나가면 dep2 사라지게
    //dep2 배경 사라지는 속도 제어 

    //
    
})