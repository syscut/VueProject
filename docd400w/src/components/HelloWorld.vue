<template>
<v-row class="text-center">
<v-col cols="12">
  <v-data-table
  v-model="selected"
  :headers="headers"
  :items="contents"
  item-key="row_id"
  :items-per-page="10"
  class="elevation-1"
  loading-text="搜尋中...請稍後"
  :[loadTable]=true
  show-select
  checkbox-color="blue"
  no-data-text="尚無資料"
  no-results-text="查無資料"
  :footer-props="footerProps"
  >

  <!-- 設定前面插入的checkbox ------------------------------------------------>
  <template
    v-slot:item.data-table-select="{ isSelected, select ,item }"
  >
  <v-simple-checkbox
    v-show="item.is_item == 'false' && item.end_mark != 'x'"
    v-ripple
    color="green"
    :value="isSelected"
    @input="select($event)"
  ></v-simple-checkbox>
  </template>
  <!-- 插入圖片顯示器 ------------------------------------------------------->
  <template v-slot:item.qt_desc="{ value }">
    <template v-if="isImg(value)">
      <label @click="showImg" class="cursor blue--text">點擊顯示圖片(點擊圖片隱藏)</label>
      <v-img
        class="cursor"
        v-show="false"
        :src="value"
        max-width="250"
        @click="showLabel"
      >
      </v-img>
    </template>
    <template v-else>
      {{ value }}
    </template>
  </template>
  <!-- 隱藏項次機種 ------------------------------->
  <template v-slot:item.s110="{ item }">
    <label v-show="item.is_item == 'false'">
      {{item.s110}}
    </label>
  </template>
  <!-- 隱藏項次分數 ------------------------------->
  <template v-slot:item.qt_rec="{ item }">
    <label v-show="item.is_item == 'false'">
      {{item.qt_rec}}
    </label>
  </template>
  <!-- 隱藏項次題號 ------------------------------------>
  <template v-slot:item.qt_no="{ item }">
    <label v-show="item.is_item == 'false'">
      {{item.qt_no}}
    </label>
  </template>
  <!-- 轉換題型為文字 -------------------------------------->
  <template v-slot:item.qt_type="{ item,value }">
    <label v-show="item.is_item == 'false'">
      {{value=='Q'? '問答題':value=='F'? '填充題':value=='O'? '是非題':'選擇題'}}
    </label>
  </template>

<!-- 插入表頭與搜尋欄 ----------------------------------------------->
  <template v-slot:top="{ originalItemsLength,pagination }"> <!-- top:插入表頭 -->
  <v-toolbar flat> <!-- falt:去除陰影 -->
    <v-toolbar-title>
      測驗題目第{{pagination.page}}頁
    </v-toolbar-title>
    <v-divider
    class="mx-4"
    inset
    vertical
    ></v-divider>
    <h5>共{{originalItemsLength}}筆</h5>
    <v-spacer></v-spacer>
    <!-- 測試按鈕 ---------------------------------------->

    <v-btn color="black" @click="testClick" dark>測試</v-btn>
    <!-- 測試按鈕 ---------------------------------------->
    <v-form v-model="valid" lazy-validation> 
      <v-text-field
      type="number"
      label="修改分數"
      :rules="checkNum"
      class="mx-4 updaterecfiled"
      v-if="showUpdateRec"
      v-model="updateRec"
      >
      </v-text-field>
    </v-form>
      <v-btn
      v-if="showUpdateRec"
      color="purple lighten-3"
      class="mb-4 white--text"
      @click="updateRecFun()"
      :disabled="!valid"
      >
      整批修改分數
      <v-icon right>
        mdi-clipboard-edit
      </v-icon>
      </v-btn>
    <v-text-field
      v-model="search"
      label="搜尋題目內容"
      class="mx-4 searchfiled"
      append-icon="mdi-magnify"
    >
    </v-text-field>
    <v-btn
      color="green"
      :disabled="!content.length"
      class="mb-4 white--text"
      @click="nweRow"
    >
      新增
      <v-icon right>
        mdi-text-box-plus-outline
      </v-icon>
    </v-btn>
  <!-- 新增視窗 ------------------------------------------------------->
  <!-- 新增視窗 ------------------------------------------------------->
    <v-dialog
    v-model="dialog"
    max-width="700px"
    >
    <v-card>
      <v-card-title class="font-weight-light">
      <v-icon class="mr-2">
        {{ formTitle[1] }}
      </v-icon>
        {{ formTitle[0] }}
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" lazy-validation>
        <v-container>
        <v-row>
        <v-col cols="4">
          <v-text-field
            disabled
            label="機種"
            v-model="selectedS110"
            prepend-icon="mdi-cogs"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
          v-model="editedItem.qt_type"
          :items="qt_types"
          :disabled="editMode != 'new'"
          label="題型"
          prepend-icon="mdi-file-question-outline"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
          type="number"
          label="分數"
          v-show="editMode == 'new' || editMode == 'edit'"
          :rules="checkNum"
          v-model="editedItem.qt_rec"  
          prepend-icon="mdi-alpha-s-circle-outline"
          ></v-text-field>
          <v-select
          v-model="selectedQtType"
          v-show="editMode == 'new_item'||editMode == 'answer'"
          :items="ans_types"
          :label="editMode == 'new_item'? '題目類型':'答案類型'"
          prepend-icon="mdi-alpha-a-circle"
          @change="showFileUpload = !showFileUpload"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          v-show="!showFileUpload"
        >
        <v-textarea
          v-model="editedItem.qt_desc"
          prepend-icon="mdi-note-text-outline"
          :rules="max255chars"
          @keyup="editedItem.qt_desc = check(editedItem.qt_desc)"
          label="題目內容(最多輸入255個字元)"
          counter="255"
          auto-grow
          autofocus
        >
          <template v-slot:counter="{ props }">
            <v-counter v-bind="props" :value="counter_val">
            </v-counter>
          </template>
        </v-textarea>
        </v-col>

    <!-- 編輯的圖片 ---------------------------------------------------->
        <v-col cols="12" v-show="showFileUpload && editMode == 'edit_item'">
          <v-img
          max-width="400"
          :src="editedItem.qt_desc"
          ></v-img>
          <v-file-input
          v-model="selectedFile"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="上傳圖片(僅支援png、jpeg、bmp)"
            show-size
            clearable
            :loading="fileLoading"
            @click="fileLoading = true"
            @change="getFileSrcSingle()"
          >
          </v-file-input>
        </v-col>
    <!-- 新增圖片 ---------------------------------------------------------->
        <v-col
        v-show="showFileUpload && (editMode == 'new_item' || editMode == 'answer')"  
          cols="12" 
        >
        
        <v-col
        cols="12"
          v-for="n of filesContent"
          :key="n.fileSrc"
        >
          <p> 檔案名稱：{{ n.fileName }}</p>
        <v-img
        max-width="450"
        :src="n.fileSrc"
        ></v-img>
        </v-col>
        
        <v-file-input
          v-model="selectedFile"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          label="上傳圖片(僅支援png、jpeg、bmp)"
          show-size
          multiple
          clearable
          :loading="fileLoading"
          @click="fileLoading = true"
          @change="getFileSrc()"
        >
        <template v-slot:selection="{ text }">
          {{ text }}
        </template>
        </v-file-input>
        <p> 上傳：{{ up_ok }}</p>
        </v-col>
      <v-col
      cols="8"
      ></v-col>
      <v-col
      cols="2"
      >
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          取消
          <v-icon dense>
          mdi-cancel
        </v-icon>
        </v-btn>
      </v-col>
      <v-col
      cols="2"
      >
        <v-btn
          color="red darken-1"
          text
          @click="save"
          :disabled="!valid"
        >
          確認
          <v-icon dense>
          mdi-content-save-edit-outline
        </v-icon>
        </v-btn>
      </v-col>
      </v-row>
        </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

      <!-- 刪除視窗 -------------------------------------------------->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title>{{ deleteTitle.title }}</v-card-title>
          <v-card-subtitle>{{ '機種：'+editedItem.s110 +'、題型：'+editedItem.qt_type +'、題號：'+editedItem.qt_no  }}</v-card-subtitle>
          <v-card-text>{{ deleteTitle.content }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
            <v-btn color="red darken-1" text @click="deleteItemConfirm()">{{ deleteTitle.btnText }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 讀取資料錯誤時 --------------------------------------------->
      <v-dialog v-model="errorDialog" max-width="300px">
        <v-card>
          <v-card-title class="red--text">
            <v-icon color="red" left>mdi-alert</v-icon>
            資料讀取失敗...</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
            color="blue darken-1"
            text
            @click="errorDialog = false"
            >確認</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
        
      </v-toolbar>
    </template>
    <!-- 插入編輯 刪除鈕 ---------------------------------------------------------->
    <template v-slot:item.actions="{ item }">
    <v-tooltip top color="blue">
      <template v-slot:activator="{ on }">
    <v-btn
      icon
      v-show="item.end_mark != 'x'"
      @click="editItem(item)"
      v-on="on"
      text
    >
    <v-icon color="blue"> mdi-pencil </v-icon>
    </v-btn>
      </template>
    <span>編輯</span>
  </v-tooltip>

  <v-tooltip top color="green">
      <template v-slot:activator="{ on }">
    <v-btn
      icon
      @click="newItem(item)"
      v-on="on"
      v-show="item.is_item=='false' && item.end_mark != 'x'"
      text
    >
    <v-icon color="green"> mdi-plus-box </v-icon>
    </v-btn>
    </template>
    <span>新增項次</span>
  </v-tooltip>

  <v-tooltip top color="red">
      <template v-slot:activator="{ on }">
    <v-btn
      icon
      @click="removeItem(item)"
      v-on="on"
      v-show="item.is_item=='false'"
      text
    >
    <v-icon color="red"> mdi-delete </v-icon>
    </v-btn>
    </template>
    <span>{{item.end_mark == 'x'? '取消作廢':'作廢'}}</span>
  </v-tooltip>

  <v-tooltip top color="red">
      <template v-slot:activator="{ on }">
    <v-btn
      icon
      @click="deleteItem(item)"
      v-on="on"
      v-show="item.is_item=='true'&&item.end_mark != 'x'"
      text
    >
    <v-icon color="red"> mdi-alpha-x-box </v-icon>
    </v-btn>
    </template>
    <span>刪除</span>
  </v-tooltip>
  </template>
    <!-- 插入分數過濾器 ---------------------------------------------->
    <template v-slot:body.append>
      <tr>
        <td colspan="2" class="pl-0">
          </td>
      <td colspan="2" class="px-0">
        </td>
        
      <td></td>
      <td class="px-0">
        <v-text-field
        v-model="rec"
        dense
        >
        </v-text-field>
      </td>
      <td class="px-0">
        <v-select
        dense
        v-model="selectedRecIcon"
        :items="filterRecIcon"
        >
        <template v-slot:selection="{ item }">
            <v-icon>
    {{ item.icon }}
    </v-icon>
  
        </template>
        <template v-slot:item="{ item }">
          <v-icon>
    {{ item.icon }}
    </v-icon>
  </template>
        </v-select>
      </td>
      </tr>
    </template>
</v-data-table>
    <!-- 底下的提示視窗 ----------------------------------------->
    <v-snackbar
    v-model="snack"
    :timeout="1000"
    :color="snackColor"
    >
    {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn
        v-bind="attrs"
        text
        @click="snack = false"
        >
          關閉提示
        </v-btn>
      </template>
    </v-snackbar>
  </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import en from 'syscut'
//const en = require('@syscut/mymodule')
  export default {
    props:{
      content:{
        default:[]
        },
      loadTable:{
        default:''
        },
      selectedS110:{
        default:''
        }
    },
    data(){
      return {
        api:'http://gfcweb/xml/xml/kim_test_api.html?',
        search: '',
        rec:'',
        message: '',
        snack: false,
        snackColor: '',
        snackText: '',
        dialog: false,
        dialogDelete: false,
        errorDialog:false,
        showFileUpload:false,
        showUpdateRec:false,
        fileLoading:false,
        selectedQtType:'T',
        selectedFile:[],
        filesContent:[{fileName:'尚未上傳任何檔案',fileSrc:''}],
        valid: true,
        checkNum: [
          v => (!isNaN(parseFloat(v))) || '請輸入數字',
          v => (v>=1 && v<=100) || '輸入超過範圍',
          v => !/^0/.test(v) || '開頭不能為0'
        ],
        max255chars:[v => (en.checkLen(v)[1]<=255) || '輸入過長已自動截短'],
        counter_val:0,
        selected:[],
        filterRecIcon:[
          {value:'<=',icon:'mdi-less-than-or-equal'},
          {value:'=',icon:'mdi-equal'},
          {value:'>=',icon:'mdi-greater-than-or-equal'}
        ],
        qt_types:[
          {text:'問答題',value:'Q'},
          {text:'填充題',value:'F'},
          {text:'選擇題',value:'S'},
          {text:'是非題',value:'O'}
        ],
        ans_types:[
          {text:'文字',value:'T'},
          {text:'附件',value:'F'}
        ],
        deleteTitle:{title:'',content:'',btnText:''},
        editMode:'edit',
        selectedRecIcon:'<=',
        updateRec: 10,
        editedIndex: -1,
      editedItem: {
        s110:'',
        qt_type:'Q',
        qt_no:'',
        qt_desc:'',
        qt_rec:10,
        end_mark:' ',
        update_id:'',
        update_date:'',
        create_id:'',
        create_date:'',
        ans_type:'',
        file_code:'',
        row_id:'',
        ans_item:'',
        is_item:''
      },
      defaultItem: {
        s110:'',
        qt_type:'Q',
        qt_no:'',
        qt_desc:'',
        qt_rec:10,
        end_mark:' ',
        update_id:'',
        update_date:'',
        create_id:'',
        create_date:'',
        ans_type:'',
        file_code:'',
        row_id:'',
        ans_item:'',
        is_item:''
      },
      up_ok:'',

      }

      },
    computed:{
      headers(){
        return [
          {text:'機種',value:'s110', width:'70px',class:'px-0',cellClass:'px-0'},
          {text:'題號',value:'qt_no', width:'60px',class:'px-0',cellClass:'px-0'},
          {text:'題型',value:'qt_type', width:'90px',class:'px-0',cellClass:'px-0'},
          {text:'題目內容',value:'qt_desc',cellClass:'pre',
          filter:v=>
            !this.search? true : !this.isImg(v) && v.toString().indexOf(this.search) !== -1
          },
          {text:'分數',value:'qt_rec',
      filter:value=>{
        if(!this.rec){
           return true
        }
        return this.selectedRecIcon=='<='? value <= parseInt(this.rec) : this.selectedRecIcon=='>='? value >= parseInt(this.rec) : value == parseInt(this.rec);
      },
      width:'45px',class:'px-0',cellClass:'px-0'},
      {text:'作廢碼',value:'end_mark',width:'45px',class:'px-0',cellClass:'px-0 pre',align:'center'},
      {text:'異動者',value:'update_id',sortable:false,align:'center'},
      {text:'異動日期',value:'update_date',sortable:false,align:'center'},
      {text:'建檔者',value:'create_id',sortable:false,align:'center'},
      {text:'建檔日期',value:'create_date',sortable:false,align:'center'},
      {text:'功能',value:'actions',sortable:false,width:'110px',class:'px-0',cellClass:'px-0',align:'center'}
      ]
      },
      contents:{
        get(){
        try {
          return this.content.map(val=>({...val, isSelectable:val.is_item=='false'&& val.end_mark != 'x'}))
        } catch (error) {
          this.errorDialog = true;
          return [];
        }
        },
        set(newVal){
          this.content = newVal;
        }
      },
      formTitle () {
        return this.editMode === 'new' ? ['新增作業','mdi-new-box'] : this.editMode == 'edit'? ['編輯作業','mdi-file-edit'] : this.editMode == 'edit_item'? ['編輯項次','mdi-file-edit'] : this.editMode == 'new_item'? ['新增項次','mdi-playlist-plus'] : ['新增答案','mdi-new-box'];
      },
      footerProps(){
        return {
               showFirstLastPage: true,
               itemsPerPageAllText: '全部',
               itemsPerPageText:'每頁顯示',
               pageText:'第 {0} 至第 {1} 項 (共 {2} 筆)'
               }
      },
    },
     watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      selected (val) {
        val.length? this.showUpdateRec = true:this.showUpdateRec = false;
      }
    },
    methods:{
      searchParam(){
        let param = Object.keys(this.editedItem).map(key=>{
          if(key=='s110'||key=='qt_desc'){
           return key+'='+en.encodeBig5(this.editedItem[key])
          }
           return key+'='+this.editedItem[key]
          }).join('&');
          
        return param+'&t='+this.editMode;
      },
      testClick(){
        let t = '{ "�����(1).png": "http://gfcweb/cgi-bin/prgm360w_dl_handle.pl?id=6079&name=�����(1).png ", "����.png": "http://gfcweb/cgi-bin/prgm360w_dl_handle.pl?id=6080&name=����.png", "�s��r���.txt": "http://gfcweb/cgi-bin/prgm360w_dl_handle.pl?id=6081&name=�s��r���.txt" }';
console.log(t.replace(/[^\.\w/":{}()\s,]/g,'x'))
        //Promise.all([url1,url2]).then().catch()
        // let gfcApi = axios.create({
        //   baseURL:'http://gfcweb/xml/xml/kim_test_api.html?s110='+en.encodeBig5(this.selectedS110)
        // })
        // gfcApi.get()
       //console.log('OK')
       //this.$emit('reload')
       //encodeTest('測試')
      //  console.log('測試:'+en.encodeBig5('測試'))
      //  console.log('犇:'+en.encodeBig5('犇'))
      //  console.log(result);
      
      },
      getFileSrc(){
        this.filesContent.pop()
        this.selectedFile.forEach(v=>{
        let reader = new FileReader();
        reader.readAsDataURL(v);
        reader.onload = e => {
          let image = new Image();
          image.src = e.target.result;
           image.onload = i =>{
            this.filesContent.push({fileName:v.name,fileSrc:URL.createObjectURL(v),fileWidth:i.target.width,fileHeight:i.target.height})
           }
        }
            
        })
        this.fileLoading = false;
      },
      getFileSrcSingle(){
        if(this.selectedFile === null){
          return ''
        }
        Object.assign(this.editedItem,{qt_desc:URL.createObjectURL(this.selectedFile)})
        this.fileLoading = false;
      },
      showImg(el){
        el.target.style.display = 'none';
        el.target.nextElementSibling.style.display='';
      },
      showLabel(el){
        el.target.parentNode.previousElementSibling.style.display = '';
        el.target.parentNode.style.display = 'none';
      },
      check(desc){
        let carr = en.checkLen(desc)
        this.counter_val = carr[1]<=255? carr[1]:255;
          return desc.slice(0,carr[0]+1);
      },
      isImg(desc){
        return desc.substring(0,44)=='http://gfcweb/cgi-bin/prgm360w_dl_handle.pl?'? true:false;
      },
      checkIndex(item){
        Object.assign(this.editedItem,item)
        this.editedIndex = this.content.findIndex(cont=>
          cont.row_id == item.row_id
        )
      },
      nweRow(){
        this.check(this.editedItem.qt_desc);
        Object.assign(this.editedItem,{s110:this.selectedS110});
        this.editMode = 'new';
        this.dialog = true
      },
      editItem (item) {
        this.checkIndex(item);
        this.check(item.qt_desc);
        item.is_item=='false'? this.editMode = 'edit':this.editMode = 'edit_item';
        this.showFileUpload = this.isImg(item.qt_desc);
        this.selectedFile = [];
        this.dialog = true
      },
      newItem(item){
        this.checkIndex(item);
        this.counter_val = 0;
        Object.assign(this.editedItem,{qt_desc:''})
        this.showFileUpload = this.selectedQtType == 'T'? false : true;
        this.selectedFile = [];
        this.filesContent = [{fileName:'尚未上傳任何檔案',fileSrc:''}]
        this.editMode = 'new_item';
        this.dialog = true
      },
      deleteItem (item) {
        this.checkIndex(item);
        this.editMode = 'delete_item';
        this.deleteTitle = {title:'刪除',content:'確認刪除？\n刪除後無法復原！',btnText:'確認刪除'};
        this.dialogDelete = true
      },
      removeItem (item) {
        this.checkIndex(item);
        this.editMode = 'remove_item';
        this.deleteTitle = this.editedItem.end_mark == 'x'? {title:'取消作廢',content:'確認取消？',btnText:'確認取消作廢'} : {title:'作廢作業',content:'確認作廢？',btnText:'確認作廢'}
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        if(this.editMode == 'delete_item'){
          await axios.get(this.api,{
           params:{
          row_id:this.editedItem.row_id.slice(1),
          t:'delete'
          }}).then(d=>{
          this.content.splice(this.editedIndex, 1)
          this.snack = true
          this.snackColor = 'success'
          this.snackText = '刪除成功'
        }).catch(err=>{
          this.snack = true
          this.snackColor = 'error'
          this.snackText = '刪除失敗'
        })
        this.closeDelete()
        }
        if(this.editMode == 'remove_item'){
          let mark = this.editedItem.end_mark == 'x'? ' ':'x';
         await axios.get(this.api,{
           params:{
          end_mark:mark,
          row_id:this.editedItem.row_id.slice(1),
          t:'remove'
          }}).then(d=>{
            // this.content.map(v=>{
            //   if(v.row_id == this.editedItem.row_id){
                
            //     Object.assign(v,d.data)
                 
            //   }
            //   if(v.s110 == this.editedItem.s110 && v.qt_type == this.editedItem.qt_type && v.qt_no == this.editedItem.qt_no && v.is_item == 'true'){
                
            //     Object.assign(v,{end_mark:mark})
                
            //   }
            //  })
            this.$emit('reload')

          this.snack = true
          this.snackColor = 'success'
          this.snackText = mark == 'x'? '作廢成功':'取消作廢成功'
        }).catch(err=>{
          this.snack = true
          this.snackColor = 'error'
          this.snackText =  mark == 'x'? '作廢失敗':'取消作廢失敗'
        })
        
        this.closeDelete()
        }
        
      },

      close () { //關掉新增視窗，編輯模式要回復輸入框為預設(editedIndex !== -1)，新增模式則保留(editedIndex === -1)
        this.dialog = false
        this.selected = []
        this.$nextTick(() => {
          if(this.editMode != 'new'){
          Object.assign(this.editedItem,this.defaultItem)
          this.showFileUpload = false;
          this.selectedQtType = 'T'
          }
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.selected = []
        this.$nextTick(() => {
          this.editedIndex = -1
        })
      },
      async save () {
        //新增項次-----------------------------------
        if (this.editMode == 'new_item' && this.showFileUpload == false) {
        let item_index = this.content.map(v=>v.is_item).indexOf('false',this.editedIndex + 1)

          await axios.get(this.api+this.searchParam(),{
           params:{
          aq_type:'Q',
          }}).then(d=>{
          Object.assign(this.editedItem,d.data)
          this.content.splice(item_index,0,Object.assign({},this.editedItem))
          this.snack = true
          this.snackColor = 'success'
          this.snackText = '新增項次成功'
        }).catch(err=>{
          this.snack = true
          this.snackColor = 'error'
          this.snackText = '新增失敗'
        })
        this.close()
          
        }
        //編輯題目--------------------------------
        if(this.editMode == 'edit' && this.showFileUpload == false){
          await axios.get(this.api+this.searchParam()).then(d=>{
             //console.log(d)
          Object.assign(this.content[this.editedIndex], Object.assign(this.editedItem,d.data))
          
          this.snack = true
          this.snackColor = 'success'
          this.snackText = '更新成功'
        }).catch(err=>{
          this.snack = true
          this.snackColor = 'error'
          this.snackText = '更新失敗'
        })
        this.close()
        }
        //新增題目---------------------------------------------------------------
        if(this.editMode == 'new' && this.showFileUpload == false){
          
          await axios.get(this.api+this.searchParam()).then(d=>{
          //   Object.assign(this.editedItem,d.data)
          // this.content.push(this.editedItem)
          this.$emit('reload');
          Object.assign(this.editedItem,{qt_no:d.data.qt_no});
          this.snack = true
          this.snackColor = 'success'
          this.snackText = '新增成功'
        }).catch(err=>{
          this.snack = true
          this.snackColor = 'error'
          this.snackText = '新增失敗'
        })
        Object.assign(this.editedItem,{qt_desc:''});
        this.counter_val = 0;
        this.close()
        setTimeout(() => {
          this.editMode = 'answer';
          this.dialog = true
        },500)
        }
        
        if(this.editMode == 'edit_item' && this.showFileUpload == false){
           await axios.get(this.api+this.searchParam()).then(d=>{
            Object.assign(this.content[this.editedIndex], Object.assign(this.editedItem,d.data))
          this.content.push(this.editedItem)
          this.snack = true
          this.snackColor = 'success'
          this.snackText = '修改成功'
        }).catch(err=>{
          this.snack = true
          this.snackColor = 'error'
          this.snackText = '修改失敗'
        })
        this.close()
        }

        if(this.showFileUpload == true && this.editMode == 'edit_item'){
          this.fileLoading = true;
          this.valid = false;
          let parseS110 = this.selectedS110 == '測試'? 'test': this.selectedS110 == '管理者'? 'adm' : this.selectedS110;
          let formData = new FormData();
          formData.append('file',this.selectedFile);
          formData.append('back_url','/xml/');
          formData.append('MIval','/xml/docd400w_in.html');
          formData.append('rel_id1',parseS110);
          formData.append('rel_id2',this.editedItem.qt_no);
          formData.append('rel_id3',this.editedItem.qt_type);
          formData.append('rel_id4','S');
          formData.append('rel_id5',this.editedItem.ans_item);
          formData.append('rel_id6',500+'-'+300);
          
          await axios.post('http://gfcweb/cgi-bin/prgm360w_up_handle.pl',formData).then(d=>{
            console.log(d.data)
            Object.assign(this.content[this.editedIndex], {qt_desc:d.data.ans_desc})

            this.snack = true
          this.snackColor = 'success'
          this.snackText = '圖片更新成功'
          this.fileLoading = false;
          this.valid = true;
          }).catch(err=>{
            console.log('err:'+err)
            this.snack = true
          this.snackColor = 'error'
          this.snackText = '圖片更新失敗'
          })
          this.close()
        }
        //新增答案文字-----------------------------------------------------------
        if(this.showFileUpload == true && this.editMode == 'answer'){
          this.snack = true
          this.snackColor = 'success'
          this.snackText = '新增答案成功'
          this.close()
        }
        //新增答案附件-----------------------------------------------------------
        if(this.showFileUpload == true && this.editMode == 'answer'){
          //let uploadApi = axios.create({baseURL:'http://gfcweb/cgi-bin/prgm360w_up_handle.pl'})
          this.fileLoading = true;
          this.valid = false;
          let parseS110 = this.selectedS110 == '測試'? 'test': this.selectedS110 == '管理者'? 'adm' : this.selectedS110;
          let fileData = [];
          
          // for(let n = 0;n<this.selectedFile.length;n++){
          //   let formData = new FormData();
          //   formData.append('file',this.selectedFile[n]);
          //   formData.append('back_url','/xml/');
          //   formData.append('MIval','/xml/kim_test_api.html');
          //   formData.append('rel_id1','N');
          //   formData.append('rel_id2',parseS110);
          //   formData.append('rel_id3',this.editedItem.qt_type);
          //   formData.append('rel_id4',this.editedItem.qt_no);
          //   formData.append('rel_id5',n+1);
          //   formData.append('rel_id6',500+'-'+300);
          //   fileData.push(axios.post('http://gfcweb/cgi-bin/prgm360w_up_handle.pl',formData));
          // }
          // await Promise.all(fileData).then(d=>{
          //   console.log(d.msg)
          //   this.snack = true
          // this.snackColor = 'success'
          // this.snackText = '圖片新增成功'
          
          // }).catch(e=>{
          //   this.snack = true
          // this.snackColor = 'error'
          // this.snackText = '圖片新增失敗'
          
          // })
          this.fileLoading = false;
          this.valid = true;
          //this.close()
        }
        //新增項次圖片-----------------------------------------------------------------
        if(this.showFileUpload == true && this.editMode == 'new_item'){
          this.fileLoading = true;
          this.valid = false;
          let parseS110 = this.selectedS110 == '測試'? 'test': this.selectedS110 == '管理者'? 'adm' : this.selectedS110;
          let fileData = [];
          
          let test = await en.uploadFiiles(this.selectedFile,'docd400w','03/25/2022');
          console.log(test);
          this.up_ok = test;
          // for(let n = 0;n<this.selectedFile.length;n++){
          //   let formData = new FormData();
          //   formData.append('file',this.selectedFile[n]);
          //   formData.append('back_url','/xml/');
          //   formData.append('MIval','/xml/kim_test_api.html');
          //   formData.append('rel_id1','I');
          //   formData.append('rel_id2',parseS110);
          //   formData.append('rel_id3',this.editedItem.qt_type);
          //   formData.append('rel_id4',this.editedItem.qt_no);
          //   formData.append('rel_id5','');
          //   formData.append('rel_id6',500+'-'+300);
          //   fileData.push(axios.post('http://gfcweb/cgi-bin/prgm360w_up_handle.pl',formData));
          // }
          // await Promise.all(fileData).then(d=>{
          //   console.log(d.url)
          //   this.$emit('reload');
          //   this.snack = true
          // this.snackColor = 'success'
          // this.snackText = '圖片新增成功'
          
          // }).catch(e=>{
          //   this.snack = true
          // this.snackColor = 'error'
          // this.snackText = '圖片新增失敗'
          
          // })
          this.fileLoading = false;
          this.valid = true;
          //this.close()
        }

      },
      async updateRecFun(){
        let qt_type_s = this.selected.map(obj=>obj.qt_type).join(',');
        let qt_no_s =  this.selected.map(obj=>obj.qt_no).join(',');
        let len = this.selected.length -1;
        
        await axios.get(this.api+'s110='+en.encodeBig5(this.selectedS110),{
          params:{
            qt_type_s:qt_type_s,
            qt_no_s:qt_no_s,
            len:len,
            t:'up_rec',
            qt_rec:this.updateRec
          }
        }).then(d=>{
          //this.$emit('reload');
          let selectId =  Array.from(this.selected,v=>v.row_id);
         this.content.filter(v=> selectId.includes(v.row_id)).forEach(val=>val.qt_rec = this.updateRec)
         console.log(d.data.msg)
          this.selected = [];
          this.snack = true
          this.snackColor = 'success'
          this.snackText = d.data.msg
        }).catch(err=>{
          this.snack = true
          this.snackColor = 'error'
          this.snackText = '修改失敗'
        })


        
        // this.selected = [];
        //   this.snack = true
        //   this.snackColor = 'success'
        //   this.snackText = '分數修改成功'
         
         //console.log(qt_type_s)
        
      },
    }
  }
</script>
<style>
.pre{
  white-space: pre-wrap;
}
.cursor{
  cursor: pointer;
}
.updaterecfiled{
  width: 80px;
}
.searchfiled{
  max-width: 370px !important;
}
</style>
