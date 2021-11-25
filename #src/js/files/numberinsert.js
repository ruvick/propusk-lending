document.addEventListener("DOMContentLoaded", () => {
    let gnelement = document.querySelectorAll(".input_gz")

    gnelement.forEach(element => {
        element.addEventListener('keyup', () => {
            let classname = element.dataset.gzinput
            if (element.value.length == 6) 
                document.getElementById(classname).focus()
        })
        
        element.addEventListener('paste', (event) => { 
            console.log("past");
            console.log(event.value);
            
        });
    });

});