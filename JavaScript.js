var curr_theme="#f2f2f2";   // 0-black , 1- red , 2-blue , 3 white
var page_number=5;  // 0- default , 2 - settings-Study ,3 -settings-Colors ,4 - settings - bckup
var AllCourses =	[];
var AllTests =		[];
var AllTrimsters=	[];
var AllJobs=		[];
var OtherEvents =	[];

function CustomMenu(){
    this.render = function(){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
			var dialogoverlay = $("#menu_overlay");
			var dialogbox = $("#menu");
		
		dialogoverlay.css("display", "block");
		dialogoverlay.css("height", winH+"px");
        dialogoverlay.css("top", (winH*0.05)+"px");
		dialogbox.css("left", 0+"px");
		dialogbox.css("top", (winH*0.05)+"px");
		dialogbox.css("display", "block");
		//build main menu dynamiclly
		$("#menu_header").css("text-align","center");
		$("#menu_header").html("Main Menu : ");
		
   }
}
function CustomConfirm(){
	this.render = function(date){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = $("#dialogoverlay");
		var dialogbox = $("#dialogbox");
        
        date = date.format('YYYY-MM-DD');
        
		dialogoverlay.css("display", "block");
		dialogoverlay.css("height", winH+"px");
		dialogoverlay.css("z-index", "10");
		dialogbox.css("left", (winW/2) - (550 /2)+"px");
		dialogbox.css("top", ((winH/2)-200)+"px");
		dialogbox.css("display", "block");
		$("#dialogbox_head").html("new Task creation : ");
        $("#dialogbox_body").html("<form id ='form'> "+
            "<label for='task_sdate'>Start date : </label>"+
            "<input type='date' id='task_sdate'><br>"+
            
            "<label for='task_edate'>End date : </label>"+
            "<input type='date' id='task_edate'><br>"+
            
            "<label for='task_name'>description: </label>"+
            "<input type='text' id='task_name'><br>"+

            "<label for='task_color'>color : </label>"+
            "<input type='color' id='task_color'>"+
            "</form>");
        $("#task_sdate").val(date);
		$("#dialogbox_foot").html("<button id='b_next' onclick='addNew.yes()'>Next</button> ");
	}
	this.yes = function(){
        var start 	= $("#task_sdate").val();
        var end 	= $("#task_edate").val();
        var name 	= $("#task_name").val();
        var color 	= $("#task_color").val();
        if(start && end && name && color){
            addCalanderEvent(start,end,name,color);
        }else{
            if (start && name && color){
                addCalanderEvent(start,start,name,color);
            }
        }
        
		$("#dialogbox").css("display", "none");
		$("#dialogoverlay").css("display", "none");
	}
}
var addNew = new CustomConfirm();
var menu_obj = new CustomMenu();
$(document).ready(function() {
    build_page_by_theme(curr_theme,page_number);
});
$( window ).resize(function() {
    build_page_by_theme(curr_theme,page_number);
});
function mster_click(item){
	var _for =$(item).attr("for");
	var id =_for.slice(-1);
	$( "#"+_for ).prop( "checked", true );
	var _htmlCourser="";
	for(var i=0;i<id;i++)_htmlCourser+="<span class ='crs_filler' style ='border-style:none;'></span>";
	if(AllTrimsters[id].courses !==null){
		_courses=AllTrimsters[id].courses;
		_htmlCourser+="<span class ='crs'style ='border-style:none;'>&#8628</span>";
		for(var i=0;i<_courses.length;i++){
			_htmlCourser+="<label class = 'crs_lbl' for='crs_menu_"+i+"' >"+_courses[i].name+"</label>"
			_htmlCourser+="<input type='radio' name='crs' class='crs' onclick='crs_click(this)' id='crs_menu_"+i+"' ><br>" ;
		}
	}
	var _courses = AllTrimsters[id].courses;
	
	

	_htmlCourser+="<label class = 'crs_lbl' for='plus_crs' >+</label>"
	_htmlCourser+="<input type='radio' name='crs' class='crs' id='plus_crs'>";
	
	$("#Courses").html( _htmlCourser);
	$("#Courses").css("display","block");
	


	$("#plus_crs").click(function() {
        $("#new_crs").css("display","block");
    });
}
function crs_click(item){
	
}
function build_page_by_theme(theme, page_num){
    $("#body").html("<div id='dialogoverlay'></div>"+ "<div id='dialogbox'><div id='dialogbox_head'></div><div id='dialogbox_body'></div><div id='dialogbox_foot'></div></div>");
    
    $("#body").html($("#body").html()+"<div id='menu_overlay'></div>");
    $("#body").html($("#body").html()+ "<div id='menu'><div id='menu_header'></div>"+
            "<div id='menu_body'>"+
			"<div id='cal_view' ><br>Calender view</div>"+
            "<div id='add_task' ><br>add task</div>"+ 
			"<div id='list_view'><br>list view</div>"+ 
			"<div id='buildTT'><br>build Time Table</div>"+ 
            "<div id='sett_b' 	><br>Settings</div>"+
            "</div></div>");
    $("#body").html($("#body").html()+ "<div id='menu_b'><h2>menu</h2></div>"+
                    "<div id='logo' > <h1>iStudent</h1></div>");
					
	if(localStorage.getItem("current-theme"))
		curr_theme=localStorage.getItem("current-theme");
	var tiny = tinycolor(curr_theme);
	$("#menu").css("background-color",curr_theme);
	$("#body").css("background-color",curr_theme);
	if(tiny.getBrightness() >100){
		$("#menu").css("color","black");
	}else{
		$("#menu").css("color","white");
	}
	if(page_num==0){
        //main page , add calender
        $("#body").html($("#body").html()+"<div id='calendar'></div>" );  
        $("#calendar").css("min-width",($(document).width()*0.9)+"px");    
    }
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		},
		
		lazyFetching:false,
		aspectRatio: 2.3,
		defaultDate: moment(),
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		dayClick: function(date, jsEvent, view) {
			 addNew.render(date);
		},
		eventClick: function(calEvent, jsEvent, view) {
			if($("#info_hover").length == 0){
				$("#body").html($("#body").html() + "<div id='info_hover'><div id='close_info'>X</div></div>" );
			}
			$("#info_hover").html($("#info_hover").html()+"<span>title : </span><span id='info_title'>"+calEvent.title+"</span>");
			$("#info_hover").css("background-color",calEvent.backgroundColor);
			$("#info_hover").css("top",jsEvent.pageY+"px");
			$("#info_hover").css("left",jsEvent.pageX+"px");
			$("#info_hover").css("display","inline");
			$("#close_info").css("display","inline");
			$("#info_hover").html($("#info_hover").html()+
			"<div id='rmv_event'>remove event</div>"+
			""
			);
			$("#dialogoverlay").css("height", window.innerHeight+"px");
			$("#dialogoverlay").css("display","block");
			$("#dialogoverlay").css("opacity","0");
			$("#close_info").click(function() {
				$("#info_hover").css("display","none");
				$("#dialogoverlay").css("display","none");
				page_number=0;
				build_page_by_theme(curr_theme,page_number);
			});
			$("#dialogoverlay").click(function() {
				$("#info_hover").css("display","none");
				$("#dialogoverlay").css("display","none");
				page_number=0;
				build_page_by_theme(curr_theme,page_number);
			});
			$("#rmv_event").click(function() {
				for(var i=0;i<localStorage.length;i++){
					if(localStorage.key(i) == calEvent.title){
						localStorage.removeItem(localStorage.key(i));
					}
				}
				page_number=0;
				build_page_by_theme(curr_theme,page_number);
			});
			/*
			alert('Event: ' + calEvent.title);
			alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			alert('View: ' + view.name);
			*/
		},
		eventResize: function(event,jsEvent) {
			addCalanderEvent(event.start,event.end,event.title,event.backgroundColor);
		},
		eventDrop: function(event,jsEvent) {
			addCalanderEvent(event.start,event.end,event.title,event.backgroundColor);
		}
	});
    if(page_num==0){
		var tempString ;
		var obj;    
	//get and render all events :
		rsrAll();
		for(var i=0;i<AllJobs.length;i++){
			//get from local storage
			obj = AllJobs[i];
			var tiny = tinycolor(obj.backgroundColor);
			if(tiny.getBrightness() <100){
				obj.textColor = "white";
			}else{
				obj.textColor = "black";
			}
			addCalanderEvent(obj.sDate,obj.eDate,obj.name,curr_theme);
		}
	}
    if(page_num==1){
        $("#body").html($("#body").html()+ "<div id = 'list_crs'></div>");
		$("#list_crs").css("min-width",($(document).width()*0.9)+"px");
		$("#list_crs").html($("#list_crs").html()+"");
	}
    if(page_num==2){	//setting page
        $("#body").html($("#body").html()+ "<div id = 'sett_tabs'></div><div id='settings'>Semster options</div>");
        $("#sett_tabs").html("<div id = 'study'>Study</div>"
                            +"<div id = 'colors'>Colors</div>"
                            +"<div id = 'bckup'>Import/Export</div>");
        $("#study").addClass("active");
        $("#settings").css("min-width",($(document).width()*0.9)+"px");
		$("#settings").html($("#settings").html()+
		"<div id='gen_opt'>"+
		"<span class='sub_head'>General</span><br>"+
		"<input type='checkbox' name='show_complete'> Show completed Tasks<br>"+
		"<label class='lbl_opt' for='pri_opt'>default priorty</label>"+
			"<select id='pri_opt' defult>"+
					"<option val='0' selected='selected'>Low</option>"+
					"<option val='1'>Medium-rare</option>"+
					"<option val='2'>Medium-well</option>"+
					"<option val='3'>High</option>"+
			"</select><br>"+
		"<label class='lbl_opt' for='def_view'>default view</label>"+
			"<select id='def_view'>"+
					"<option val='0'>Calender view</option>"+
					"<option val='1'>List view</option>"+
			"</select><br>"+
		"</div>"+
		"<div id='cal_opt'>"+
			"<span class='sub_head'>Calender options</span><br>"+
			"<label class='lbl_opt' for='sem_opt'>Semster type     </label>"+
			"<select id='sem_opt'><option val='2'>semester</option>"+
					"<option val='3'>trimster</option>"+
					"<option val='4'>quadmester</option>"+
			"</select><br>"+
			"<label class='lbl_opt' for='sem_sdate'>Start date : </label>"+
            "<input type='date' id='sem_sdate'><br>"+
			"<label class='lbl_opt' for='sem_edate'>Start date : </label>"+
            "<input type='date' id='sem_edate'><br>"+
		"</div>"+
		"<div id= 'Remove'>"+
			"<span class='sub_head'>Clean Up</span><br>"+
			"<span class='lbl_opt' id='rmv_class'>Remove all classes</span><br>"+
			"<span class='lbl_opt' id='rmv_jobs'>Remove all Homewrks</span><br>"+
			"<span class='lbl_opt' id='rmv_tst'>Remove all Exams</span><br>"+
			"<span class='lbl_opt' id='rmv_comp'>Remove Completed classes</span>'"+
		"</div>"+
		"<div id= 'about'>"+
			"<span class='sub_head'>About us</span><br>"+
			"<span class='lbl_opt'>Yooooooooooooo</span>"+
		"</div>"
		);
	}
    if(page_num==3){
        $("#body").html($("#body").html()+ "<div id = 'sett_tabs'></div><div id='settings'>Change Theme</div>");
        $("#sett_tabs").html("<div id = 'study'>Study</div>"
                            +"<div id = 'colors'>Colors</div>"
                            +"<div id = 'bckup'>Import/Export</div>");
        $("#colors").addClass("active");
        $("#settings").css("min-width",($(document).width()*0.9)+"px");
        $("#settings").html("<div id ='basic_theme'>");
        $("#settings").html($("#settings").html() + "Basic : <br> <div id='colorPick' >"+
        "Pick a color : <br> <input type='color' id='theme_color' value='"+curr_theme.toString()+"'></div></div>");
        $("#settings").html($("#settings").html() + 
        "<div id='given_theme'><br>or Choose something of our's <br>"+
		"<span id='black'>Black</span>"+
        "<span id='red'>Red</span>"+
		"<span id='blue'>Blue</span>"+
		"</div>");
        $("#settings").html($("#settings").html() + 
        "<div id='adnc_theme'> <button type='button' id='theme_apply'>Apply</button>"
        );  
        $("#settings").html($("#settings").html() + 
            "Upload image!!</div>"
        );   
		$('#theme_color').on('input', function() {
			$("#theme_apply").click();			//function not event
			
		});		
    }
    if(page_num==4){
        $("#body").html($("#body").html()+ "<div id = 'sett_tabs'></div><div id='settings'>"+
		"<span id='exp_text'>import/Export</span></div>");
        $("#sett_tabs").html("<div id = 'study'>Study</div>"
                            +"<div id = 'colors'>Colors</div>"
                            +"<div id = 'bckup'>Import/Export</div>");
        $("#bckup").addClass("active");
        $("#settings").css("min-width",($(document).width()*0.9)+"px");
		$("#settings").html($("#settings").html() +
			"<br><br><div id='export_test' >Export to pdf</div>"+
			"<div id='import_test' >IMPORT</div><div id='disp_can'></div>"
		);
	} 
	if(page_num==5){
		rsrAll();
		$("#body").html($("#body").html()+"<div id='bTT'></div>");
	
		var _htmlSemsters="<form id='myForm'>";
		if(AllTrimsters!==null){
			for(var i=0; i < AllTrimsters.length;i++){
			_htmlSemsters+="<label class = 'mster_lbl' onmouseover='mster_click(this);' for='sem_menu_"+AllTrimsters[i].id+"' >"+AllTrimsters[i].name+"</label>"
			_htmlSemsters+="<input type='radio' name='mster' value='"+i+"' class ='mster' id='sem_menu_"+AllTrimsters[i].id+"' ><br>";
			}
		}
		_htmlSemsters+="<label class = 'mster_lbl' for='plus_sem' >+</label>"
		_htmlSemsters+="<input type='radio' name='mster' class='mster' id='plus_sem'>";
		_htmlSemsters+= "</form>";
		$("#bTT").html($("#bTT").html()+ 
		"<div id='Semeters'>"+
			"<div id='sem_body'>"+_htmlSemsters+"</div>"+
		"</div>"+
		"<div id='Courses'>"+
			"<div id='crs_body'></div></div>"+
		"</div>"+
		"<div id='Lessons'>"+
			"<div id='lesson_body'></div>"+
		"</div>"
		);
			
		$("#bTT").html($("#bTT").html()+
		"<div id= 'new_sem'>"+
			"<label  for='sem_name'>Name : </label>"+
			"<input type='text' id='sem_name'><br>"+
			
			"<label  for='sem_sdate'>Start date : </label>"+
			"<input type='date' id='sem_sdate'><br>"+
			
			"<label   for='sem_edate'>End date : </label>"+
			"<input type='date' id='sem_edate'><br>"+
			
			"<button id='add_sem' >ADD_SEMSETER</button>"+
		"</div>"+
		
		"<div id= 'new_crs'>"+
			"<br><br><label for='crs_name'>Name : </label>"+
			"<input type='text' id='crs_name'><br>"+
			
			"What days ?! : "+
			"<div id = 'crs_days'>"+
			"<label for='crs_sunday'>Sunday</label>"+
			"<input type='checkbox' id='crs_sunday'>"+
			
			"<label for='crs_monday'>Monday</label>"+
			"<input type='checkbox' id='crs_monday'>"+
			
			"<label for='crs_tuesday'>Tuesday</label>"+
			"<input type='checkbox' id='crs_tuesday'>"+
			
			"<label for='crs_wednesday'>Wednesday</label>"+
			"<input type='checkbox' id='crs_wednesday'>"+
			
			"<label for='crs_thursday'>Thursday</label>"+
			"<input type='checkbox' id='crs_thursday'>"+
			
			"<label for='crs_friday'>Friday</label>"+
			"<input type='checkbox' id='crs_friday'>"+
			
			"<label for='crs_saturday'>Saturday</label>"+
			"<input type='checkbox' id='crs_saturday'></div><br>"+
			
			"<label  for='crs_sdate'>Start date : </label>"+
			"<input type='date' id='crs_sdate'><br>"+
			
			"<label   for='crs_edate'>End date : </label>"+
			"<input type='date' id='crs_edate'><br>"+
			
			"<label   for='crs_tchr'>Teacher : </label>"+
			"<select id = 'crs_tchr'>"+
				"<option value='volvo'>Volvo</option>"+
				"<option value='saab'>Saab</option>"+
			"</select><br>"+
			
			"<button id='add_crs' >ADD_Lesson</button>"+
		"</div>"
		);
		
		$("#sem_sdate").val(moment().format("YYYY-MM-DD"));
		$("#sem_edate").val(moment().add(3, 'month').format("YYYY-MM-DD"));
		if(AllTrimsters!==null && AllTrimsters.length-1 >=0){
			$("#crs_sdate").val(AllTrimsters[AllTrimsters.length-1].sDate);
			$("#crs_edate").val(AllTrimsters[AllTrimsters.length-1].eDate);
		}
		
		
		
		/*$("#crs_inSem").prop('checked',true);
		$(".in_lbl_5").css("display","none");
		$("#crs_sdate").css("display","none");
		$("#crs_edate").css("display","none");*/
		
	}
	$("#plus_sem").click(function() {
        $("#new_sem").css("display","block");
		$("#Courses").css("display","none");
    });
	$("#list_view").click(function() {
        page_number=1;
		build_page_by_theme(curr_theme,page_number);
    });
    $("#theme_apply").click(function() {
        curr_theme = $("#theme_color").val();
		var tiny = tinycolor(curr_theme);
        $("#menu").css("background-color",curr_theme);
		$("#body").css("background-color",curr_theme);
        $(".fc-event").css("background-color",curr_theme);
		if(tiny.getBrightness() >100){
			$("#menu").css("color","black");
		}else{
			$("#menu").css("color","white");		
		}
		localStorage.setItem("current-theme",curr_theme);
    });
	$("#add_crs").click(function() {
		var _days = [0,0,0,0,0,0,0];
		if($("#crs_sunday").prop("checked")==true){
			_days[0]=1;
		}
		if($("#crs_monday").prop("checked")==true){
			_days[1]=1;
		}
		if($("#crs_tuesday").prop("checked")==true){
			_days[2]=1;
		}
		if($("#crs_wednesday").prop("checked")==true){
			_days[3]=1;
		}
		if($("#crs_thursday").prop("checked")==true){
			_days[4]=1;
		}
		if($("#crs_friday").prop("checked")==true){
			_days[5]=1;
		}
		if($("#crs_saturday").prop("checked")==true){
			_days[6]=1;
		}
		
		var crs_tmp = Course($("#crs_name").val(),
							$("#crs_sdate").val() ,
							$("#crs_edate").val() ,
							_days,$("#crs_tchr").val()
							);
		AllTrimsters[$("input[name='mster']:checked","#myForm").val()].courses.push(crs_tmp);
		AllJobs.push(crs_tmp);
		bckAll();
		page_number = 0;
        build_page_by_theme(curr_theme,page_number);
		addCalanderEvent(crs_tmp.sDate, crs_tmp.eDate, crs_tmp.name, curr_theme);
		page_number = 5;
        build_page_by_theme(curr_theme,page_number);
	}); 
	$("#add_sem").click(function() {
		var _sDate = $("#sem_sdate").val();
		var _eDate = $("#sem_edate").val();
		var _name =  $("#sem_name").val();
		AllTrimsters.push( Semester(_sDate,_eDate,_name,AllTrimsters.length) );
		bckAll();
		page_number = 5;
        build_page_by_theme(curr_theme,page_number);
    }); 
    $("#export_test").click(function() {
		localStorage.clear();
    });    
    $("#import_test").click(function() {
		
    });
    $("#menu_overlay").click(function() {
        $("#menu_overlay").css("display", "none");
        $("#menu").css("display", "none");
    });
    $("#menu_b").click(function() {
        menu_obj.render();
    });
	$("#buildTT").click(function() {
        page_number = 5;
        build_page_by_theme(curr_theme,page_number);		
	});
    $("#study").click(function() {
        page_number = 2;
        build_page_by_theme(curr_theme,page_number);
        $("#study").addClass("active");
        $("#colors").removeClass("active");
        $("#bckup").removeClass("active");
    });
    $("#colors").click(function() {
        page_number = 3;
        build_page_by_theme(curr_theme,page_number);
        $("#colors").addClass("active");
        $("#study").removeClass("active");
        $("#bckup").removeClass("active");
    });
    $("#bckup").click(function() {
        page_number = 4;
        build_page_by_theme(curr_theme,page_number);
        $("#bckup").addClass("active");
        $("#colors").removeClass("active");
        $("#study").removeClass("active");
        
    });
    $("#add_task").click(function() {//sould be inside settings!
        $("#menu_overlay").css("display", "none");
        $("#menu").css("display", "none");
        addNew.render(moment());
    });  
    $("#sett_b").click(function() {    //goto Settings
        page_number = 2;
        build_page_by_theme(curr_theme,page_number);
    });
    $("#cal_view").click(function() {    //goto Calendar view
        page_number = 0;
        build_page_by_theme(curr_theme,page_number);
    });
	$("#menu").css("background-color",curr_theme);
	$("#body").css("background-color",curr_theme);
}
function addCalanderEvent(start, end, title, colour){
	var tiny = tinycolor(colour);
	var wColor; // 1 = the color is dark,need white writing
	if(tiny.getBrightness() >100){
		wColor="#000000";
		console.log("black");
	}else{
		wColor="#ffffff";	
	} 
	var obj = new Object();
	obj.title= title;
	obj.start= start;
	obj.end= end;
	obj.textColor= wColor;
	obj.backgroundColor= colour;
	localStorage.removeItem(obj.title);
		$('#calendar').fullCalendar('removeEvents',function(rmv){
			if (rmv.title == obj.title){
				return true;
			}
			return false;
		});

	$('#calendar').fullCalendar('renderEvent', obj, true);
	localStorage.setItem(obj.title, JSON.stringify(obj));
    return obj;
}
function bckAll (){
	localStorage.setItem("current-theme",curr_theme);
	localStorage.setItem("AllCourses", JSON.stringify(AllCourses));
	localStorage.setItem("AllTests", JSON.stringify(AllTests));
	localStorage.setItem("AllTrimsters", JSON.stringify(AllTrimsters));
	localStorage.setItem("AllJobs", JSON.stringify(AllJobs));
	localStorage.setItem("OtherEvents", JSON.stringify(OtherEvents));
}
function rsrAll (){
	curr_theme = localStorage.getItem("current-theme");
	AllCourses = JSON.parse (localStorage.getItem("AllCourses"));
	AllTests = JSON.parse (localStorage.getItem("AllTests"));
	AllTrimsters = JSON.parse (localStorage.getItem("AllTrimsters"));
	AllJobs = JSON.parse (localStorage.getItem("AllJobs"));
	OtherEvents = JSON.parse (localStorage.getItem("OtherEvents"));
	if(curr_theme==null )curr_theme="#f2f2f2"; 
	if(AllCourses==null )AllCourses=[]; 
	if(AllTests==null )AllTests=[]; 
	if(AllTrimsters==null )AllTrimsters=[]; 
	if(AllJobs==null )AllJobs=[]; 
	if(OtherEvents==null )OtherEvents=[]; 
}