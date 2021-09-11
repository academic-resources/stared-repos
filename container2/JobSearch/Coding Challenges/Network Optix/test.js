for(var i=0;i<10;i++){
  const that = i
  setTimeout(function(){
      // console.log closes over what i is
      // const that = i
      // console.log(i)
       console.log(that)
  })
}
console.log('a')  


