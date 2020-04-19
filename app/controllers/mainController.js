app.controller('MainCtrl',($scope,$log,$interval)=>{
    $scope.events=[


    ];
    //$scope.filteredEvents=$scope.events;
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
        if($scope.events.length!=0){
            $scope.filteredEvents=$scope.events.filter(e=>{return moment(e.fullDate).isAfter($scope.currentDate)});
            $scope.expiredEvents=$scope.events.filter(e=>{return moment(e.fullDate).isBefore($scope.currentDate)});
            console.log($scope.filteredEvents);
            if($scope.filteredEvents.length!=0){
                let comingUpEvent=$scope.filteredEvents[0].fullDate;
                let currentTime=Math.floor(Date.now());
                let remainingTime=(comingUpEvent-currentTime)/1000;
                $scope.comingUpEventName=$scope.filteredEvents[0].title;
                $scope.comingUpEventDate=$scope.filteredEvents[0].date;
                $scope.remDays=parseInt(remainingTime/60/60/24);
                $scope.remHours=parseInt((remainingTime-($scope.remDays*24*60*60))/60/60);
                $scope.remMins=parseInt((remainingTime-($scope.remDays*24*60*60)-($scope.remHours*60*60))/60);
                $scope.remSecs=parseInt((remainingTime)-($scope.remDays*24*60*60)-($scope.remHours*60*60)-($scope.remMins*60));
                sortEventsByDate();
            }

        }else {
            $scope.filteredEvents=[];
            $scope.expiredEvents=[];
        }


    },1000);

    $scope.formattedDate=moment($scope.myDate).format('LL'); /*Remember to use this format also in the createEvent Operation,
                                                                    Because this variable will be used to filter out the Events in the index.html*/
    $scope.changedDate=function(){
        if($scope.myDate){
            $scope.formattedDate=moment($scope.myDate).format('LL');
            console.log($scope.formattedDate);
        }
        $log.log('Date changed to: ' + $scope.myDate);
    };

    $scope.isCreating=null;
    $scope.isEditing=null;
    /*Create Operation*/
    const startCreating=()=>{
        $scope.isCreating=true;
        $scope.isEditing=false;
        resetFormVal();
    };

    const showCreatingForm=()=>{

        return $scope.isCreating && !$scope.isEditing;
    };

    $scope.createEvent=(oEvent)=>{
        if(oEvent.title && oEvent.time){
            let maxId=0;
            let arrayLength=$scope.events.length;
            for(let i=0;i<arrayLength;i++){
                if($scope.events[i].id>maxId){
                    maxId=$scope.events[i].id;
                }
            }
            let tmpEvent={};
            tmpEvent.id=++maxId;
            console.log(maxId);
            tmpEvent.title=oEvent.title;
            tmpEvent.time=moment(oEvent.time).format('HH:mm:ss');
            tmpEvent.date=moment($scope.myDate).format('LL');
            tmpEvent.fullDate=new Date(tmpEvent.date+" "+tmpEvent.time);
            console.log(tmpEvent);
            $scope.events.push(tmpEvent);
            console.log($scope.events);
            sortEventsByDate();
            resetFormVal();
        }

    };

    $scope.cancelCreateForm=()=>{
      $scope.isCreating=false;
    };
    /*Create Operation End*/

    const resetFormVal=()=>{

        $scope.newEvent={
            title:"",
            time:""
        }
    };
    /*Edit Operation*/
    $scope.startEditing=()=>{
        $scope.isEditing=true;
        $scope.isCreating=false;
        //resetFormVal();
    };
    $scope.showEditForm=()=>{
        return $scope.isEditing && !$scope.isCreating;
    };
    $scope.oldEvent=null;
    $scope.realTimePlaceHolders=(oldEvent)=>{
        $scope.oldEvent=angular.copy(oldEvent);
    };
    $scope.editEvent=(eEvent)=>{
        let index=_.findIndex($scope.events,(e)=>e.id===eEvent.id);
        eEvent.time=moment(eEvent.fullDate).format('HH:mm:ss');
        $scope.events[index]=eEvent;
        $scope.oldEvent=null;
        $scope.isEditing=false;
    };

    $scope.cancelEditForm=()=>{
        $scope.isEditing=false;
    };
    /*Edit Operation End*/

    /*Delete Operation*/
    $scope.deleteEvent=(dEvent)=>{
        _.remove($scope.events,(e)=>e.id===dEvent.id);
    };
    /*Delete Operation End*/

    /*Time picker-https://angular-ui.github.io/bootstrap/*/
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.options = {/*not used*/
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {/*not used*/
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.mytime);
    };



    $scope.clear = function() {/*not used*/
        $scope.mytime = null;
    };
    /*time picker end*/



    $scope.startCreating=startCreating;
    $scope.showCreatingForm=showCreatingForm;
});