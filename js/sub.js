$(document).ready(function () {
    
    var $header = $('#header');
    var dep1 = $('body').data('dep-one') -1;
    var dep2 = $('body').data('dep-two') -1;
    //console.log(dep1, dep2);
    var $lesson = $('#lesson');
    var $first;
    var $last;
    var winWid;
    var mobileSize = 767
    var isMobile = $(window).width() <= mobileSize? true : false;
    //console.log(winWid);

    //네비게이션_pc
    var $pcheader = $header.find('.pcheader');
    var $gnb = $('#gnb > ul');
    var $gnbDep2 = $pcheader.find('.dep2');

    $gnbDep2.hide();

    $header.on('mouseenter focusin', function() {
        $first = $pcheader.find('[data-link="first"]');
        $last = $pcheader.find('[data-link="last"]');

        if (winWid > mobileSize) $(this).addClass('on');
          
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

        $('section').find('.subtit').css({opacity: 0, filter: 'Alpha(opacity=00)'});

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
            $('section').find('.subtit').delay(500).animate({opacity: 1, filter: 'Alpha(opacity=100'});
        })
    })

    //Resize

    $(window).on('resize', function () {
        winWid = $(window).width();
        
        if ( winWid > mobileSize && isMobile == true ) {
            $('#header *').removeAttr('style');
            isMobile  = false;
        }
        else if ( winWid <= mobileSize && isMobile == false ) {
            $('#header *').removeAttr('style');
            isMobile  = true;
        }
    })

    $lesson.find('.cntwrap .sub_cnt .btm_btn').each(function (idx) {
        $(this).children().eq(idx).css({display: 'none'});
    })

    $lesson.find('.btnwrap ul li a').on('click', function (e) {
        e.preventDefault();

        var tgIdx = $(this).parent().index();
        var tg = $(this);
        //console.log(tgIdx);

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

        winWid = $(window).width();
        if (winWid > mobileSize) {
            $lesson.find('.cntwrap > div').eq(tgIdx).find('.txt_box').css({height: detailH});   //padding-top: 100px 제외
            console.log(detailH)
            
            $('#wrap').on('scroll', function () {
                var scrollT = $(this).scrollTop();
                var wrapH = $('#wrap').height();
                console.log(wrapH, scrollT);
                if (scrollT >= $(window).height()) {
                    $('.detail_txt').css({position: 'fixed', top: 0, left: '50%'});
                } else {
                    $('.detail_txt').removeAttr('style');
                }
            });
            
            $('#footer').css({display: 'block',marginTop: detailH+300});
        }
        else {
            var mpicH = $lesson.find('.cntwrap > div').eq(tgIdx).find('.detail_txt').height();
            console.log(winWid, detailH, mpicH);
            $lesson.find('.cntwrap > div').eq(tgIdx).find('.detail_pic').css({top: mpicH})
            $('#footer').css({display: 'block',marginTop: detailH+mpicH+150});
            $lesson.find('.cntwrap > div').eq(tgIdx).find('.btm_btn').css({marginTop: detailH})
        }        
    });

    $lesson.find('.cntwrap .sub_cnt .sub_bg .scroll').on('click', function (e) {
        e.preventDefault();
        console.log($(window).height());
        $('#wrap').stop().animate({scrollTop: $(window).height()});
    });

    $lesson.find('.cntwrap .sub_cnt .detail .btm_btn li a').on('click', function (e) {
		e.preventDefault();
		var changeIdx = $(this).parent().index();
		//console.log(changeIdx);
        $('html, body').stop().animate({scrollTop: 0});
		$lesson.find('.cntwrap .sub_cnt.show').removeClass('show');
		$lesson.find('.btnwrap ul li').removeClass('show');

		setTimeout(function () {
			$lesson.find('.btnwrap ul li').eq(changeIdx).children().click();
		}, 1500);
    });

    /* detail box 하단에 비어있는 높이를 인식하는 문제 (.btm_btn 이나 #footer의 마진값으로 추정)
    $('#wrap').on('scroll', function () {
        var scrollT = $(this).scrollTop();
        var wrapH = $('#wrap').height();
        console.log(wrapH, scrollT);
        if (scrollT >= $(window).height()) {
            $('.detail_txt').css({position: 'fixed', top: 0, left: '50%'});
        } else {
            $('.detail_txt').removeAttr('style');
        }
        //.detail_txt 높이값 다시 제어해주기!!!
    }); 
    */
    
    //#calendar
    var $calendar = $('#calendar');
    var now = new Date();
    var yy = now.getFullYear();
    var mm = now.getMonth();
    var dd = now.getDate();
    //console.log(now, yy, mm, dd);

    makeCalendar (yy, mm);

    function makeCalendar (year, month) {
        //console.log(year, month)
        $calendar.find('.yymm .cal_tit, table').remove();

        var startDate = new Date (year, month, 1);
        var startDay = startDate.getDay();
        var last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) last[1] = 29;
        var lastDate = last[month];
        //console.log(startDay, lastDate);
        var calTit = '<h3 class="cal_tit"><span class="tit_mm">' + (month+1) + '</span>월 <span class="tit_yy">' + year + '</span></h3>'
        //console.log(calTit);
        var row = Math.ceil((startDay+lastDate)/7)
        //console.log(row);

        var tbl = '';
        tbl += '<table>';
        tbl += '<caption class="blind">' + year + '년 ' + (month+1) + '월</caption>';
        tbl += '<thead>';
        tbl += '<tr>';
        tbl += '<th scope="col">일</th>';
        tbl += '<th scope="col">월</th>';
        tbl += '<th scope="col">화</th>';
        tbl += '<th scope="col">수</th>';
        tbl += '<th scope="col">목</th>';
        tbl += '<th scope="col">금</th>';
        tbl += '<th scope="col">토</th>';
        tbl += '</tr>';
        tbl += '</thead>';
        tbl += '<tbody>';
        var num = 1;

        for (var i=1; i<=row; i++) {
            tbl += '<tr>'
                for (var j=1; j<=7; j++) {
                    if ((i == 1 && j <=startDay) || (num > lastDate)) {
                        tbl += '<td class="null">&nbsp;</td>';
                    }
                    else {
                        tbl += '<td class="d' + num + '"><a href="">' + num + '</a></td>';
                        num++
                    }
                }
            tbl += '<tr>';
        }
        tbl += '</tbody>';
        tbl += '</table>';

        $calendar.find('.yymm').prepend(calTit).after(tbl);

        if (yy == year & mm == month) $calendar.find('table tbody tr td.d' + dd).addClass('today');
        if (yy == year & mm >= month) $calendar.find('table tbody tr td.d' + num).addClass('line');
    }

    $calendar.find('.yymm .btn button').on('click', function () {
        var idx = $(this).index();
        idx == 0? changeMonth(-1) : changeMonth(1)
    })

    function changeMonth (control) {
        var y2 = parseInt($calendar.find('.tit_yy').text());
        var m2 = parseInt($calendar.find('.tit_mm').text()-1);
        
        m2 += control;
        if (m2 == -1) {
            y2 -= 1;
            m2 = 11;
        } else if (m2 ==12) {
            y2 += 1;
            m2 = 0;
        }
        makeCalendar(y2, m2);
    }

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