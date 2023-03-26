
export const calculatePrice = (nonOpProduct,opProduct, nonOpQty,opQty) => {

  let totalPrice=0;

   opProduct.forEach((e) => {
    if(e.selected){
      let t = opQty.filter(oq => oq.id === e._id );
      let qty = 1;
      if(t.length){
        qty = parseInt( t[0].value);
      }
      totalPrice+= e.price*qty;
    }
  })

  nonOpProduct.forEach((e) => {
    
      let t = nonOpQty.filter(noq => noq.id === e._id );
      let qty = 1;
      if(t.length){
        qty = parseInt( t[0].value);
      }
      totalPrice+= e.price*qty;
    
  })
  //opProduct.forEach(e=>totalPrice+=e.price)
  //nonOpProduct.forEach(e=> e.selected?totalPrice+=e.price:null)
  return totalPrice.toFixed(2)
 ;
};


export const getDefaultSize = (defaultSizeArr,productId,productQty) => {
  productQty = parseInt(productQty);
  let t = defaultSizeArr.filter(oq => oq.id === productId );
  let qty = 1;
  if(t.length){
    qty = parseInt( t[0].value);
  }
  if(qty <= productQty){
    return qty;
  }
  return productQty;
};
