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
    // this.drawd()
    // this.drawAxes();
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
    },
    drawd(){
      
        this.drawAxes(context)
    },
    drawAxes(context) {
        context.save(); 
        context.strokeStyle = AXIS_COLOR;
        context.lineWidth = AXIS_LINEWIDTH;
        this.drawHorizontalAxis(context);
        this.drawVerticalAxis(context);
        context.lineWidth = 0.5;
        context.lineWidth = TICKS_LINEWIDTH;
        context.strokeStyle = TICKS_COLOR;
        this.drawVerticalAxisTicks(context);
        this.drawHorizontalAxisTicks(context);
        context.restore();
    },
    drawHorizontalAxis(context) {
      context.beginPath();
      context.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
      context.lineTo(AXIS_RIGHT,    AXIS_MARGIN)
      context.closePath();
      context.stroke();
    },
    drawVerticalAxis(context) {
        context.beginPath();
        context.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN);
        context.lineTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
        context.closePath();
        context.stroke();
    },
    drawVerticalAxisTicks(context) {
      var deltaY;
      for (var i = 1; i < NUM_VERTICAL_TICKS; ++i) {
          context.beginPath();
         if (i % 5 === 0) {
              deltaX = TICK_WIDTH;
              context.moveTo(0, 0 + HORIZONTAL_TICK_SPACING * i);
              context.lineTo(20, 0 + HORIZONTAL_TICK_SPACING * i);
              context.textAlign = 'left';
              context.fillText(i * HORIZONTAL_TICK_SPACING, 30, 0 + HORIZONTAL_TICK_SPACING * i);
          }else {
              deltaX = TICK_WIDTH/2;
          }            
          context.moveTo(AXIS_ORIGIN.x, i * VERTICAL_TICK_SPACING);
          context.lineTo(AXIS_ORIGIN.x + deltaX, i * VERTICAL_TICK_SPACING);
          context.stroke();
      }
    },
     drawHorizontalAxisTicks(context) {
        var deltaY;
        for (var i=1; i < NUM_HORIZONTAL_TICKS; ++i) {
            context.beginPath();
            if (i % 5 === 0) {
                deltaY = TICK_WIDTH;
                context.moveTo(0 + VERTICAL_TICK_SPACING * i, 0);
                context.lineTo(VERTICAL_TICK_SPACING * i, 20);
                context.textAlign = 'left';
                context.fillText(i * VERTICAL_TICK_SPACING, 0 + VERTICAL_TICK_SPACING * i, 30);
             }else {
                deltaY = TICK_WIDTH/2;
             }           
            context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_MARGIN);
            context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_MARGIN + deltaY);
            context.stroke();
        }
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
  #canvas2 {
        background-color:#fff;
      margin-left:10px;
      margin-top:10px;
      -webkit-box-shadow:4px 4px 8px rgba(0,0,0,0.5);
      -moz-box-shadow:4px 4px 8px rgba(0,0,0,0.5);
      -box-shadow:4px 4px 8px rgba(0,0,0,0.5);
    }
</style>
