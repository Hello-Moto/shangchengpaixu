let list = document.getElementById("list");
let headerBox = document.getElementById("header"),
    linkList = headerBox.getElementsByTagName("a"),
    productList = list.getElementsByTagName("li");
!function(){
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.open("get","../json/product.json",false);
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4 && xhr.status === 200){
            data = xhr.responseText;
            data = JSON.parse(data);
        }
    };
    xhr.send(null);
    let str = ``;
    for(var i = 0; i < data.length; i++){
        let {title,img,price,time,hot} = data[i];
        str += `<li data-price = "${price}" data-time = "${time}" data-hot = "${hot}" ><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span><br/>
            <span>${time}</span><br/>
            <span>热度：${hot}</span><br/>
        </a></li>`;
    }
    list.innerHTML = str;
}();
!function(){
    let sortList = function(){//按照价格升序排列
        let productArr = [].slice.call(productList);//把类数组转化为数组
        productArr.sort((a,b)=>{
            let aInn,bInn;
            // switch(this.index){//第一种方法
            //     case 0:
            //         aInn = a.getAttribute('data-time').replace(/-/g,'');
            //         bInn = b.getAttribute('data-time').replace(/-/g,'');
            //         break;
            //     case 1:
            //         aInn = a.getAttribute("data-price");
            //         bInn = b.getAttribute("data-price");
            //         break;
            //     case 2:
            //         aInn = a.getAttribute("data-hot");
            //         bInn = b.getAttribute("data-hot");
            //         break;
            // };

            //第二种方法
            let arr = ['data-time','data-price','data-hot'];
            aInn = a.getAttribute(arr[this.index]);
            bInn = b.getAttribute(arr[this.index]);
            if(this.index === 0){
                aInn = aInn.replace(/-/g,'');
                bInn = bInn.replace(/-/g,'');
            }
            return (aInn - bInn)*this.flag;
        })//数组已经排好序
        //按照数组排好的序，把li重新增加到页面中
        for(let i = 0; i < productArr.length; i++){
            let curLi = productArr[i];
            list.appendChild(curLi);
        }
    };
    //循环绑定点击事件
    for(let i = 0; i < linkList.length; i++){
        let curList = linkList[i];
        curList.flag = -1;
        curList.index = i;
        curList.onclick = function(){
            for(var j = 0; j < linkList.length; j++){
                let item = linkList[i];
                if(item !== this){
                    item.flag = -1;
                }
            }
            this.flag *= -1;
            sortList.call(this);
        }
    }
}();