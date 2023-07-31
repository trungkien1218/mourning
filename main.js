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
        let span = div.querySelector('span');
        
        
        let truBtn = document.querySelector('.tru');
        if(truBtn){
            truBtn.addEventListener('click', function(){
                number = number - 1;
                span.innerHTML = number;
            
            });
        }
       
        
        let congBtn = document.querySelector('.cong');
        if(congBtn){
            congBtn.addEventListener('click', function(){
                number = number + 1;
                span.innerHTML = number;
            
            });
        }
        
        
        /// lưu vào localstorage
        div.addEventListener('click', function(){
            localStorage.setItem('cart_id', id);
          });
          div.querySelector('.buy').addEventListener('click', function(){
            let key=name;
            if (cart[key]){
                cart[key].quantity += number;
                cart[key].total_price = cart[key].quantity * cart[key].price;//// cái này là tính tồng tiền của một sản phẩm khi thêm số lượng
            }
            ///chỗ này gọi tên cho mấy tk cart[key] để lưu vào localstorage
            else{
                cart[key] = {
                    quantity : number, ////number này nằm ở phần cộng trừ số lượng sản phẩm
                    name: name,
                    price: price,
                    image:image,
                    total_price: price //// cái này là tổng số tiền khi mà thêm số lượng là quantity nhân với giá là price 
                }
            }
            localStorage.setItem('cart_id', JSON.stringify(cart));
          });

}
fetch_data(get_flower_by_id);




/// cart-page/////////////////////////////////////////////////////////////////////////////////////////////
let cart={};
 /// function chuyển định dạng tiền .
 function format_price(price){
    return price.toLocaleString('vi-VN');
}

if(localStorage.getItem('cart_id')) cart = JSON.parse(localStorage.getItem('cart_id'));



async function render_flower_cart(params) {
    
   for(let [k,v] of Object.entries(params)){
    let {name, image, quantity, total_price} = v;

    let div = document.createElement('div');
    div.classList.add('cart-dom');
    div.innerHTML = `
                    <div class="cart-img" style="background-image:url(${image})"></div>
                    <div class="cart-name-price">
                        <div class="cart-name">${name}</div>
                        <div class="cart-price">${format_price(total_price)} VND</div>
                    </div>
                    
                   <div class="nav-quantity">
                      
                          <button class="tru" ><i class="fa-solid fa-minus"></i></i></button>
    
                          <span class="number">${quantity}</span>
            
                          <button class="cong"><i class="fa-solid fa-plus"></i></button>
                          
                          <button class="delete"><i class="fa-solid fa-trash-can" ></i></button>
                      
                   </div>
            

    `;
    
    if( document.querySelector('.cart-page ')){
        document.querySelector('.cart-page .container ').appendChild(div);

    };  
    /// nút xóa những cái mày đã chọn                
    div.querySelector('.delete').addEventListener('click', function(){
        let confirm_delete = confirm(' mày có chắc là muốn xóa ko tk chó?');
        if( confirm_delete == true) delete_cart_item(k, div);
     });
     ///nút thêm giảm số lượng đã chọn
     div.querySelector('.cong').addEventListener('click',function(){
        update_cart_quantity({
            type: 'cong',
            parent_dom:div,
            key:k
        });
    });
      
  
    div.querySelector('.tru').addEventListener('click',function(){
        update_cart_quantity({
            type: 'tru',
            parent_dom:div,
            key:k
        });
    });
     
     
   }
    
}

if(localStorage.getItem('cart_id')){
     let L = JSON.parse(localStorage.getItem('cart_id'));
     render_flower_cart(L)
     update_total_bill()
     
}

/// xóa sản phẩm 
function delete_cart_item(k, div){
    delete cart[k] ;
    div.remove();
    

 }
////function của cộng trừ cong
 function update_cart_quantity(params){
    let {type, key , parent_dom} = params;
   if(type == 'cong'){
    cart[key]['quantity'] += 1;
    cart[key]['total_price'] = cart[key]['price'] * cart[key]['quantity'];
    parent_dom.querySelector('.number').innerHTML =  cart[key]['quantity'];
    parent_dom.querySelector('.cart-price').innerHTML = ` ${format_price(cart[key]['total_price'])} VND`;
   }
  
   
   if(type == 'tru'){
    cart[key]['quantity'] -= 1;
    if(parseInt(cart[key]['quantity'])<1){
        cart[key]['quantity']= 1;
        alert('Số lượng tối thiểu là 1 sản phẩm');
    }
    cart[key]['total_price'] = cart[key]['price'] * cart[key]['quantity'];
    parent_dom.querySelector('.number').innerHTML =  cart[key]['quantity'];
    parent_dom.querySelector('.cart-price').innerHTML = ` ${format_price(cart[key]['total_price'])} VND`;
   }
   //update_total_bill();
}

 function update_total_bill(){
    let total = 0;
    /// chạy vòng lặp
    for (let [k,v] of Object.entries(cart)){
        total += v.total_price
        if(document.querySelector('.total-bill')){document.querySelector('.total-bill').innerHTML =`Tổng tiền: ${format_price(total)} VND`;}
    }
    
}
