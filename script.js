var bouton = document.querySelectorAll('.bouton');
var regle = document.querySelector('#regle');
var popup = document.querySelector('.popup');
var perduPop = document.querySelector('.perduPop');

var stop = document.querySelector('.stop');
var croix = document.querySelector('.croix');
var croix2 = document.querySelector('.croix2');
var start = document.querySelector('#start');
var reset = document.querySelector('#reset');

var $do = new Audio('audio/do.wav');
var $re = new Audio('audio/re.wav');
var $mi = new Audio('audio/mi.wav');
var $fa = new Audio('audio/fa.wav');


joueurEssais = [];
ordiEssais= [];
u=0
v=1
cdr = 0




//on test la couleur de la case cliquée et on l'ajoute dans le tableau, (je n'ai pas reussis a le faire avec un switch...)
function testCouleur  (){
        
        if(this.classList.contains("vert") == true){
            changeCouleur(nodeItem = bouton[0]);
            joueurEssais.push(0);  
            $do.play();

        }

        else if (this.classList.contains("rouge") == true){
            joueurEssais.push(1);
            changeCouleur(nodeItem = bouton[1]);
            $re.play();


        }

        else if (this.classList.contains("jaune") == true){
            joueurEssais.push(2);
            changeCouleur(nodeItem = bouton[2]);
            $mi.play();


        }

        else if (this.classList.contains("bleu") == true){
            joueurEssais.push(3);
            changeCouleur(nodeItem = bouton[3]);
            $fa.play();

        }
    
    console.log(joueurEssais)

        verif();
};



function changeCouleur (){
    nodeItem.classList.add("activation");
     setTimeout(() => {
         nodeItem.classList.remove("activation");
     }, 300);
 }



//event du click sur les cases

for(var i = 0;i < bouton.length;i++){
    bouton[i].addEventListener("click", testCouleur)

};




//event du pop up de regle
regle.addEventListener("click", function (){
        popup.classList.remove("hidden");
        stop.classList.add('overlay');
});


croix.addEventListener("click", function (){
        popup.classList.add("hidden");
        stop.classList.remove('overlay')
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



async function couleurRandom (){

    for(var i = 0; i < ordiEssais.length;i++){

        if (ordiEssais[i]== 0){
            changeCouleur(nodeItem = bouton[0]);
            $do.play();
            await sleep (2000 - cdr);
            

        }
        else if (ordiEssais[i]== 1){
            changeCouleur(nodeItem = bouton[1]);
            $re.play();
            await sleep (2000 - cdr);

        }
        else if (ordiEssais[i] == 2){
            changeCouleur(nodeItem = bouton[2]);
            $mi.play();
            await sleep (2000 - cdr);

        }
        else if (ordiEssais[i]== 3){
            changeCouleur(nodeItem = bouton[3]);
            $fa.play();
            await sleep (2000 - cdr);

        }
    }

}



async function ajoutRandom ()  {

    while (u<v){
        var randomChiffre = Math.round(Math.random()*3)
        await sleep (2000 - cdr);
        ordiEssais.push(randomChiffre);
        console.log(ordiEssais);
        u ++;

    }

    couleurRandom();
}

console.log(ordiEssais)



function perdu(){

    perduPop.classList.remove("hidden");
    stop.classList.add('overlay');

    croix2.addEventListener("click", function (){
            perduPop.classList.add("hidden");
            stop.classList.remove('overlay');
            fctReset();
    });
    u=100
}


function fctReset(){
    document.location.reload(true);
}

function verif (){

    var i = 0;
    joueurEssais.forEach(element => {
        if (element !== ordiEssais[i]){
            perdu();

        }
        i++;
    });

    if(joueurEssais.length==ordiEssais.length){
        if(v > 8){
            cdr = 1200
        }
        else{
            cdr = cdr + 150
        }
    newGame();

    }
}
function newGame (){
    v ++;
    joueurEssais=[];
    ajoutRandom();


}

start.addEventListener("click", ajoutRandom);

reset.addEventListener("click", fctReset);







   


