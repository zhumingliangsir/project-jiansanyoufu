+function(){
    $("#header").load("data/header.php");
    $("#footer").load("data/footer.php");
     function content(obj){
         var result="";
         for(var i=0;i<obj.data.length;i++){
             console.log(obj.data[i].ntitle);
             result+=`<section class=" clearfix">
                        <div class="rt new-width">
                            <h3 class="new-h3-margin">${obj.data[i].ntitle}</h3>
                            <p>${obj.data[i].ncontent} </p>
                        </div>
                        <div>
                            <a href="#">
                                <img src="images/news/${obj.data[i].nimg}" alt=""/>
                            </a>
                        </div>
                        <div class="dashed"></div>
                    </section>`
         }
         $("#container_main").html(result);
     }
     function page(obj){
            var page="";
            for(var c=1;c<=obj.pageSize;c++){
                page+=`
                    <a  class="prepage onclick" name=${c}>${c}</a>
                    `
            }
            $('#pageone').after(page).next().removeClass('prepage').addClass('nowpage');
        }
     function clickPage(a,obj){
        if($(a).attr("name")=="1"){
            $(a).addClass("nowpage").removeClass("prepage").siblings().addClass("prepage").removeClass("nowpage");
            $(a).prev().css("color","#ddd").prop("disable",true);
            $("#pagebar a:last").css("color","#333333");
        }else if($(a).attr("name")==obj.pageSize){
            $(a).addClass("nowpage").removeClass("prepage").siblings().removeClass("nowpage").addClass("prepage");
            $("#pagebar a:first").css("color","#333333");
            $(a).next().css("color","#ddd").prop("disable",true)
        }else{
            $(a).addClass("nowpage").removeClass("prepage").siblings().removeClass("nowpage").addClass("prepage");
            $("#pagebar a:first").css("color","#333333");
            $("#pagebar a:last").css("color","#333333")}
    }
     function pageTurning(value,obj){
         var  a= $("[name="+value+"]");
         getMsg(value,a,obj);
     }
     function getMsg(value,a,obj){
        $.post("data/new.php",{"pageNum":value}).success(function(obj){
            content(obj);

            clickPage(a,obj);
        })
    }
     function addmore(){
    $.ajax({
        type:"post",
        url:"data/new.php",
        data:null,
        success:function(obj){
            var value=1;
            var  c=document.getElementsByClassName("nowpage");
            content(obj);
            page(obj);
            clickPage(c,obj);
            $("#pagebar").on("click",'.onclick',function(){
                //发送ajax请求请求当前页面的数据
                var a=this;
                value=parseInt(this.name);
                getMsg(value,a,obj);
                });
            //如果是1的话就不能被点
            $(".pageTurning").click(function(){
                if(this.name=="a"){
                    var i=-1;
                }else{
                    i=1;
                }
                value+=i;
                if(value<1){
                    value=1
                }else
                if(value>obj.pageSize){
                    value=obj.pageSize
                }else{
                    pageTurning(value,obj);
                    console.log(value)
                }
            });
        }
    });}
    addmore();
}();
