import sha256 from 'js-sha256'
import Identicon from 'identicon.js'

const getIdenticon = (user_name) => {
  if(user_name){
    const data = new Identicon(sha256(user_name)).toString()
    return 'data:image/png;base64,'+ data  
  } else {
    return '/img/profile-medium.png'
  }
}


export {getIdenticon}