let languages;
fetch('./data.json')
.then(function(response){
    return response.json()
})
.then(function(data){
     createDesign(data)
});

let searchbar=document.getElementById("searchbar");
let array=[];
let details;
let removelement;
let renders=document.getElementById("render");
let container=document.getElementById("container");

//create the full page//
function createDesign(datas){
    details=datas; 
    searchbar.style.display="none";
   for(let i=0; i<datas.length; i++){
    //create an 10 boxes//
    let smalldiv=document.createElement("div");
    container.appendChild(smalldiv);
    smalldiv.setAttribute("id","div"+[i]);
    smalldiv.setAttribute("class","dives");
    //create avator//
    let avator=document.createElement("img");
    smalldiv.appendChild(avator);
    avator.src=(datas[i].logo)
    // avator.setAttribute("class","avator");
    //create 2nd div//
    let firstdiv=document.createElement("div");
    smalldiv.appendChild(firstdiv).className="firstdiv";
    //first line//
    let firstline=document.createElement("div");
    firstdiv.appendChild(firstline).className="firstline";
    //firstline ptag//
    let company=document.createElement("p");
    firstline.appendChild(company).className="company";
    company.innerText=(datas[i].company);
    //create div in new//
    let newbox=document.createElement("div");
    firstline.appendChild(newbox).className="newbox";
    if(datas[i].new==true){
        newbox.style.backgroundColor="#5CA5A5";
        newbox.innerHTML="New!"
    }
    //create div in feature//
    let feature=document.createElement("div");
    firstline.appendChild(feature).id="feature";
    if(datas[i].featured==true){
        feature.style.backgroundColor="#000000";
        feature.innerHTML="Featured";
    }
    //create second line//
    let secondline=document.createElement("h6");
    firstdiv.appendChild(secondline).className="secondline";
    secondline.innerText=datas[i].position;
    //create third line//
    let thirdline=document.createElement("div");
    firstdiv.appendChild(thirdline).className="thirdline";
    thirdline.innerText=datas[i].postedAt+" "+ datas[i].contract+" "+datas[i].location;
    thirdline.style.wordSpacing="40px";
    //create third box//
    let thirdbox=document.createElement("div");
    smalldiv.appendChild(thirdbox).className="thirdbox";
    
    for(let j=0; j<(datas[i].languages).length; j++){
        languages=document.createElement("div");
        thirdbox.appendChild(languages).id="languages";
        languages.classList.add("names");
        languages.innerText=datas[i].languages[j];
        languages.setAttribute("onclick","getdetails(this.innerText)") 
    }
    }  
}

//onclick function from click the languages//
function getdetails(jobs){ 
    console.log(jobs)
     searchbar.style.display="block";
     if(jobs!=""){
     if(!array.includes(jobs)){
            array.push(jobs);
            renders.innerHTML+=`<div id="main"><div class="names" id="boxes">${jobs}</div>
         <button class="btn" onclick="hides(this)">X</button ></div>`;
        }
     }
     else{
        container.innerHTML="";
        createDesign(details);
        searchbar.style.display="block";  
     }  
    for(let k=0; k<10; k++){
        console.log(array)
        if(!array.every(r => (details[k].languages).includes(r))){
           let hideelement=document.getElementById("div"+[k]);
           hideelement.style.display="none";
        }
    }    
}

//The function is click the text in clear//
function clearArray(){
    renders.innerHTML="";
    array=[];
    let main=document.getElementById("searchbar")
    main.style.display="none";
    container.innerHTML="";
    createDesign(details);   
}

//The function is click the X button//
function hides(ele){
    removelement=ele.parentNode.firstChild.innerText;
    ele.parentNode.style.display='none';
    removelement=ele.parentNode.firstChild.innerText;
    array = array.filter(item => item !== removelement);
     getdetails("");
}
