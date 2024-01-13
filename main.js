window.addEventListener("DOMContentLoaded" ,()=>{
    axios.get("https://crudcrud.com/api/4032d8f5bb644cf09d17cab90502f99e/ecommerce")
     .then((response)=>{
      console.log(response)
         for(let i=0;i<response.data.length;i++){
            showData(response.data[i])   
         }
     })
   })
   let fo=document.getElementById("form")
   fo.addEventListener('submit' , (event)=>{
   event.preventDefault();
   let price=document.getElementById("price").value
   let name=document.getElementById("name").value
   let cat=document.getElementById("cat").value

   myobj={
    p: price,
    n: name,
    c:cat
  }
  let currData;
  axios.post("https://crudcrud.com/api/4032d8f5bb644cf09d17cab90502f99e/ecommerce",myobj).then(()=>{
  axios.get("https://crudcrud.com/api/4032d8f5bb644cf09d17cab90502f99e/ecommerce").then((response)=>{
        currData=response.data[response.data.length-1]["_id"]
        myobj._id=currData
  })
  })
  showData(myobj)
   })
   function showData(obj){
    let n=document.createElement("li")
    n.appendChild(document.createTextNode(`Price--Rs.${obj["p"]}_______`))
    n.appendChild(document.createTextNode(`Article Name--${obj["n"]}_______`))

    let u=document.getElementById("lista")
    let v=document.getElementById("listb")
    let w=document.getElementById("listc")
    let btn=document.createElement("button")
    btn.id="delete"
    btn.innerHTML="delete"
    n.appendChild(btn)
    if(obj["c"]=="elec"){
    u.appendChild(n)
    }
    else if(obj["c"]=="food"){
        v.appendChild(n)
    }
    else{
        w.appendChild(n)
    }
    btn.addEventListener('click',()=>{
        n.remove();
        let idd=(obj["_id"])
        console.log(idd)
        axios.delete(`https://crudcrud.com/api/4032d8f5bb644cf09d17cab90502f99e/ecommerce/${obj["_id"]}`).then(()=>{}).catch(()=>{alert("Something went wront erroe 404")})
      })

   }