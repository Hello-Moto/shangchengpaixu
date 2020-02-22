let productRender = (function(){
    let data = null,
        list = document.getElementById("list"),
        headerBox = document.getElementById("header"),
        linkList = headerBox.getElementsByTagName("a"),
        productList = null;
    let getData = function(){//获取数据
        let xhr = new XMLHttpRequest();
        xhr.open('get','json/product.txt',false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }
    let bindHtml = function(){//完成数据绑定
        let str = ``;
        data.forEach(function({title,img,price,time,hot},index){
            str += `<li data-price = "${price}" data-time = "${time}" data-hot = "${hot}" ><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span><br/>
            <span>${time}</span><br/>
            <span>热度：${hot}</span><br/>
            </a></li>`;
        })
        list.innerHTML = str;
        productList = list.querySelectorAll("li");
    }
    let bindClick = function(){//绑定点击事件
        [].forEach.call(linkList,(item,index)=>{//循环三次执行三个方法每一次执行都会形成一个闭包，每一个闭包中都保存了当前这个a标签对应索引
            item.flag = -1;
            item.onclick = function(){
                [].forEach.call(linkList,(item,index)=>{
                    if(item !== this){
                        item.flag = -1;
                    }
                })
                this.flag *= -1;
                //根据点击列的不同给productList进行排序
                let arr = ['data-time','data-price','data-hot'];
                productList = [].slice.call(productList);
                productList.sort((a,b)=>{
                    // console.log(productList)
                    let aInn = a.getAttribute(arr[index]),
                        bInn = b.getAttribute(arr[index]);
                    if(index === 0){//点击日期把字符串转换为数字，去掉中间的‘-’
                        aInn = aInn.replace(/-/g,'');
                        bInn = bInn.replace(/-/g,'');
                    }
                    return (aInn - bInn)*this.flag;
                });
                //按照最新顺序依次添加到容器中
                let frg = document.createDocumentFragment();//利用文档碎片减少DOM回流
                productList.forEach((curLi,index)=>{
                    frg.appendChild(curLi);
                })
                list.appendChild(frg);
                frg = null;
            }
        })
    }
    return {
        init: function(){
            getData();
            bindHtml();
            bindClick();
        }
    }
})();
productRender.init();