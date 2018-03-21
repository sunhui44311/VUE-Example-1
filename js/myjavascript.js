new Vue({
	el:'#add',
	data:{
           addText:'',
           //name为目标名称，status是完成状态
           proList:[
           {name:'html',status:false},
           {name:'css',status:false},
           {name:'Vue',status:false},
           {name:'react',status:false}
           ],
           newLies:[],
           curIndex:'',
           beforeEditText:'',
           curType:0
	},


	computed:{
		//计算属性，返回未完成目标的条数，就是数组里面status=false的条数
		noend:function(){
			return this.proList.filter(function(age){
				return !age.status;
			}).length;
		}

	},


	methods:{
		addList:function(){
			//添加新的目标，并将完成状态默认设置为未完成
			this.proList.push({
				name:this.addText,
				status:false
			});
			//添加后 清空表单
			this.addText="";
		},


		chooseList:function(type){
			// type=1时，选择所有的目标
			// type=2时，选择已完成的目标
			// type=3时，选择未完成的目标

			switch(type){
                case 1:this.newLies=this.proList;break;
                case 2:this.newLies=this.proList.filter(function(age){return age.status});break;
                case 3:this.newLies=this.proList.filter(function(age){return !age.status});break;
			}
		},


		delectList:function(item){
        //根据索引删除数组的某一项
            var index = this.proList.indexOf(item)
        //更新newList  newList可能经过this.prolist.filter()赋值，这样的话，删除了prolist不会影响到newList  那么就要手动更新newList
            this.proList.splice(index,1);
            this.chooseList(this.type)
		},
        //修改前
		editBefore:function(name){
	    //先记录当前项（比如这一项，{name:"HTML5",status:false}）
        //beforeEditText="HTML5"
            this.beforeEditText=name;
		},
        //修改完成后
		edited:function(){
	    //修改完了，设置curIndex=""，这样输入框就隐藏，其它元素就会显示。因为在li元素 写了：:class="{'eidting':curIndex===index}"  当curIndex不等于index时，
	    //eidting类名就清除了！
        //输入框利用v-model绑定了当前项（比如这一项，{name:"HTML5",status:false}）的name,当在输入框编辑的时候，
        //比如改成‘HTML’,实际上当前项的name已经变成了‘HTML’，所以，这一步只是清除eidting类名，隐藏输入框而已
        //还有一个要注意的就是虽然li遍历的是newList，比如改了newList的这一项（{name:"HTML5",status:false}），比如改成这样（{name:"HTML",status:true}）。
        //实际上prolist的这一项（{name:"HTML5",status:false}），也会被改成（{name:"HTML",status:true}）。
        //因为这里是一个对象，而且公用一个堆栈！修改其中一个，另一个会被影响到
			this.curIndex='';
		},
 	    //取消修改
		cancelEdit:function(val){
	    //上面说了输入框利用v-model绑定了当前项（比如这一项，{name:"HTML5",status:false}）的name,当在输入框编辑的时候，
	    //比如改成‘HTML’,实际上当前项的name已经变成了‘HTML’，所以，这一步就是把之前保存的beforeEditText赋值给当前项的name属性，
	    //起到一个恢复原来值得作用！
            val.name=this.beforeEditText;
            this.curIndex='';
		},
        /*改变单条数据的完成状态*/
		changeType(index){
         this.newList[index].status=!this.newList[index].status;
        //更新数据
         this.chooseList(this.curType);
        },


	},

	mounted:function(){
	 //初始化数据，当前函数是自调用
			this.newLies=this.proList;
		}
})
