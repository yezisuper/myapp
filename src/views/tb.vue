<template>
  <div class="hello">
    <div id='pie'></div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data() {
    return {};
  },
  mounted() {
    this.barDraw();
    this.drawPie();
    this.drawCicle('pie');
    /*  this.barDraw()
      this.lineDraw() */
  },
  components: {},
  methods: {
    barDraw() {
      var data = [10, 5, 12, 15];
      var width = 300,
        scaleFactor = 20,
        barHeight = 30;
      //   var t = d3.transition().duration(3000);
      var graph = d3
        .select("body")
        .style("background-color", "lightblue")
        .append("svg")
        .attr("width", width)
        .attr("height", barHeight * data.length);
      var bar = graph
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          return "translate(0," + i * barHeight + ")";
        });

      bar
        .append("rect")
        .attr("width", function(d) {
          return d * scaleFactor;
        })
        .attr("height", barHeight - 2);
      bar
        .append("text")
        .attr("x", function(d) {
          return d * scaleFactor;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) {
          return d;
        });
    },
    drawPie() {
      var width = 400;

      var height = 400;

      var data = [10, 20, 30];

      var colors = ["green", "purple", "yellow"];

      var svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          return "translate(0,0)";
        });

      g.append("circle")
        .attr("cx", function(d, i) {
          return i * 75 + 50;
        })

        .attr("cy", function(d, i) {
          return 75;
        })

        .attr("r", function(d) {
          return d * 1.5;
        })

        .attr("fill", function(d, i) {
          return colors[i];
        });

      g.append("text")
        .attr("x", function(d, i) {
          return i * 75 + 25;
        })

        .attr("y", 80)
        .attr("stroke", "teal")
        .attr("font-size", "10px")
        .attr("font-family", "sans-serif")
        .text(function(d) {
          return d;
        });
    },
    drawCicle() {
      var donutChart = document.getElementById(self.id);
      if (!donutChart) return;

      var width = donutChart.clientWidth;
      var height = donutChart.clientHeight;
      var pdata = 80; // 显示80%

      donutChart.innerHTML = "";
      var svg = d3
        .select("#" + self.id)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
      // 画百分比
      svg
        .append("text")
        .attr("x", width / 2 - 20) //文本的起始x坐标
        .attr("y", height / 6) //文本的起始x坐标
        .attr("class", "percent_text")
        .text(pdata + "%");
      // 画椭圆
      svg
        .append("ellipse")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("rx", width / 2 - 20)
        .attr("ry", height / 4)
        .attr("class", "circle_line")
        .attr(
          "transform",
          "translate(" + width / 2 + "," + (height * 1.2) / 2 + ")"
        );
      svg
        .append("ellipse")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("rx", width / 8)
        .attr("ry", height / 13)
        .attr("class", "circle_line")
        .attr(
          "transform",
          "translate(" + width / 2 + "," + (height / 2 + 5) + ")"
        );
      svg
        .append("ellipse")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("rx", width / 15)
        .attr("ry", height / 22)
        .attr("class", "circle_line")
        .attr(
          "transform",
          "translate(" + width / 2 + "," + (height / 2 + 5) + ")"
        );
      svg
        .append("ellipse")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("rx", width / 25)
        .attr("ry", height / 40)
        .attr("fill", "#2D3C41") // 实心椭圆：填充颜色
        .attr(
          "transform",
          "translate(" + width / 2 + "," + (height / 2 + 5) + ")"
        );
      var baseColor = "#2D3C41"; // 暗颜色
      var color = "#5D858D"; // 亮颜色
      var colorSize = Math.round((16.0 * pdata) / 100.0); // 连颜色数量
      var dataset = [];
      var index = 1;

      while (index < colorSize * 2) {
        if (index % 2 == 0)
          dataset.push({
            label: index.toString(),
            value: 3.125,
            color: "transparent"
          });
        // 缝隙
        else
          dataset.push({ label: index.toString(), value: 3.125, color: color }); // 亮颜色
        index++;
      }

      while (index <= 32) {
        if (index % 2 == 0)
          dataset.push({
            label: index.toString(),
            value: 3.125,
            color: "transparent"
          });
        // 缝隙
        else
          dataset.push({
            label: index.toString(),
            value: 3.125,
            color: baseColor
          }); // 暗颜色
        index++;
      }
      // 画3D饼图
      svg.append("g").attr("id", "salesDonut");
      Donut3D.draw(
        "salesDonut",
        dataset,
        width / 2,
        height / 2,
        width / 2 - 30,
        height / 4,
        10,
        0.6
      );
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
</style>
