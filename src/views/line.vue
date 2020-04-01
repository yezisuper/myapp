<template>
  <div class="hello">
    <div class="canvas-box">
      <div class="top-staff">
        <!-- 刻度尺容器(必要的) -->
        <!-- <div class="ruler-wrap" id="ruler"></div> -->
        <ul class="rulers" :style="{width:canvasWidth}">
          <li class="rulers-item" v-for="item in timeData">
            <p>{{item}}</p>
          </li>
        </ul>
      </div>
      <canvas id="canvas" :width="canvasWidth" height="600"></canvas>
      <div
        class="line-main"
        v-for="(list,index) in lineDataList"
        :key="index"
        :style="{top:list.top}"
      >
        <div
          class="line-box"
          v-for="(item,index) in list.children"
          :key="index"
          :style="{width:item.linewidth}"
        >
          <div class="name">
            <span>尤</span>
            <span>冯</span>
            <span>王</span>
          </div>
          <div class="top-l-m">模</div>
          <div class="bot-l-m">123455</div>
          <div class="top-r-m">25-35</div>
        </div>
      </div>
    </div>
    <Button type="info" @click="exportWord">导出word文档</Button>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import ImageModule from "docxtemplater-image-module-free";
import ruler from "./js/ruler";
export default {
  name: "line",
  data() {
    return {
      canvasWidth: "1200px",
      lineDataList: [
        {
          top: "",
          children: [
            {
              linewidth: "300px"
            },
            {
              linewidth: "500px"
            }
          ]
        },
        {
          top: "300px",
          children: [
            {
              linewidth: "200px"
            },
            {
              linewidth: "600px"
            }
          ]
        }
      ],
      timeData: [
        "9:30",
        "10:30",
        "11:30",
        "12:30",
        "13:30",
        "14:30",
        "15:30",
        "16:30",
        "17:30",
        "18:30"
      ]
    };
  },
  mounted() {
    this.drawLine();
    // this.drawd()
    // this.drawAxes();
    // this.drawd()
    //调用刻度尺方法
    /* ruler.initPlugin({
        el: "ruler", //容器id
        startValue: 100,
        background: "#f5f5f5",
        success: function (res) {
            console.log(res);
        }
    }); */
  },
  components: {},
  methods: {
    // 折线图
    drawLine() {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      this.drawGrid(context, "#ccc", 20, 40);
    },
    drawGrid(context, color, stepx, stepy) {
      context.strokeStyle = color;
      context.lineWidth = 0.5;
      for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
      }

      for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
      }
      this.drawAxes([0, 0], 1200, 300, "#999", 2, context);
    },
    drawAxes(origin, x_Len, y_Len, color, lineWidth, context) {
      // 创建水平坐标轴路径
      context.moveTo(origin[0], origin[1]);
      context.lineTo(origin[0] + x_Len, origin[1]);

      // 创建垂直坐标轴路径
      context.moveTo(origin[0], origin[1]);
      context.lineTo(origin[0], origin[1] - y_Len);

      // 创建坐标轴的刻度线路径
      for (let i = origin[0] + 20; i < x_Len; i += 20) {
        context.moveTo(i, origin[1] - 10);
        context.lineTo(i, origin[1] + 10);
      }
      for (let j = origin[1] - 20; j > origin[1] - y_Len; j -= 20) {
        console.log(j);
        context.moveTo(origin[0] - 10, j);
        context.lineTo(origin[0] + 10, j);
      }

      // 设置绘制颜色
      context.strokeStyle = color;
      // 设置绘制线段的宽度
      context.lineWidth = lineWidth;
      // 绘制坐标轴
      context.stroke();
      // 清除路径
      context.beginPath();
      this.drawXline([40, 60], 1100, 300, "red", 0.5, context);
    },
    drawXline(origin, x_Len, y_Len, color, lineWidth, context) {
      // 创建水平坐标轴路径
      context.moveTo(origin[0], origin[1]);
      context.lineTo(origin[0] + x_Len, origin[1]);
      // 设置绘制颜色
      context.strokeStyle = color;
      // 设置绘制线段的宽度
      context.lineWidth = lineWidth;
      // 绘制坐标轴
      context.stroke();
      // 清除路径
      context.beginPath();
      this.drawXlineSx([400, 60], 120, 300, "red", "0.5", context);
    },
    drawXlineSx(origin, x_Len, y_Len, color, lineWidth, context) {
      // 创建水平坐标轴路径
      context.moveTo(origin[0], origin[1]);
      context.lineTo(origin[0] + x_Len, origin[1] - 60);
      // 设置绘制颜色
      context.strokeStyle = color;
      // 设置绘制线段的宽度
      context.lineWidth = lineWidth;
      // 绘制坐标轴
      context.stroke();
      // 清除路径
      context.beginPath();
      context.moveTo(origin[0] + 80, 20);
      context.lineTo(origin[0] + 140, origin[1]);
      // 设置绘制颜色
      context.strokeStyle = color;
      // 设置绘制线段的宽度
      context.lineWidth = lineWidth;
      // 绘制坐标轴
      context.stroke();
      // 清除路径
      context.beginPath();
    },
    // 导出文档
    exportWord() {
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("input.docx", function(error, content) {
        // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error;
        }

        // 创建一个JSZip实例，内容为模板的内容
        let zip = new JSZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new window.docxtemplater().loadZip(zip);
        // 设置模板变量的值
        doc.setData({
          ..._this.form,
          table: _this.tableData
        });

        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "报价单.docx");
      });
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
body {
  background-color: #eee;
}
#canvas {
  background-color: #fff;
  /*  margin-left:10px;
      margin-top:10px; */
  -webkit-box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  -box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
.canvas-box {
  position: relative;
  width: 1200px;
  height: 800px;
  margin: 0 auto;
}
.line-main {
  position: absolute;
  top: 119px;
  left: 41px;
  display: flex;
  margin-top: 90px;
}
.line-box {
  border-bottom: 1px solid red;
  position: relative;
  margin-right: 80px;
}
.name {
  position: absolute;
  right: -56px;
  width: 37px;
  top: -16px;
}
.top-l-m {
  position: absolute;
  left: 0px;
  top: -22px;
}
.bot-l-m {
  position: absolute;
  left: 0px;
  top: 3px;
}
.top-r-m {
  position: absolute;
  right: 0px;
  top: -22px;
}
.axis text {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}
.rulers {
  display: flex;
  /* width: 1200px; */
  padding: 0;
  margin: 0px;
}
.rulers li {
  position: relative;
  border: 1px solid #999;
  border-bottom: none;
  list-style: none;
  width: 1200px;
  height: 78px;
}
.rulers li p {
  position: absolute;
  left: -33px;
  top: 50%;
  margin-top: -15px;
  width: 62px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #999;
  text-align: center;
  background: #fff;
}
.timeData {
}
</style>
