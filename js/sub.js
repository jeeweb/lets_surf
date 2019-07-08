$(document).ready(function () {
    //네비게이션
    var $header = $('#header');
    
    var dep1 = $('body').data('dep-one') -1;
    var dep2 = $('body').data('dep-two') -1;
    //console.log(dep1, dep2);
    var $lesson = $('#lesson');   
    var $first;
    var $last;

    //네비게이션_pc
    var $pcheader = $header.find('.pcheader');
    var $gnb = $('#gnb > ul');
    var $gnbDep2 = $pcheader.find('.dep2');

    $gnbDep2.hide();

    $pcheader.on('mouseenter focusin', function() {
        $first = $pcheader.find('[data-link="first"]');
        $last = $pcheader.find('[data-link="last"]');

        $(this).addClass('on');    
        $gnbDep2.slideDown();
        
        focusControl ()

        $gnb.find('> li').on('mouseenter focusin', function() {
            $(this).addClass('on').siblings().removeClass('on');    
        })

        $pcheader.find('[data-link="first"] [data-link="last"]').on('blur', function () {
            setTimeout(function () {
                if (!$pcheader.find('a').is(':focus')) gnbReturn();
            }, 10)
        });
    })
        
    $pcheader.on('mouseleave', gnbReturn);
    gnbReturn();
 
    //네비게이션_모바일
    var $mheader = $header.find('.mheader');
    var $mgnb = $mheader.find('#mgnb');
    
    $mheader.find('.mbtn_open').on('click', function (e) {
        e.preventDefault(); 
        $first = $mgnb.find('[data-link="first"]');
        $last = $mgnb.find('[data-link="last"]');
        $mgnb.stop().slideDown(function () {
            $first.focus();
            $mgnb.find('> *').each(function (idx) {
                setTimeout(function() {
                    $mgnb.find('> *').eq(idx).css({opacity: 1, filter: 'Alpha(opacity=100)'})
                }, 300*(idx+1))
            })
        });

        focusControl ()

        $mgnb.find('.gnb_open li a').on('click', function (e) {
            $(this).next().toggle().parent().siblings().children('div').hide();
        });

        $mgnb.find('.mbtn_close').on('click', function (e) {
            e.preventDefault();
            $mgnb.stop().slideUp(500, function() {
                $gnb.find('> *').css({opacity: 0, filter: 'Alpha(opacity=0'});
            });
        })
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
        $('html, body').stop().animate({scrollTop: 0});
		$lesson.find('.cntwrap .sub_cnt.show').removeClass('show');
		$lesson.find('.btnwrap ul li').removeClass('show');

		setTimeout(function () {
			$lesson.find('.btnwrap ul li').eq(changeIdx).children().click();
		}, 1500);
    });
    
    function focusControl () {
        $first.on('keydown', function (e) {
            //console.log(e.keyCode);
            if (e.keyCode == 9 && e.shiftKey) {
                e.preventDefault();
                $last.focus();
            }
        });
        $last.on('keydown', function (e) {
            if (e.keycode == 9 && !e.shiftKey) {
                e.preventDefault();
                $first.focus();
            }
        });
    }

    function gnbReturn() {
        $gnbDep2.slideUp();
        $gnb.find('> li.on').removeClass('on');
        if (dep1 >= 0) $gnb.children().eq(dep1).addClass('pick').find('> div > ul > li').eq(dep2).addClass('pick');
        $header.removeClass('on')
        //dep2 배경 사라지는 속도 제어 
    }
})