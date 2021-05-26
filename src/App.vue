<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld v-bind:msg="test"/>
  <p>{{test}}</p>
  <el-button type="primary" v-on:click="mainButtonTetst">主要按钮</el-button>
  <p>{{xmlConfigStr}}</p> -->
  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

const { ipcRenderer } = require('electron')
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

const { parseString } = require('xml2js')
// const xml2js = require('xml2js')
console.log(parseString)

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data(){
    return{
      test: 'abc123',
      xmlConfigStr: 'aaaa',
      xmlConfigObj: null
    }
  },
  created(){
    // let _this = this
    // console.log(this)
    ipcRenderer.on('getXmlConfig-replay', (event, arg) => {
      this.xmlConfigStr = arg
      parseString(arg, (err, result) => {
        if(err!=null){
          console.log("xml解析失败!!")
          //exit...
        }
        this.xmlConfigObj = result
        console.log(result)
        console.log(this.xmlConfigObj.BATCH_MODE.MORDO_DB[0].VARIABLES[0].VARIABLE)
        // let builder = new xml2js.Builder()
        // let xml = builder.buildObject(result)
        // console.log(xml)
      })
      // this.xmlConfigObj = 
    })
  },
  methods: {
    mainButtonTetst(){
      // console.log(event)
      ipcRenderer.send('getXmlConfig', 'get')
      // this.test = "okok"
      // var xml = "<root>Hello xml2js!</root>"
    }
  }
}
</script>

<style scoped lang="less">
.bg-purple {
  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>