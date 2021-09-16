import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'waiting'
})
export class WaitingPipe implements PipeTransform {

  transform(start:any ){
   var startdate =new Date(start)

 var end = new Date().toISOString();
 var enddate = new Date(end)
 console.log(startdate,enddate);
  var diff =enddate.getTime()- startdate.getTime();
  console.log(startdate,enddate,diff);
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);;

    return (minutes<=59 ? minutes + " Mins" :(hours <= 9 ? "0" : "") + hours + (hours <= 9 ? ":" : "hr") + (minutes <= 9 ? "0" : "") + minutes+" Mins") ;
  }
}
