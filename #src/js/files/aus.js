document.addEventListener("DOMContentLoaded", () => { 
    if (document.getElementById("aus_find") !== null)
    aus_find.onclick = (e) => { 
        // #arrange
        e.preventDefault();
        let gznumber = aus_main_feild.value

        

        let classname = aus_main_feild.dataset.gzinput
        let gznumber_c = document.getElementById(classname).value

        gznumber = gznumber+gznumber_c

        if ((gznumber == "") || (gznumber == "А 000 АА000") || (gznumber == "А 000 АА")) {
            alert("Введите номер авто")
            return
        }

        number_in_win.value = gznumber
        
        console.log(gznumber)


        var xhr = new XMLHttpRequest();
        xhr.onload = function(e) {

            if (xhr.status == 200) {
                let result = JSON.parse(xhr.response)
                
                console.log(result)

                var RezStr = "";
                result.forEach(function(element){
                    let dc = element.deycount;
                    if (( element.sys_status == "Действует") 
                        || ( element.sys_status ==  "Заканчивается завтра") 
                        || ( element.sys_status ==  "Заканчивается сегодня")
                        || ( element.sys_status ==  "Начинается сегодня")
                        || ( element.sys_status ==  "Начинается завтра")
                        ) {
                        RezStr += "<tr class='popup-arrange__table-tbody-tr bg-green'>";
                    } else if (element.status == "Аннулирован") {
                        RezStr += "<tr class='popup-arrange__table-tbody-tr bg-red'>";
                        str = element.cancel_date.split(' ', 2);
                        
                        dc = "Аннулирован " + str[0];
                    } else {
                        RezStr += "<tr class = 'popup-arrange__table-tbody-tr' >";
                    }

                    RezStr += "<td class='popup-arrange__table-tbody-td car_number'>" + element.truck_num + "</td>";
                    RezStr += "<td class='popup-arrange__table-tbody-td element_zone'>"+element.pass_zone+" ("+((element.type_pass==null)?'Дневной':element.type_pass)+")"+"</td>";
                    RezStr += "<td class='popup-arrange__table-tbody-td element_passInfo'>"+element.series+" "+element.pass_number+"</td>";
                    RezStr += "<td class='popup-arrange__table-tbody-td element_dateStart'>"+element.valid_from.substr(0, 10)+"</td>";
                    RezStr += "<td class='popup-arrange__table-tbody-td element_dateEnd'>"+element.valid_to.substr(0, 10)+"</td>";
                    RezStr += "<td class='popup-arrange__table-tbody-td element_number_of_days'>" + dc  + "</td>";
                RezStr += "</tr>";

                })
                
                document.getElementById("aus_info_body").innerHTML = RezStr;
                

                popup_open("arrange");
            } else {
                console.log(xhr.status)
                console.log(xhr.statusText)
                alert(xhr.response)
            }
            
        }
        
        xhr.onerror = function(msg) {
            console.log("eroroa" + xhr.statusText)
        }

        xhr.open('GET', "https://propuska-mkad-ttk-sk.ru/wp-json/lscrm/v2/number_info?number="+gznumber, true);
        xhr.send();

        
    }

})