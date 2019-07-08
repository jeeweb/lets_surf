$(document).ready(function () {
    //네비게이션
    var $header = $('#header');
    var $gnb = $('#gnb > ul');
    var $gnbDep2 = $('#header .area').find('.dep2');
    var dep1 = $('body').data('dep-one') -1;
    var dep2 = $('body').data('dep-two') -1;
    //console.log(dep1, dep2);
    var $lesson = $('#lesson');        

    $gnbDep2.hide();

    $header.on('mouseenter focusin', function() {
        $(this).addClass('on');    
        $gnbDep2.slideDown();
        
        $gnb.find('> li').on('mouseenter focusin', function() {
            $(this).addClass('on').siblings().removeClass('on');    
        })
    })
        
    $('#header').on('mouseleave', gnbReturn);

    function gnbReturn() {
        $gnbDep2.slideUp();
        $gnb.find('> li.on').removeClass('on');
        if (dep1 >= 0) $gnb.children().eq(dep1).addClass('pick').find('> div > ul > li').eq(dep2).addClass('pick');
        $header.removeClass('on')
        //dep2 배경 사라지는 속도 제어 
    }
    gnbReturn();

    $('#header').find('[data-link="first"] [data-link="last"]').on('blur', function () {
        setTimeout(function () {
            if (!$('#header').find('a').is(':focus')) gnbReturn();
        }, 10)
    });
    
    //포커스가 네비게이션에서 나가면 dep2 사라지게
  
    //네비게이션_모바일
    var $first;
    var $last;
    $header.find('.mbtn_open').on('click', function (e) {
        e.preventDefault(); 
        $first = $header.find('[data-link="first"]');
        $last = $header.find('[data-link="last"]');
        $gnb.css({display: 'block'}).next('.sns').css({display: 'block'}).next('.mbtn_close').css({display: 'block'});
    })

    $lesson.find('.cntwrap .sub_cnt .btm_btn').each(function (idx) {
        $(this).children().eq(idx).css({display: 'none'});
    })

    $lesson.find('.btnwrap ul li a').on('click', function (e) {
        e.preventDefault();

        var tgIdx = $(this).parent().index();
        var tg = $(this);
        //console.log(tgIdx);
        var $txtBox = $lesson.find('.cntwrap > div').eq(tgIdx).find('.detail');
        var txtBoxT = $txtBox.position().top;
        var footerT = detailH+300
        console.log(txtBoxT, footerT);

        var $stepEle = $lesson.find('.cntwrap > div').eq(tgIdx).find('.detail_pic > div');
        //console.log($stepEle.length);
        var detailH = 0;
        for (var i=0; i < $stepEle.length; i++) {
            detailH += $stepEle.eq(i).outerHeight(true);
            //console.log(detailH);
        }

        $(this).parent().css({opacity: 0});
        $lesson.find('.btnwrap ul li').addClass('show');

        $lesson.find('.cntwrap > div').eq(tgIdx).addClass('show').siblings().removeClass('show').find('.sub_tit').removeClass('active');
        setTimeout(function () {
            $lesson.find('.cntwrap > div').eq(tgIdx).find('.sub_tit').addClass('active');
        }, 800);

        setTimeout(function () {
            $lesson.find('.btnwrap').css({zIndex: -1});
            tg.parent().removeAttr('style');
        }, 1350)

        $lesson.find('.cntwrap > div').eq(tgIdx).find('.txt_box').css({height: detailH})   //padding-top: 100px 제외

        $(window).on('scroll', function() {
            var scrollT = $(this).scrollTop();
            //console.log(scrollT);

            //if (scrollT < txtBoxT)
        });

        $('#footer').css({display: 'block',marginTop: detailH+300});

    });




    $lesson.find('.cntwrap .sub_cnt .detail .btm_btn li a').on('click', function (e) {
		e.preventDefault();
		var changeIdx = $(this).parent().index();
		console.log(changeIdx);

		$lesson.find('.cntwrap .sub_cnt.show').removeClass('show');
		$lesson.find('.btnwrap ul li').removeClass('show');

		setTimeout(function () {
			$lesson.find('.btnwrap ul li').eq(changeIdx).children().click();
		}, 1500);
	});
})