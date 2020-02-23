let fetchTime = 0;

export const fetchGet = (url) => {
  fetchTime++
  // 显示加载中
  return new Promise((resolve,reject) => {
    fetch(`http://192.168.23.128:3000${url}`)
      .then(res => res.json())
      .then(data => {
        fetchTime--
        if(fetchTime === 0) {
          // 关闭加载中
        }
        console.log(111)
        resolve(data)
      })
      .catch(e => reject(e))
  })
}
