/**
 * Created by xray on 2015-10-21.
 */
var day="";
var month="";
var ampm="";
var ampmhour="";
var myweekday="";
var year="";
mydate=new Date();
myweekday=mydate.getDay();
mymonth=mydate.getMonth()+1;
myday= mydate.getDate();
myyear= mydate.getYear();
year=(myyear > 200) ? myyear : 1900 + myyear;
if(myweekday == 0)weekday=" 星期日 ";
else if(myweekday == 1)weekday=" 星期一 ";
else if(myweekday == 2)weekday=" 星期二 ";
else if(myweekday == 3)weekday=" 星期三 ";
else if(myweekday == 4)weekday=" 星期四 ";
else if(myweekday == 5)weekday=" 星期五 ";
else if(myweekday == 6)weekday=" 星期六 ";
switch(myweekday){
    case 1:  weekday=" 星期一 ";break;
    case 2:  weekday=" 星期二 ";break;
    case 3:  weekday=" 星期三 ";break;
    case 4:  weekday=" 星期四 ";break;
    case 5:  weekday=" 星期五 ";break;
    case 6:  weekday=" 星期六 ";break;
    case 0:  weekday=" 星期日 ";break;
}
document.write(year+"年"+mymonth+"月"+myday+"日 "+weekday);
/**
 var myDate = new Date();
 myDate.getYear(); //获取当前年份(2位)
 myDate.getFullYear(); //获取完整的年份(4位,1970-????)
 myDate.getMonth(); //获取当前月份(0-11,0代表1月)
 myDate.getDate(); //获取当前日(1-31)
 myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
 myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
 myDate.getHours(); //获取当前小时数(0-23)
 myDate.getMinutes(); //获取当前分钟数(0-59)
 myDate.getSeconds(); //获取当前秒数(0-59)
 myDate.getMilliseconds(); //获取当前毫秒数(0-999)
 myDate.toLocaleDateString(); //获取当前日期
 var mytime=myDate.toLocaleTimeString(); //获取当前时间
 myDate.toLocaleString( ); //获取日期与时间
 */
document.write("getYear()="+myDate.getYear());

