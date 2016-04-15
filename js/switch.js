window.onload=init;
function init(){
	select_list();
	switch_year_month();
	switch_year_current();
	switch_month_current();
	drawCld(tY,tM);
	back_tody();
	cal_table_click();
}
//下拉菜单设置，以及定义下拉框初始值
function select_list(){
	var year_current=document.getElementsByClassName('switch_year_current')[0];
	var month_current=document.getElementsByClassName('switch_month_current')[0];
	year_current.innerHTML=tY+'年';
	month_current.innerHTML=oldMonth[tM]+'月';
	var year_list=document.getElementsByClassName('year_list')[0];
	for (var i = 1900; i < 2050; i++) {//动态创建标记
	 	year_list.innerHTML +='<li class="year_list1">'+i+'年'+'</li>';
	}
}
//年月点击下拉框出现事件
function switch_year_month(){
	var year_botton=document.getElementsByClassName('switch_year')[0];
	var month_botton=document.getElementsByClassName('switch_month')[0];
	var year_list=document.getElementsByClassName('year_list')[0];
	var month_list=document.getElementsByClassName('month_list')[0];
	var year_list1=document.getElementsByClassName('year_list1');

	year_botton.onclick=year_list.onmouseover=function(){
		year_list.style.display='block';
		for(var i=0;i<year_list1.length;i++){
			if(year_list1[i].innerHTML=="2016年"){
				if(year_list1[i-5])
					year_list1[i-5].scrollIntoView();
				else
					year_list1[i].scrollIntoView();
			}
		}
	}
	year_list.onmouseover=function(){
		year_list.style.display='block';
	}
	month_botton.onclick=month_list.onmouseover=function(){
		month_list.style.display='block';
	}
	//当鼠标离开下拉框范围菜单收起来事件
	year_list.onmouseout=function(){
		year_list.style.display='none';
	}
	month_list.onmouseout=function(){
		month_list.style.display='none';
	}
}
//年份选中点击选中事件
function switch_year_current(){	
	var year_list=document.getElementsByClassName('year_list')[0];
	var year_current=document.getElementsByClassName('switch_year_current')[0];
	var month_current=document.getElementsByClassName('switch_month_current')[0];
	var year_list1=document.getElementsByClassName('year_list1');
	for(var i=0;i<year_list1.length;i++){
		year_list1[i].onclick=function(){
			year_current.innerHTML=this.innerHTML;
			for (var i = 1900; i < 2050; i++){
		    	if(year_current.innerHTML==(i+'年'))
		    		{year=i;break;}
    		}
    		for(var j=0;j<12;j++){
		    	if(month_current.innerHTML==(oldMonth[j]+'月'))
		    		{month=j;break;}
	    	}
	    	drawCld(year,month);
		}                                                                              
	}
}
//月份点击选中并切换日历表格事件
function switch_month_current(){	
	var month_current=document.getElementsByClassName('switch_month_current')[0];
	var year_current=document.getElementsByClassName('switch_year_current')[0];
	var month_list1=document.getElementsByClassName('month_list1');
	for(var i=0;i<month_list1.length;i++){
		month_list1[i].onclick=function(){
			month_current.innerHTML=this.innerHTML;
			for (var i = 1900; i < 2050; i++){
		    	if(year_current.innerHTML==(i+'年'))
		    		{year=i;break;}
    		}
    		for(var j=0;j<12;j++){
		    	if(month_current.innerHTML==(oldMonth[j]+'月'))
		    		{month=j;break;}
	    	}
	    	drawCld(year,month);
		}                                                                                
	}
}
//点击返回今天事件
function back_tody(){
	var year_current=document.getElementsByClassName('switch_year_current')[0];
	var month_current=document.getElementsByClassName('switch_month_current')[0];

	var switch_today=document.getElementsByClassName("switch_today")[0];
	switch_today.onclick=function(){
		drawCld(tY,tM);
		year_current.innerHTML=tY+'年';
		month_current.innerHTML=oldMonth[tM]+'月';

	}
}
//表格点击选中并替换顶部事件
function cal_table_click(){
	var table=document.getElementsByTagName('table')[0];
	table.onclick=function(e){
		e=e||window.event;
		var src=e.target||e.srcElement;
		while(src.tagName !='TD'  &&  src.tagName !='TABLE'){
			src=src.parentNode;
		}
		if(src.tagName=='TD')
		{
			var switch_day=document.getElementsByClassName('switch_day')[0];
			var new_day_day=document.getElementsByClassName('new_day_day')[0];
			var new_day_week=document.getElementsByClassName('new_day_week')[0];
			var switch_old_day=document.getElementsByClassName('switch_old_day')[0];

			var cal_new_day=src.getElementsByClassName('cal_new_day')[0];
			var cal_old_day=src.getElementsByClassName('cal_old_day')[0];
			var cal_table_div=src.getElementsByTagName('div')[0];
			if(cal_new_day.innerHTML !='' && cal_new_day.innerHTML !=tD){
				var selected_day=document.getElementsByClassName('selected');
				if(!selected_day)  
					return 0;
				for(var i=0;i<selected_day.length;i++)
					selected_day[i].className=selected_day[i].className.replace('selected','');
				cal_table_div.className +=' '+'selected';
				if(cal_new_day.innerHTML>9){
					switch_day.innerHTML=cal_new_day.innerHTML;
					new_day_day.innerHTML=cal_new_day.innerHTML;
				}
				else{
					switch_day.innerHTML='0'+cal_new_day.innerHTML;
					new_day_day.innerHTML='0'+cal_new_day.innerHTML;
				}
				if(cal_old_day.getElementsByTagName('font')[0]){
					switch_old_day.innerHTML=cal_old_day.getElementsByTagName('font')[0].innerHTML;
				}
				else if(cal_old_day.getElementsByTagName('b')[0])
				{
					switch_old_day.innerHTML='初一';
				}
				else{
					switch_old_day.innerHTML=cal_old_day.innerHTML;
				}
				var tds=document.getElementsByTagName('td');
				var i;
				for(i=0;i<tds.length;i++){
					if(src==tds[i])
						break;
				}
				new_day_week.innerHTML=calWeek[i%7];
			}
		}
		else{
			return 0;
		}
	}
}

//以下200多行：借鉴+理解运用
//年份数组
var lunarInfo=new Array(
						0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
						0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
						0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
						0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
						0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
						0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
						0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
						0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
						0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
						0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
						0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
						0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
						0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
						0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
						0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);
//12个月每个月多少天
var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var oldMonth=new Array('一','二','三','四','五','六','七','八','九','十','十一','十二');
//生肖数组
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
//二十四节气
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨",
                          "立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑",
                          "白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
//节气数字表示
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
//农历个位十位数组
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅');
var calWeek=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
//公历节日
var sFtv = new Array(
					"0101 元旦",
					"0214 情人节",
					"0308 妇女节",
					"0312 植树节",
					"0315 消费者权益日",
					"0401 愚人节",
					"0501 劳动节",
					"0504 青年节",
					"0512 护士节",
					"0601 儿童节",
					"0701 建党节",
					"0801 建军节",
					"0910 教师节",
					"0928 孔子诞辰",
					"1001 国庆节",
					"1006 老人节",
					"1024 联合国日",
					"1224 平安夜",
					"1225 圣诞节");
//农历节日
var lFtv = new Array(
					"0101 春节",
					"0115 元宵节",
					"0505 端午节",
					"0707 七夕",
					"0715 中元节",
					"0815 中秋节",
					"0909 重阳节",
					"1208 腊八节",
					"1224 小年");
//返回农历y年的总天数
function lYearDays(y) {
	var i, sum = 348;
	for(i=0x8000; i>0x8; i>>=1)
		sum+=(lunarInfo[y-1900]&i)?1:0;
	return(sum+leapDays(y));
}
//返回农历y年闰月的天数
function leapDays(y) {
	if(leapMonth(y))  
		return((lunarInfo[y-1900] & 0x10000)? 30: 29);
	else 
		return(0);
}
//判断y年的农历中那个月是闰月,不是闰月返回0
function leapMonth(y){
   return(lunarInfo[y-1900]&0xf);
}
//返回农历y年m月的总天数
function monthDays(y,m){
	return((lunarInfo[y-1900]&(0x10000>>m))?30:29);
}
//算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
function Dianaday(objDate) {
	var i, leap=0, temp=0;
	var baseDate = new Date(1900,0,31);//给定的参数创建一日期对象
	var offset   = (objDate - baseDate)/86400000;
	this.dayCyl = offset+40;
	this.monCyl = 14;
	for(i=1900; i<2050 && offset>0; i++) {
		temp = lYearDays(i)
		offset -= temp;
		this.monCyl += 12;
	}
    if(offset<0) {
		offset += temp;
		i--;
		this.monCyl -= 12;
   }
	this.year = i;
	this.yearCyl=i-1864;
	leap = leapMonth(i); //闰哪个月
	this.isLeap = false;
	for(i=1; i<13 && offset>0; i++) {
        if(leap>0 && i==(leap+1) && this.isLeap==false){	//闰月
          --i; 
          this.isLeap = true; 
          temp = leapDays(this.year);
      	}
        else{
			temp = monthDays(this.year, i);
		}
		if(this.isLeap==true && i==(leap+1)) 
			this.isLeap = false;	//解除闰月
		offset -= temp;
		if(this.isLeap == false) 
			this.monCyl++;
   }
	if(offset==0 && leap>0 && i==leap+1)
		if(this.isLeap){ 
			this.isLeap = false;
		}
		else{
			this.isLeap=true;
			--i;
			--this.monCyl;
		}
		if(offset<0){
			offset+=temp;
			--i;--this.monCyl;
		}
		this.month=i;
		this.day=offset+1;
}
//返回公历y年m+1月的天数
function solarDays(y,m){
	if(m==1)
		return(((y%4==0)&&(y%100!=0)||(y%400==0))?29:28);
	else
		return(solarMonth[m]);
}
//记录公历和农历某天的日期
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap) {
	this.isToday = false;
	//公历
	this.sYear = sYear;
	this.sMonth = sMonth;
	this.sDay = sDay;
	this.week = week;
	//农历
	this.lYear = lYear;
	this.lMonth = lMonth;
	this.lDay = lDay;
	this.isLeap = isLeap;
	//节日记录
	this.lunarFestival = ''; //农历节日
	this.solarFestival = ''; //公历节日
	this.solarTerms = ''; //节气
}
//返回某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
	var offDate = new Date((31556925974.7*(y-1900)+sTermInfo[n]*60000)+Date.UTC(1900,0,6,2,5));
	return(offDate.getUTCDate());
}
//保存y年m+1月的相关信息
var fat=mat=9;
var eve=0;
function calendar(y,m) {
   fat=mat=0;
   var sDObj,lDObj,lY,lM,lD=1,lL,lX=0,tmp1,tmp2;
   var lDPOS = new Array(3);
   var n = 0;
   var firstLM = 0;
   sDObj = new Date(y,m,1);	//当月第一天的日期
   this.length = solarDays(y,m);    //公历当月天数
   this.firstWeek = sDObj.getDay();    //公历当月1日星期几
   if ((m+1)==5){fat=sDObj.getDay()}
   if ((m+1)==6){mat=sDObj.getDay()}
   for(var i=0;i<this.length;i++) {
      if(lD>lX) {
         sDObj = new Date(y,m,i+1);    //当月第一天的日期
         lDObj = new Dianaday(sDObj);     //农历
         lY = lDObj.year;           //农历年
         lM = lDObj.month;          //农历月
         lD = lDObj.day;            //农历日
         lL = lDObj.isLeap;         //农历是否闰月
         lX = lL? leapDays(lY): monthDays(lY,lM); //农历当月最後一天
         if (lM==12){eve=lX}
		 if(n==0) firstLM = lM;
         lDPOS[n++] = i-lD+1;
      }
      this[i] = new calElement(y,m+1,i+1,nStr1[(i+this.firstWeek)%7],lY,lM,lD++,lL);
   }
   //节气
   tmp1=sTerm(y,m*2)-1;
   tmp2=sTerm(y,m*2+1)-1;
   this[tmp1].solarTerms = solarTerm[m*2];
   this[tmp2].solarTerms = solarTerm[m*2+1];
   if(y==tY && m==tM) this[tD-1].isToday = true;	//今日
}
//用中文显示农历的日期
function cDay(d){
    var s;
    switch (d) {
        case 10:
        	s = '初十'; break;
        case 20:
        	s = '二十'; break;
        	break;
      	case 30:
         	s = '三十'; break;
         	break;
      	default :
	        s = nStr2[Math.floor(d/10)];
	        s += nStr1[d%10];
    }
    return(s);
}

//用自定义变量保存当前系统中的年月日
var Today = new Date();
var tY = Today.getFullYear();//当前年
var tM = Today.getMonth();//当前月
var tD = Today.getDate();//当前日

//在表格中显示公历和农历的日期,以及相关节日
var cld;
function drawCld(SY,SM) {
   var i,sD,s;// sD动态记录表格里的每一天日期，s是农历节气
   var currentDay,emptyDay;
   cld = new calendar(SY,SM);
   //获取农历月份、日期class属性
   var switch_old_month=document.getElementsByClassName('switch_old_month')[0];
   var switch_old_day=document.getElementsByClassName('switch_old_day')[0];

   var switch_day=document.getElementsByClassName('switch_day')[0];
   var new_day_year=document.getElementsByClassName('new_day_year')[0];
   var new_day_month=document.getElementsByClassName('new_day_month')[0];
   var new_day_day=document.getElementsByClassName('new_day_day')[0];
   var cal_new_day=document.getElementsByClassName('cal_new_day');
   var cal_old_day=document.getElementsByClassName('cal_old_day');

   var calendar_firstline=document.getElementsByClassName("calendar_firstline");

   var animal_year=document.getElementsByClassName('animal_year')[0];
   var new_day_week=document.getElementsByClassName('new_day_week')[0];
   animal_year.innerHTML = Animals[(SY-4)%12];	//生肖
   new_day_year.innerHTML=SY;
   if(SM<9)
   		new_day_month.innerHTML='0'+(SM+1);
   /*	else if(SM==9)
   		new_day_month.innerHTML=SM+1;*/
   	else
   		new_day_month.innerHTML=SM+1;
   for(i=0;i<42;i++) {
      sObj=cal_new_day[i];
      lObj=cal_old_day[i];
      sD = i - cld.firstWeek;
      if(sD>-1 && sD<cld.length) { //日期内
      	lObj.parentNode.className="calendar_firstline";//将有内容的表格的class属性改回来
         sObj.innerHTML = sD+1;
		 if(cld[sD].isToday){ 
		 	sObj.style.color='#fff';
		 	lObj.style.color='#fff';
			sObj.parentNode.className="current_day";//今日颜色
		 	//将今日显示在顶部日期区域
		 	if(sObj.innerHTML>9)
		 	{
		 		new_day_day.innerHTML=sObj.innerHTML;
		 		switch_day.innerHTML=sObj.innerHTML;
		 	}
		 	else 
		 	{
		 		new_day_day.innerHTML='0'+sObj.innerHTML;
		 		switch_day.innerHTML='0'+sObj.innerHTML;
		 	}
		 	new_day_week.innerHTML=calWeek[i%7];
		 } 
		 else{
		 	sObj.style.color = '';
		 	lObj.style.color='#999';
			sObj.parentNode.className="calendar_firstline";//今日颜色
		 }
         if(cld[sD].lDay==1){ //显示农历月
		   lObj.innerHTML = '<b>'+(cld[sD].isLeap?'闰':'') + oldMonth[cld[sD].lMonth-1] + '月' +'</b>';
		   switch_old_month.innerHTML=(cld[sD].isLeap?'闰':'') + oldMonth[cld[sD].lMonth-1] + '月';//显示在日历表头部
         }
		 else{lObj.innerHTML = cDay(cld[sD].lDay);}	//显示农历日
		var Slfw=Ssfw=null;
		s=cld[sD].solarFestival;
		for (var ipp=0;ipp<lFtv.length;ipp++){	//农历节日
			if (parseInt(lFtv[ipp].substr(0,2))==(cld[sD].lMonth)){
				if (parseInt(lFtv[ipp].substr(2,4))==(cld[sD].lDay)){
					lObj.innerHTML=lFtv[ipp].substr(5);
					Slfw=lFtv[ipp].substr(5);
						if(cld[sD].isToday)
							sObj.parentNode.className="holiday_today";
						else
							sObj.parentNode.className="holiday_day";
				}
			}
			if (12==(cld[sD].lMonth)){	//判断是否为除夕
				if (eve==(cld[sD].lDay)){
					lObj.innerHTML="除夕";Slfw="除夕";
					if(cld[sD].isToday)
							sObj.parentNode.className="holiday_today";
						else
							sObj.parentNode.className="holiday_day";
				}
			}
		}
		for (var ipp=0;ipp<sFtv.length;ipp++){	//公历节日
			if (parseInt(sFtv[ipp].substr(0,2))==(SM+1)){
				if (parseInt(sFtv[ipp].substr(2,4))==(sD+1)){
					lObj.innerHTML=sFtv[ipp].substr(5);
					Ssfw=sFtv[ipp].substr(5);
					if(cld[sD].isToday)
							sObj.parentNode.className="holiday_today";
					else
						sObj.parentNode.className="holiday_day";				
				}
			}
		}
	    if ((SM+1)==5){	//母亲节
			if (fat==0){
				if ((sD+1)==7){
					Ssfw="母亲节";lObj.innerHTML="母亲节";
					if(cld[sD].isToday)
							sObj.parentNode.className="holiday_today";
					else
						sObj.parentNode.className="holiday_day";	
				}
			}
			else if (fat<9){
				if ((sD+1)==((7-fat)+8)){
					Ssfw="母亲节";lObj.innerHTML="母亲节";
					if(cld[sD].isToday)
							sObj.parentNode.className="holiday_today";
					else
						sObj.parentNode.className="holiday_day";	
				}
			}
		}
	    if ((SM+1)==6){	//父亲节
			if (mat==0){
				if ((sD+1)==14){
					Ssfw="父亲节";lObj.innerHTML="父亲节";
					if(cld[sD].isToday)
							sObj.parentNode.className="holiday_today";
					else
						sObj.parentNode.className="holiday_day";	
				}
			}
			else if (mat<9){
				if ((sD+1)==((7-mat)+15)){
					Ssfw="父亲节";lObj.innerHTML="父亲节";
					if(cld[sD].isToday)
							sObj.parentNode.className="holiday_today";
					else
						sObj.parentNode.className="holiday_day";	
				}
			}
		 }
		 if (s.length<=0){	//设置节气的颜色
			s=cld[sD].solarTerms;
            if(s.length>0) s = s.fontcolor('#6bc50d');		
		 }
		 if(s.length>0) {lObj.innerHTML=s;Slfw=s;}	//节气
		 if ((Slfw!=null)&&(Ssfw!=null)){
			lObj.innerHTML=Slfw+"/"+Ssfw;
		 }	
		 //将今日的星期以及农历日期显示在头部
		 if(sObj.innerHTML==tD){
         	new_day_week.innerHTML=calWeek[(i-tD)+1];
         	switch_old_day.innerHTML=lObj.innerHTML;
         	sObj.parentNode.className +=" "+"selected";
         	if(cld[sD].isToday){
         		sObj.parentNode.className="current_day";
         	}
         }
         else{
         	sObj.parentNode.className="calendar_firstline";
         }			
      }
      	else { //非日期
	         sObj.innerHTML = '';
	         lObj.innerHTML = '';
	         lObj.parentNode.className="empty_day";//将没有内容的表格class属性改为空，执行空样式
       } 	
   }
}