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
        let {name, price, image} = flower;
        let div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
        <div class="product">
        <a href="#">
           <div class="image" style="background-image: url(${image});"></div>
           <p class="name">${name}</p>
           <p class="price">${price}</p>
        </a>
     </div>
        `;
        document.querySelector('.sanpham').appendChild(div);
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