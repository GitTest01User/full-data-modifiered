
        // calendar

        // $("#doctor-calendar").fullCalendar({
        //   header: {
        //     left: 'prev',
        //     center: 'title',
        //     right: 'next'
        //   },
        //   defaultView: 'month'
        // });
        // calendar
        $("#doctor-calendar").fullCalendar({
            header: {
                left: 'prev',
                center: 'title',
                right: 'next',
  
  
            },
            defaultView: 'month',
            selectable: true,
            // selectable: true,
            selectHelper: true,
            select: function (start, end, allDay) {
                console.log("called", (end._d), " ", typeof (end._d))
                console.log("called", )
                let arr = String(end._d).split(" ")
                document.getElementById("select-year").innerText = arr[1] + " " + arr[2] + " " + arr[3];
            }
  
        });
  
  
        $('#fullCal').fullCalendar({
            events: [{
                title: 'Event 1',
                start: moment().add(1, 'h'),
                end: moment().add(2, 'h'),
                allDay: false
            }],
            header: {
                left: '',
                center: 'prev title next today',
                right: ''
            },
            timezone: 'local',
            defaultDate: '2014-11-15',
            editable: false,
            eventLimit: false,
            firstDay: 6,
            defaultView: 'agendaWeek',
            defaultView: 'month',
            selectable: true,
            // selectable: true,
            selectHelper: true,
            select: function (start, end, allDay) {
                console.log("called", (end._d), " ", typeof (end._d))
                console.log("called", )
                let arr = String(end._d).split(" ")
                document.getElementById("select-year").innerText = arr[1] + " " + arr[2] + " " + arr[3];
                // $("#year_modal").hide();
            }
        });
  
  
        // Add active class to the current button (highlight it)
        var header = document.getElementById("myDIV");
        var btns = header.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
  
  
  
  
        function startCountdown() {
            timeLeft = 60;
  
            function countdown() {
                timeLeft--;
                document.getElementById("seconds").innerHTML = String(timeLeft);
                if (timeLeft > 0) {
                    setTimeout(countdown, 1000);
                }
            };
  
            setTimeout(countdown, 1000);
        }
  
  
  
        $(".smart_product").on("click", function () {
            //  console.log($(this.id).text())
            console.log(document.getElementById(this.id).innerText)
            document.getElementById("smart-sell-applience").innerText = document.getElementById(this.id)
                .innerText
        })
        // Product-type1
        function modelOpen() {
            // document.getElementById("modelParent").style.display="flex";
            $(".fc-today-button").click();
            $(".fc-today-button").hide();
            console.log("sdfsdf")
        }
  
        // $('#spy > ul > li').on('click',function(){
        //   setTimeout(function(){
        //   $(document).scrollTop($('#howItWorks').position().top-100)
        // },450)
        // })



       