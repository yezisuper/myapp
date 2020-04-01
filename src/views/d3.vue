<template>
  <div class="hello">
   <p class="p">1111</p>
   <p class="p">2222</p>
   <p class="p">3333</p>
   <p class="p">4444</p>
  <h3>deaasfafasfasfa</h3>
  <svg width = "300" height = "300">
         <rect x = "20" 
            y = "20"
            width = "60"
            height = "60"
            fill = "green"
            transform = "translate(30 30)">
         </rect>
      </svg>
    <svg width = "300" height = "300">
         <rect x = "20" 
            y = "20" 
            width = "60" 
            height = "60" 
            fill = "green" 
            transform = "translate(60 60) rotate(45)">
         </rect>
      </svg>
    <svg width = "300" height = "300">
         <g transform = "translate(60,60) rotate(30)">
            <rect x = "20" 
               y = "20" 
               width = "60" 
               height = "30" 
               fill = "green">
            </rect>
            <circle cx = "0" 
               cy = "0" 
               r = "30" 
               fill = "red"/>
         </g>
      </svg>
  <svg width = "300" height = "300">
     <rect x = "20" y = "20" width = "300" height = "300" fill = "green"></rect>
     <svg width = "300" height = "300">
   <circle cx = "200" cy = "50" r = "20" fill = "red"/>
</svg>
      <line x1 = "100" y1 = "100" x2 = "200" y2 = "200" 
   style = "stroke:rgb(255,0,0);stroke-width:2"/>
   
  </svg>
  <div id = "svgcontainer"></div>
  
  </div>
  
</template>

<script>
export default {
  name: 'userinfo',
  data () {
    return {
      
    }
  },
  mounted() { 
      this.drawSvg()
     /*  this.barDraw()
      this.lineDraw() */
      


    
  },
  components: {
    
  },
  methods: {
      drawSvg(){
          var t=d3.transition()
          .duration(3000)
          d3.select("body")
            .transition(t)
            .style("background-color", "lightblue");
            d3.selectAll("p").transition().style("background-color","rgb(0,150,120)").duration(5000);
            d3.selectAll("h3").transition()
            .style("font-size","28px").delay(2000).duration(2000);
            var width = 300;
            var height = 300;
            var svg = d3.select("#svgcontainer")
            .append("svg").attr("width", width).attr("height", height);
            svg.append("line")
            .attr("x1", 100)
            .attr("y1", 100)
            .attr("x2", 200)
            .attr("y2", 200)
            .style("stroke", "rgb(255,0,0)")
            .style("stroke-width", 2);
            svg.append('rect')
            .attr('x',20)
            .attr('y',20)
            .attr('width',20)
            .attr('height',20)
            .attr('fill','green')
            svg.append("circle")
            .attr("cx", 200)
            .attr("cy", 50)
            .attr("r", 20)
            .attr("fill", "green");
            svg.append("ellipse")
            .attr("cx", 200)
            .attr("cy", 50)
            .attr("rx", 100)
            .attr("ry", 50)
            .attr("fill", "green")
      },
       barDraw(){
            var width = 300
            var height = 300
            var svg = d3.select("body")
                        .append("svg")
                        .attr("width",width)
                        .attr("height",height)
            var dataset = [250, 10, 170, 130, 90,80];  //数据（表示矩形的宽度）
            var rectHeight = 25;   //每个矩形所占的像素高度(包括空白)

            //在 SVG 中，x 轴的正方向是水平向右，y 轴的正方向是垂直向下的
            svg.selectAll("rect")
            .data(dataset) //绑定数组
            .enter() //指定选择集的enter部分
            .append("rect") // 添加足够数量的举行元素
            .attr("x",20)
            .attr("y",function(d,i){
                return i * rectHeight;
            })
            .attr("width",function(d){
                return d;
            })
            .attr("height",rectHeight-2) //减去2表示每个柱子之间留空白
            .attr("fill","#09F");
            
                svg.selectAll("rect")   //选择svg内所有的矩形
                .data(dataset)  //绑定数组
                .enter()        //指定选择集的enter部分
                .append("rect") //添加足够数量的矩形元素
                //当有数据，而没有足够图形元素的时候，使用此方法可以添加足够的元素。
            
        },
        lineDraw(){
                    //画布大小
                var width = 400;
                var height = 400;

                //在 body 里添加一个 SVG 画布
                var svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

                //画布周边的空白
                var padding = {left:20, right:30, top:50, bottom:20};

                //定义一个数组
                var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

                //x轴的比例尺
                var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, width - padding.left - padding.right]);

                //y轴的比例尺
                var yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset)])
                    //[height - padding.top - padding.bottom, 0]这样可以使得y轴正方向向上
                    .range([ 0,height - padding.top - padding.bottom]);

                //定义x轴
                var xAxis = d3.axisTop(xScale)
                //定义y轴
                var yAxis = d3.axisLeft(yScale)

                //矩形之间的空白
                var rectPadding = 4;

                //添加矩形元素
                var rects = svg.selectAll(".MyRect")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .attr("class","MyRect")
                //
                    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                    /*
                    柱子绘制位置
                    */
                    .attr("x", function(d,i){
                        return xScale(i) + rectPadding/2;
                    } )
                    .attr("y",function(d){
                        return 0;
                    })
                    .attr("width", xScale.bandwidth() - rectPadding)
                    .attr("height", function(d){
                        return yScale(d);
                    });

                //添加文字元素
                var texts = svg.selectAll(".MyText")
                    .data(dataset)
                    .enter()
                    .append("text")
                    .attr("class","MyText")
                    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                    .attr("x", function(d,i){
                        return xScale(i) + rectPadding/2;
                    } )
                    .attr("y",function(d){
                        return yScale(d);
                    })
                    .attr("dx",function(){
                        return (xScale.bandwidth() - rectPadding)/2;
                    })
                    .attr("dy",function(d){
                        return 20;
                    })
                    .text(function(d){
                        return d;
                    });

                //添加x轴
                svg.append("g")
                    .attr("class","axis")
                    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                    .call(xAxis);

                //添加y轴
                svg.append("g")
                    .attr("class","axis")
                    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                    .call(yAxis);
                    }
      
  },
  drawPie(){
      var width =300;
      var height=300;
      d3.selectAll('p').style('color','#ff00dd')
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
