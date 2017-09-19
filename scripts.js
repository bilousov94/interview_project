$(function() {

    var App = {

        init: function(){

            App.showData();
            App.bindEvents();
        },

        showData: function(){
            var baseURL = "https://jsonplaceholder.typicode.com";

            var numberOfUsers = 2;

            for(var j = 1; j <= numberOfUsers; j++){

                $.ajax({
                    url: baseURL + '/users/' +j+ '/albums',
                    method: 'GET'

                }).then(function(data){
                    for(var i = 0; i<data.length; i++ ){
                        var row = "<div name='"+data[i].userId +"' id='"+data[i].id + "' class='table__row draggable'>" +
                            "<div class='table__cell table__cell--short'>" + data[i].id + "</div>" +
                            "<div class='table__cell table__cell'>" + data[i].title + "</div>" +
                            "   </div>";
                        var userId = "#user_" + data[i].userId;
                        $(userId).append(row);

                        if(i == (data.length-1)){
                            init();
                        }
                    }
                });

            }


        },

        bindEvents: function() {
            $(".draggable").on('click', init());
            $('.search_user_1').keyup(function () {
                var str = $('.search_user_1 input').val();
                var exp = new RegExp(str, 'i');
                var el = $('#user_1').children().length;

                for(var i = 2; i <= el; i++){
                    var text = $('#user_1 div:nth-child(' + i + ') div:nth-child(2)').text();
                    if(text.match(exp)){
                        $('#user_1 div:nth-child(' + i + ')').css("display", "");
                        $('#user_1 div:nth-child(' + i + ') div:nth-child(2)').css("display", "");
                    } else {
                        $('#user_1 div:nth-child(' + i + ')').css("display", "none");
                    }
                }
            });

            $('.search_user_2').keyup(function () {
                var str = $('.search_user_2 input').val();
                var exp = new RegExp(str, 'i');
                var el = $('#user_2').children().length;

                for(var i = 2; i <= el; i++){
                    var text = $('#user_2 div:nth-child(' + i + ') div:nth-child(2)').text();
                    if(text.match(exp)){
                        $('#user_2 div:nth-child(' + i + ')').css("display", "");
                        $('#user_2 div:nth-child(' + i + ') div:nth-child(2)').css("display", "");
                    } else {
                        $('#user_2 div:nth-child(' + i + ')').css("display", "none");
                    }
                }
            });

        }
    };

    function getElementsByClassName(objElement, strTagName, strClassName)
    {
        var objCollection = objElement.getElementsByTagName(strTagName);
        var arReturn = [];
        var strClass, arClass, iClass, iCounter;

        for(iCounter=0; iCounter<objCollection.length; iCounter++)
        {
            strClass = objCollection[iCounter].className;
            if (strClass)
            {
                arClass = strClass.split(' ');
                for (iClass=0; iClass<arClass.length; iClass++)
                {
                    if (arClass[iClass] == strClassName)
                    {
                        arReturn.push(objCollection[iCounter]);
                        break;
                    }
                }
            }
        }

        objCollection = null;
        return (arReturn);
    }

    var drag = {
        objCurrent : null,

        arTargets : ['user_1', 'user_2'],

        initialise : function(objNode)
        {
            objNode.onmousedown = drag.start;

        },

        removePopup : function()
        {
            var objContext = document.getElementById('popup');

            if (objContext)
            {
                objContext.parentNode.removeChild(objContext);
            }
        },

        start : function(objEvent)
        {
            objEvent = objEvent || window.event;
            drag.removePopup();
            drag.objCurrent = this;

            drag.objCurrent.lastX = objEvent.clientX;
            drag.objCurrent.lastY = objEvent.clientY;
            drag.objCurrent.style.zIndex = '2';

            document.onmousemove = drag.drag;
            document.onmouseup = drag.end;
            drag.identifyTargets(true);

            return false;
        },

        drag : function(objEvent) {
            objEvent = objEvent || window.event;


            // Calculate new position
            var iCurrentY = objEvent.clientY;
            var iCurrentX = objEvent.clientX;
            var iYPos = parseInt(drag.objCurrent.style.top, 10);
            var iXPos = parseInt(drag.objCurrent.style.left, 10);
            var iNewX, iNewY;

            iNewX = iXPos + iCurrentX - drag.objCurrent.lastX;
            iNewY = iYPos + iCurrentY - drag.objCurrent.lastY;

            drag.objCurrent.style.left = iNewX + 'px';
            drag.objCurrent.style.top = iNewY + 'px';
            drag.objCurrent.lastX = iCurrentX;
            drag.objCurrent.lastY = iCurrentY;

            return false;
        },

        calculatePosition : function (objElement, strOffset)
        {
            var iOffset = 0;

            // Get offset position in relation to parent nodes
            if (objElement.offsetParent)
            {
                do
                {
                    iOffset += objElement[strOffset];
                    objElement = objElement.offsetParent;
                } while (objElement);
            }

            return iOffset;
        },


        identifyTargets : function (bHighlight)
        {
            var strExisting = drag.objCurrent.parentNode.getAttribute('id');
            var objList;

            // Highlight the targets for the current drag item
            for (var i = 0; i<drag.arTargets.length; i++)
            {
                objList = document.getElementById(drag.arTargets[i]);
                if (bHighlight && drag.arTargets[i] != strExisting)
                {
                    objList.className = 'light table';
                 
                }
                else
                {
                    objList.className = 'table';

                }
            }
        },

        getTarget : function()
        {
            var strExisting = drag.objCurrent.parentNode.getAttribute('id');
            var iCurrentLeft = drag.calculatePosition(drag.objCurrent, 'offsetLeft');
            var iCurrentTop = drag.calculatePosition(drag.objCurrent, 'offsetTop');
            var iTolerance = 40;
            var objList, iLeft, iRight, iTop, iBottom, iCounter;

            for (iCounter=0; iCounter<drag.arTargets.length; iCounter++)
            {
                if (drag.arTargets[iCounter] != strExisting)
                {
                    // Get position of the list
                    objList = document.getElementById(drag.arTargets[iCounter]);
                    iLeft = drag.calculatePosition(objList, 'offsetLeft') - iTolerance;
                    iRight = iLeft + objList.offsetWidth + iTolerance;
                    iTop = drag.calculatePosition(objList, 'offsetTop') - iTolerance;
                    iBottom = iTop + objList.offsetHeight + iTolerance;

                    // Determine if current object is over the target
                    if (iCurrentLeft > iLeft && iCurrentLeft < iRight && iCurrentTop > iTop && iCurrentTop < iBottom)
                    {
                        return drag.arTargets[iCounter];
                    }
                }
            }

            // Current object is not over a target
            return '';
        },

        dropObject : function(strTarget)
        {
            var objClone, objOriginal, objTarget;

            drag.removePopup();

            if (strTarget.length > 0)
            {
                // Copy node to new target
                objOriginal = drag.objCurrent.parentNode;
                objClone = drag.objCurrent.cloneNode(true);


                objTarget = document.getElementById(strTarget);
                objOriginal.removeChild(drag.objCurrent);
                objTarget.appendChild(objClone);
                drag.objCurrent = objClone;
                drag.initialise(objClone);


            }
            // Reset properties
            drag.objCurrent.style.left = '0px';
            drag.objCurrent.style.top = '0px';
            drag.objCurrent.style.zIndex = 'auto';
            drag.identifyTargets(false);
        },

        end : function()
        {
            var strTarget = drag.getTarget();

            drag.dropObject(strTarget);

            document.onmousemove = null;
            document.onmouseup   = null;
            drag.objCurrent = null;
            $('#user_2').removeClass('light');
        }
    };

    function init ()
    {
        var objItems = getElementsByClassName(document, 'div', 'draggable');
        var iCounter;

        for (iCounter=0; iCounter<objItems.length; iCounter++)
        {
            // Set initial values so can be moved
            objItems[iCounter].style.top = '0px';
            objItems[iCounter].style.left = '0px';


            drag.initialise(objItems[iCounter]);
        }

        objItems = null;
    }

    App.init();

});