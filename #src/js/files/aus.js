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

        console.log(gznumber)


        var xhr = new XMLHttpRequest();
        xhr.onload = function(e) {

            if (xhr.status == 200) {
                let result = JSON.parse(xhr.response)
                
                console.log(result)
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