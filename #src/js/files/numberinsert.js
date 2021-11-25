document.addEventListener("DOMContentLoaded", () => {
    let gnelement = document.querySelectorAll(".input_gz")

    gnelement.forEach(element => {
        element.addEventListener('keyup', () => {
            let classname = element.dataset.gzinput
            if (element.value.length == 6) 
                document.getElementById(classname).focus()
        })
        
        element.addEventListener('paste', (event) => { 
            event.preventDefault()
            let pasted_str = event.clipboardData.getData('Text');
            let part1 = pasted_str.substr(0,6)
            let part2 = pasted_str.substr(6,4)

            console.log(part1); 
            console.log(part2);
         
            element.value = part1
            // event.clipboardData.setData('Text',part1)
            document.getElementById(element.dataset.gzinput).value = part2

        });
    });

});