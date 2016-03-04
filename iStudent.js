
function Semester(_sDate, _eDate,_name,_id) {
    var that= {};

	that.id=_id;
	that.name=_name;
    that.sDate= _sDate;
    that.eDate= _eDate;
	that.courses=[];
    return that;
}
function Course(_name,_sDate, _eDate) {
    var that= {};
	
	that.name = _name;
    that.sDate= _sDate;
    that.eDate= _eDate;
	that.lessons=[];
    return that;
}
function Lesson(_type,_sHour,_eHour,_loc, _dayArray,_teacher){
	var that={};
	
	that.sHour =_sHour;
	that.eHour =_eHour;
	that.type=_type; //LECTURE , LAB, PRACTICE,COMPLITION
	that.loc =_loc;
	that.teacher=_teacher;
	that.dayArray= _dayArray;
	
	that.jobs=[];
	that.addJob=function (_job){
		that.jobs.push(_jobs);
	}
	return that;
}
function Teacher(_name){
	var that={};
	
	that.name=_name; 
	that.email;
	that.phoneNum;
	
	return that;
}
function Job( _sDate, _eDate,_type,_course,_priorty) {
    var that= {};
	
	that.type = _type;
    that.sDate= _sDate;
    that.eDate= _eDate;
	that.completed=false;
	that.course= _course;
	that.priorty= _priorty;
	that.files=[];
	that.files=function addFile (_job){
		that.jobs.push(_jobs);
	}
    return that;
}
function Test( _sDate, _eDate,_course,_type,_loc) {
    var that= {};

	that.type = _type;//MOED , final/mid-term
    that.sDate= _sDate;
    that.eDate= _eDate;
	that.completed=false;
	that.course= _course;
	that.loc=_loc;
    return that;
}