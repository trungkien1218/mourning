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
    
    params.map(function(flower, index){
        
        let {name, price, image, id} = flower;
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
        
        <a href="product-detail.html">
           <div class="image" style="background-image: url(${image});"></div>
           <p class="name">${name}</p>
           
        </a>
        <p class="price">${price.toLocaleString('vi-VN')} VND</p>
    
        `; 
        if(index <8){
            if( document.querySelector('.home-page ')){
            document.querySelector('.home-page .sanpham').appendChild(div);
        }}
        
        if( document.querySelector('.product-page ')){
            document.querySelector('.product-page .prd-page').appendChild(div);
        }
      
        div.addEventListener('click', function(){
            localStorage.setItem('prd_id', id);
          })
    })
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


let prd_id= '';
if (localStorage.getItem('prd_id')) prd_id = localStorage.getItem('prd_id');

let get_flower_by_id ={
    api_url: api_url,
    end_point: end_point. flower +'/'+ localStorage.getItem('prd_id'),
    method: 'GET',
     async callback(params){
        await render_flower_prd(params)
   
    }
} 




async function render_flower_prd(params) {
    
        let {name, price, image} = params;

        let div = document.createElement('div');
        div.classList.add('item-prd');
        div.innerHTML = `
        
        
        

        <div class="prd-img" style="background-image:url(${image})"></div>
            <div class="prd-name-price">
                <div class="prd-name">${name}</div>
                <div class="prd-price">${price.toLocaleString('vi-VN')} VND</div>
                
                <p style="margin-right:20px; padding-bottom: 20px;"> Số lượng:</p>
                
                <button class="tru" style="margin-right:20px;"><i class="fa-solid fa-minus"></i></i></button>
                <span style="margin-right:20px; font-size: 30px">1</span>
                <button class="cong"><i class="fa-solid fa-plus"></i></button>
                <div><a href="cart.html"><button class="buy">Mua hàng</button></a></div>

            </div>

        
        

        `;
        if( document.querySelector('.product-detail ')){
            document.querySelector('.product-detail .container').appendChild(div);

        };







        // nút thêm giảm số lượng giở hàng
        let number= 1;
        let span = document.querySelector('span');
        
        
        let truBtn = document.querySelector('.tru');
        truBtn.addEventListener('click', function(){
            number = number - 1;
            span.innerHTML = number;
        
        });
        
        let congBtn = document.querySelector('.cong');
        congBtn.addEventListener('click', function(){
            number = number + 1;
            span.innerHTML = number;
        
        });
        
        /// lưu vào localstorage
        div.addEventListener('click', function(){
            localStorage.setItem('cart_id', id);
          });


       

}
fetch_data(get_flower_by_id);


/// cart-page/////////////////////////////////////////////////////////////////////////////////////////////
let cart_id= '';
if (localStorage.getItem('cart_id')) prd_id = localStorage.getItem('cart_id');

let get_flower_cart_by_id ={
    api_url: api_url,
    end_point: end_point. flower +'/'+ localStorage.getItem('cart_id'),
    method: 'GET',
     async callback(params){
        await render_flower_prd(params)
   
    }
} 


