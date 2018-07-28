$(function (){
    getData();
});
var arr=[];
function getData(){
    $.ajax({
        type:"GET",
        beforeSend: function(request){
            request.setRequestHeader("x-api-key", "GdgwUaoKRYaglp7SyO4WFGdp1SnOQdX3fuID0hj6");
        },
        url: "https://e58fw3pq9b.execute-api.us-east-1.amazonaws.com/dev/codexpress_data?type=data",
        success: function(result){
            let x = result.data;
            var time=[];
            var soil_Temp=[];
            var soil_Moist=[];
            var Temp=[];
            var Humidity=[];
            var input_Current=[];
            var input_Voltage=[];
            var Rssi=[];
            var Switch=[];
            for(let i = 0; i < x.length; i++) {
                var obj = x[i];
                /*if(obj.time!=null){
                    let d=new Date();
                    if(i!=0 && time[i-1]==d.getHours())
                        time[i]= ((d.getHours()).toString() + ":30");
                    else 
                        time[i]=((d.getHours()).toString());
                }
                else{
                    time[i]=gettime(obj.time);
                }*/
                if (obj.soil_temp == null)
                	soil_Temp[i]=0;
                else
                	soil_Temp[i]=parseFloat(obj.soil_temp);
                if (obj.soil_moist == null)
                    soil_Moist[i]=0;
                else
                    soil_Moist[i]=parseFloat(obj.soil_moist);
                if (obj.temp == null)
                    Temp[i]=0;
                else
                    Temp[i]=parseFloat(obj.temp);
                if (obj.humidity == null)
                   Humidity[i]=0;
                else
                   Humidity[i]=parseFloat(obj.humidity);
                if (obj.input_current == null)
                   input_Current[i]=0;
                else
                   input_Current[i]=parseFloat(obj.input_current);
                if (obj.input_voltage == null)
                   input_Voltage[i]=0;
                else
                   input_Voltage[i]=parseFloat(obj.input_voltage);
                if (obj.rssi == null)
                   Rssi[i]=0;
                else
                   Rssi[i]=parseFloat(obj.rssi);
                if (obj.switch == null)
                   Switch[i]=0;
                else
                   Switch[i]=parseFloat(obj.switch);
            }
            for(let i=0;i<x.length;i++){
                let temp=[];
                //temp.push(time[i]);
                temp.push(soil_Temp[i]);
                temp.push(soil_Moist[i]);
                temp.push(Temp[i]);
                temp.push(Humidity[i]);
                temp.push(input_Current[i]);
                temp.push(input_Voltage[i]);
                temp.push(Rssi[i]);
                temp.push(Switch[i]);
                arr.push(temp);
            }
            //console.log(arr);
            google.charts.load('current', {'packages':['line']});
            google.charts.setOnLoadCallback(drawChart);
        }
    });
}



function drawChart() {
    var data = new google.visualization.DataTable(arr);
    //data.addColumn('number', 'Time');
    data.addColumn('number', 'Soil Temperature');
    data.addColumn('number', 'Soil Moisture');
    data.addColumn('number', 'Air Temperature');
    data.addColumn('number', 'Air Humidity');
    data.addColumn('number', 'Input Current');
    data.addColumn('number', 'Input Voltage');
    data.addColumn('number', 'RSSI');
    data.addColumn('number', 'Switch');

    data.addRows(arr);

    var options = {
        hAxis: {
            viewWindow: {
                min: 0,
                max: 23
            },
        },
        chart: {
            title: 'Prototype 1',
            subtitle: 'Dated: '
        },
        width: 900,
        height: 500
    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));
    chart.draw(data, google.charts.Line.convertOptions(options));
}

function gettime(UTC_time){
    let start=UTC_time.indexOf("T");
    let time=UTC_time.substr(start+1,start+6);
    return time;
}