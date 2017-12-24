+function(){
    $("#header").load("data/header.php");
    $("#footer").load("data/footer.php");
    $(window).load("data/product.php",function(data){
        data=eval(data);
        var result="";
        for(var i=0;i<data.length;i++){
            result+=`<div class="my_div${i}">
                        <div class="clearfix product-main-1">
                        <div class="lf main-1-left">
                            <h1 class="title">${data[i].pname}</h1>
                            <div class="info">
                                <p>${data[i].pcontent}</p></div>
                            <div class="divtel">
                                400-666-6566
                            </div>
                            <div class="connect">
                                <a href="#" class="connect-me">联系我们</a>
                                <span class="gold-server">金牌服务&gt;&gt;</span>
                            </div>
                        </div>
                        <div class="rt"></div>
                    </div>
                        <ul class="main-2-title ">
                            <li class="active-2">产品介绍</li>
                            <li>客户案例</li>
                            <li>金牌服务</li>
                            <li>用户口碑</li>
                        </ul>
                        <h2 class="mb-40 mt-40">
                            <p class="p-24">${data[i].pcondition }</p>
                        </h2>
                        <div>
                        <img src="productimg/${data[i].pimg }"/>
                        </div>
                        <h2 class="mt-40 mb-20">
                            <p class="p-24">经营范围</p>
                        </h2>
                        <div>信息发布平台和递送服务、信息搜索查询服务、信息社区平台服务、信息即时交互服务、信息保护和处理服务等。</div>
                        <h2 class="mt-40 mb-20">
                            <p class="p-24">申请条件</p>
                        </h2>
                        <div class="clearfix overflow jbtj">
                            <div class="lf jbtj-img">
                                <p>受理部门：公司注册所在地通信管理局</p>
                            </div>
                            <ul class="lf jbtj-content">
                                <li>1）经营者为依法设立的公司</li>
                                <li>2）有与开展经营活动相适应的资金和专业人员。</li>
                                <li> 3）有为用户提供长期服务的信誉或能力.</li>
                                <li> 4）注册资金最低限额为100万人民币。</li>
                                <li> 5）有必要的场地、设施及技术方案。</li>
                                <li>6）公司及其主要出资者主要经营管理人员三年内无违反电信监督管理制度违法记录.</li>
                                <li> 7）国家规定的其他条件</li>
                            </ul>
                        </div>
                        <h2 class="mt-40 mb-20">
                            <p class="p-24">申请流程</p>
                        </h2>
                        <div class="ml-15">
                            <img src="productimg/pic05.png" alt=""/>
                        </div>
                        <h2 class="mt-40 mb-20">
                            <p class="p-24">为什么选择我们</p>
                        </h2>
                        <div class="ml-15">
                            <img src="productimg/pic06.png" alt=""/>
                        </div>
                        <h2 class="mt-40 mb-20">
                            <p class="p-24">成功案例</p>
                        </h2>
                        <div class="anli clearfix">
                            <div class="anli-img lf">
                                <img src="productimg/201607220611123530.png" alt=""/>
                            </div>
                            <div class="anli-img lf">
                                <img src="productimg/201607220611123530.png" alt=""/>
                            </div>
                            <div class="anli-img lf">
                                <img src="productimg/201607220611123530.png" alt=""/>
                            </div>
                            <div class="anli-img lf">
                                <img src="productimg/201607220611123530.png" alt=""/>
                            </div>
                        </div>
                    </div>`
        }
        $("#product").html(result);
        $(".main-2-title").on("click","li",function(){
            $(this).addClass("active-2").siblings().removeClass("active-2");
        });
        $("#sib_side").on("mouseenter","li",function(){
           var y1=$(this).index()*-17;
            var y2=$(".active").index()*-17;
            $(".active").css({"backgroundPosition":-17+"px"+" "+y2+"px"}).removeClass("active").parent().css("backgroundColor","#fff");
            $(this).children("i").css("backgroundPosition",0+" "+y1+"px").addClass("active").parent().css({"backgroundColor":"#eee"});
              console.log($(this).children("i").css("backgroundPosition"));
            $("#product").children().eq($(this).index()).css("display","block").siblings().css("display","none");
                //.css("display","block").siblings("display","none")
        });
    });
}()