function generate(){
    let input = document.getElementById('input-regex').value;
    const singlePattern = /[a-zA-Z0-9]/;
    const multiPattern = /[^a-zA-Z0-9 | ^\|]/;
    const specialPattern = /\|/;
    let example = "";
    for(let j=1;j<=5;j++){
        for(let i=0;i<input.length;i++){
            if(input[i].search(singlePattern) == -1 && specialPattern.exec(input[i]) != null && (i+1) == input.length){
                break;
            }else if(input[i].search(singlePattern) != -1 && (i+1) == input.length && input[i-1] != '|'){
                example += input[i];
                break;
            }else if((i+1) == input.length && input[i-1] == '|'){
                break;
            }
            if(input[i].search(singlePattern) != -1 && input[i+1].search(multiPattern) < 0 && input[i+1].search(specialPattern) < 0 && input[i-1] != '|'){
                example += input[i];
            }else if(input[i].search(multiPattern) >= 0){
                switch(multiPattern.exec(input[i]).toString()){
                    case '+' : 
                        for(let x=0;x< (1+Math.round(Math.random() * 5));x++){
                            example += input[i-1];
                        }
                        break;
                    case '*' :
                        for(let x=0;x< Math.round(Math.random() * 5);x++){
                            example += input[i-1];
                        }
                        break;
                    case '?' :
                        for(let x=0;x< Math.round(Math.random());x++){
                            example += input[i-1];
                        }
                        break;         
                }
            }
            else if(specialPattern.exec(input[i]) != null){
                if(specialPattern.exec(input[i]).toString() == "|"){
                    let temp = Math.round(Math.random());
                    if(temp == 1){
                        example += input[i-1];
                    }else{
                        example += input[i+1];
                    }
                }
            }
        }
        if(example == ""){
            example += "null";
        }
        document.getElementById('example'+j).innerHTML = example;
        example = "";
    }
}

