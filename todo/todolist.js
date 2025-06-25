let arr=[];
rendertodo();

document.querySelector('.add-button').addEventListener('click',() =>{
    addValue();
})
function addValue(){
    let name=document.querySelector('.js-box').value;
    let dueDate=document.querySelector('.js-date-box').value;
    arr.push({
       // name:name,
      //  dueDate:dueDate
      //ShortHand Property
        name,
        dueDate
    });
    rendertodo();
}
function rendertodo(){
    let todoHtml='';
    for(let i=0;i<arr.length;i++){
        let todoObject=arr[i];
        //let name=todoObject.name;
       // let dueDate=todoObject.dueDate;
       // Destructuring
        let{name,dueDate}=todoObject;
        let html=`
        <div>
          ${name}
        </div>
        <div>
         ${dueDate}
        </div>
        <button class="delete-button">Delete</button>`;
        todoHtml += html;
    }
    
    document.querySelector('.js-result').innerHTML=todoHtml;

    document.querySelectorAll('.delete-button').forEach((deleteButton,index) =>{
        deleteButton.addEventListener('click',() =>{
          arr.splice(index,1);
          rendertodo();
        });
    
    });
}