/**
 * Created by liliwa on 17/5/4.
 */
//商家id  我们拓展以后可能存储不同的id
export function saveToLocal(id, key, val) {
  //我们把所有集体的商家的值都存在这个变量里面
  let seller = window.localStorage.__seller__;
  //第一次没有创建  我们就让这个seller
  if (!seller) {
    seller = {};
    seller[id] = {};
  }else{
    //localStorage 直接存储的是一个字符串
    seller = JSON.parse(seller);
    //拿到这个对象之后 我们判断
    if(!seller[id]){
      //如果没有这个商家
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  //我们拿到这个存储值后 把它转换成一个字符串
  window.localStorage.__seller__ = JSON.stringify(seller);
}

//读取  读不到的时候我们传入一个def作为我们的默认值
export function loadFormLocal(id, key, def) {

}
