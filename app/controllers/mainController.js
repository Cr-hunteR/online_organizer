app.controller('MainCtrl',($scope,$log,$interval)=>{
    $scope.events=[
        {"id":0,"title":"AngularJs online Session","time":"00:23:12","date": "04/13/2020","fullDate":new Date(2020, 3, 13)},
        {"id":1,"title":"AngularJs Hands on","time":"00:43:12","date": "04/28/2020","fullDate":new Date(2020, 3, 28)},
        {"id":2,"title":"ReactJs Hands on","time":"10:43:12","date": "04/21/2020","fullDate":new Date(2020, 3, 21)},
        {"id":3,"title":"ReactJs Boot camp","time":"05:43:12","date": "04/23/2020","fullDate":new Date(2020, 3, 23)},

    ];
    $scope.myDate=new Date();


    const sortEventsByDate=()=>{
        $scope.events.sort(function(a, b) {
            let distancea = Math.abs($scope.currentDate - a.fullDate);
            let distanceb = Math.abs($scope.currentDate - b.fullDate);
            return distancea - distanceb; // sort a before b when the distance is smaller
        });
    };
    sortEventsByDate();

    $interval(()=>{
        $scope.currentDate=new Date();
        $scope.filteredEvents=$scope.events.filter(e=>{return moment(e.fullDate).isAfter($scope.currentDate)});
        console.log($scope.filteredEvents);

        let comingUpEvent=$scope.filteredEvents[0].fullDate;
        let currentTime=Math.floor(Date.now());
        let remainingTime=(comingUpEvent-currentTime)/1000;
        $scope.comingUpEventName=$scope.filteredEvents[0].title;
        $scope.remDays=parseInt(remainingTime/60/60/24);
        $scope.remHours=parseInt((remainingTime-($scope.remDays*24*60*60))/60/60);
        $scope.remMins=parseInt((remainingTime-($scope.remDays*24*60*60)-($scope.remHours*60*60))/60);
        $scope.remSecs=parseInt((remainingTime)-($scope.remDays*24*60*60)-($scope.remHours*60*60)-($scope.remMins*60));
        sortEventsByDate();

    },2000);

    $scope.isCreating=null;
    $scope.isEditting=null;

    $scope.formattedDate=moment($scope.myDate).format('L');
    $scope.changedDate=function(){
        if($scope.myDate){
            $scope.formattedDate=moment($scope.myDate).format('L');
            console.log($scope.formattedDate);
        }
        $log.log('Date changed to: ' + $scope.myDate);
    };


    const startCreating=()=>{
        $scope.isCreating=true;
        $scope.isEditting=false;
        resetFormVal();
    };
    const showCreatingForm=()=>{

        return $scope.isCreating && !$scope.isEditting;
    }

    $scope.createEvent=(oEvent)=>{

        let tmpEvent={};
        tmpEvent.id=4;
        tmpEvent.title=oEvent.title;
        tmpEvent.time=moment(oEvent.time).format('HH:mm:ss');
        tmpEvent.date=moment($scope.myDate).format('L');
        tmpEvent.fullDate=new Date(tmpEvent.date+" "+tmpEvent.time);



        console.log(tmpEvent);
        $scope.events.push(tmpEvent);
        console.log($scope.events);
        sortEventsByDate();
        resetFormVal();
    };

    const resetFormVal=()=>{

        $scope.newEvent={
            title:"",
            time:""
        }
    };

    /*time picker*/
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.mytime);
    };



    $scope.clear = function() {
        $scope.mytime = null;
    };
    /*time picker end*/



    $scope.startCreating=startCreating;
    $scope.showCreatingForm=showCreatingForm;
});