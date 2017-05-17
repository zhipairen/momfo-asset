/**
 * Created by gbl17 on 2017/5/3.
 */
// 一些公用的方法集合
var until = {}

 
until.thousandBitSeparatorInt = function(s) {
  if(s == '0' || !s){
    return '0';
  }
  s = s + '';
  let l = s.split('.')[0].split('').reverse(),
    r = s.split('.')[1];
  let t = '';
  if(l){
    for(let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
  }
  let re = '';
  if(r){
    if(r.length > 2){
      r = r.substr(0,2);
    } else {
      let l = r.length;
      while(l != 2){
        r = r + '0';
        l++;
      }
    }
    re = t.split('').reverse().join('');
  }else{
    re = t.split('').reverse().join('');
  }
  return re;
}

// yyyy-mm-dd 转为 yyyy.mm.dd
until.forMate = function (time) {
  if (!time) return ''
  return time.replace(/[-]/g, '.')
}

// 授信状态,0:未授信,1:已授信,2:授信过期
until.creditState = function (state) {
  if(!state){
  	return ''
  }else if(state == "0"){
  	return '未授信'
  }else if(state == "1"){
  	return '已授信'
  }else if(state == "2"){
  	return '授信过期'
  }
}

// 可接受还款方式(1.等额本息、2.等额本金、3.期初付息，按月还本、4.按月付息、到期还本)
until.ParseRepaymentMethod = function (str) {
  if(!str){
  	return ''
  }else if(str == "1"){
  	return '等额本息'
  }else if(str == "2"){
  	return '等额本金'
  }else if(str == "3"){
  	return '期初付息，按月还本'
  }else if(str == "4"){
  	return '按月付息、到期还本'
  }
}

// 可接受投资期限(1.3个月、2.6个月、3.9个月、4.12个月)
until.ParseInvestmentTerm = function (str) {
  if(!str){
  	return ''
  }else if(str == "1"){
  	return '3个月'
  }else if(str == "2"){
  	return '6个月'
  }else if(str == "3"){
  	return '9个月'
  }else if(str == "4"){
  	return '12个月'
  }
}

// 项目资产类型
until.assetTypeText = function (str) {
  let num = !str ? 0 : (str - 0)
  let assetArr = ['-', '集中式公寓', '分散式公寓', '酒店', '商业地产']
  return assetArr[num]
}

// 土地性质
until.landPropertyTypeText = function (str) {
  let num = !str ? 5 : (str - 0)
  let landArr = ['-', '住宅用地', '工业用地', '仓储用地', '商业服务用地', '其他']
  return landArr[num]
}

 // 房屋类型
until.housingTypeText = function (str) {
  let num = !str ? 6 : (str - 0)
  let housingArr = ['-', '商品房', '房改房', '集资房', '微利房', '平价房', '其他']
  return housingArr[num]
}

// 产品发行状态(2.募集中、3.存续期、4.已结算)
until.ParseReleaseStatus = function (str) {
  if(!str){
  	return ''
  }else if(str == "2"){
  	return '募集中'
  }else if(str == "3"){
  	return '存续期'
  }else if(str == "4"){
  	return '已结算'
  }
}

//表单提交 data.action提交地址,data.data提交参数
until.createForm = function (data,target) {
	function createInput(sfForm,type,name,value) {
		var tmpInput = document.createElement("input");
		tmpInput.type = type;
		tmpInput.name = name;
		tmpInput.value = value;
		sfForm.appendChild(tmpInput);
	};
	var sfForm = document.createElement("form");
	document.body.appendChild(sfForm);
	var req = data.data;
	for (var name in req) {
		createInput(sfForm, "text", name, req[name])
	};
	console.log(data.data)
	console.log(data.action)
	sfForm.method = "post";
	sfForm.action = data.action;
	sfForm.style.display = 'none';
//		sfForm.target = '_blank';
	sfForm.submit();
}

// 产品类型
until.productText = function (str) {
  let num = !str ? 0 : (str - 0)
  let productArr = ['-', '供应链金融', '租约证券化', '契约式基金', '租约贴现', '消费金融', '股权融资']
  return productArr[num]
}

// 产品期限单位
until.termUnitText = function (str) {
  let num = !str ? 0 : (str - 0)
  let termUnitArr = ['-', '日', '月', '季度', '年']
  return termUnitArr[num]
}

// 资金结算方式
until.methodText = function (str) {
  let num = !str ? 0 : (str - 0)
  let methodArr = ['-', '按月等额本息', '按季等额本息', '按月付息，到期还本', '到期还本付息']
  return methodArr[num]
}

// 运营状态
until.perationText = function (str) {
  let num = !str ? 0 : (str - 0)
  let perationArr = ['-', '出租中', '未出租', '终止运营']
  return perationArr[num]
}
export default until
