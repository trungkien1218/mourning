const api_url = 'https://6487093ebeba6297278fbab7.mockapi.io/';

const end_point ={
    flower:'flower'
}



let get_flower ={
    api_url: api_url,
    end_point: end_point.flower,
    method: 'GET',
     async callback(params){
        await render_flower(params)
   
    }
} 
async function render_flower(params) {
    for (let flower of params){
        let {name, price, image, id} = flower;
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
        
        <a href="product-detail.html">
           <div class="image" style="background-image: url(${image});"></div>
           <p class="name">${name}</p>
           <p class="price">${price}</p>
        </a>
    
        `;
        document.querySelector('.sanpham').appendChild(div);
        div.addEventListener('click', function(){
            localStorage.setItem('prd_id', id);

        })
    }
}

 async function fetch_data(params){
    if (!params){
        alert('Không tồn tại request');
        return false;
    }
    let {api_url, end_point, method, callback} = params;
    try{
        let res = await fetch(api_url + end_point, {
            method: method
        });
        
        let data = await res.json();
        await callback(data)
    }
    catch(error) {
        console.log(error)
    }
}
fetch_data(get_flower);



///chi tiết sản phẩm

let get_flower_by_id ={
    api_url: api_url,
    end_point: end_point. flower + 'prd_id' ,
    method: 'GET',
     async callback(params){
        await render_flower_prd(params)
   
    }
} 

let prd_id= '';
if (localStorage.getItem('prd_id')) prd_id = localStorage.getItem('prd_id');


async function render_flower_prd(params) {
    for (let flower of params){
        let {name, price, image, id} = flower;
        let div = document.createElement('div');
        div.classList.add('item-prd');
        div.innerHTML = `
        
        <div class="image-prd">
            ${image}
        </div>
        <div class="product">
            <p class="name-pr">${name}</p>
            <p class="price-pr">${price}</p>

        </div>
 
        
       
    
        `;
        document.querySelector('.grid').appendChild(div);
       
    }
}
fetch_data(get_flower_by_id);


//if( prd_id === '') return false;
/*
//let prd_id= '';
//if (localStorage.getItem('prd_id')) prd_id = localStorage.getItem('prd_id');
//if( prd_id === '') return false;
async function fetch_data_by_id(){
    let res = await fetch('https://6487093ebeba6297278fbab7.mockapi.io/flower' + localStorage.getItem('prd_id));
    let data = await res.json();
    await console.log(data);

}
fetch_data_by_id();
*/
