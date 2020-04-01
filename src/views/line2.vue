<template>
  <div class="hello">
    <div >
      <div class="top-staff">
        
      </div>
      <canvas id="canvas" width="1200" height="600"></canvas>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "line",
  data() {
    return {};
  },
  mounted() {
    this.drawLine()
    
  },
  components: {},
  methods: {
    // 折线图
    drawLine() {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      this.drawGrid(context,"#ccc",30,30)
    },
    drawGrid(context,color,stepx,stepy){
        context.strokeStyle = color;
        context.lineWidth = 0.5;
        for(var i = stepx+0.5;i<context.canvas.width;i+=stepx){
            context.beginPath();
            context.moveTo(i,0);
            context.lineTo(i,context.canvas.height);
            context.stroke();
        }

        for(var i = stepy+0.5;i<context.canvas.height;i+=stepy){
            context.beginPath();
            context.moveTo(0,i);
            context.lineTo(context.canvas.width,i);
            context.stroke();
        }
        context.moveTo(0, 20); //将画笔移动至坐标(x1,y1)作为新的起点
        context.lineTo(200,20); //从起点画线到(x2,y2)并以此作为新的起点
        context.strokeStyle ="red"
        context.lineWidth = 1;
        context.stroke(); //描边连线
    }

  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg rect {
  fill: gray;
}

svg text {
  fill: yellow;
  font: 12px sans-serif;
  text-anchor: end;
}
body{
      background-color:#eee;
  }
  #canvas{
      background-color:#fff;
      margin-left:10px;
      margin-top:10px;
      -webkit-box-shadow:4px 4px 8px rgba(0,0,0,0.5);
      -moz-box-shadow:4px 4px 8px rgba(0,0,0,0.5);
      -box-shadow:4px 4px 8px rgba(0,0,0,0.5);
  }
</style>
