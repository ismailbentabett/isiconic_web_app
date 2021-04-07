import axios from 'axios';
import store from './store';
//user
export async function GET_CURRENT_USER_DATA(user_id) {
  let data = axios.get(`http://localhost:3000/api/user/${user_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}



export async function GET_ALL_USERS() {
  let data = axios.get(`http://localhost:3000/api/user/`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}


export async function UPDATE_USER(user_id, updated_data) {
  let data = axios.put(`http://localhost:3000/api/user/${user_id}`, {

      firstName: updated_data.firstName,
      lastName: updated_data.lastName,
      bio: updated_data.bio,
      birthday: updated_data.birthday,
      location: updated_data.location,
      Living: updated_data.Living,
      school: updated_data.school,
      relashioshipStatus: updated_data.relashioshipStatus,
      sex: updated_data.sex,
      isSeller: updated_data.isSeller,
      image: updated_data.image
    }, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

//posts
export async function GET_USER_POSTS(user_id) {
  let data = axios.get(`http://localhost:3000/api/post/${user_id}`, {
      withCredentials: true
    })
    .then((result) => {
      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function GET_ALL_POSTS() {
  let data = axios.get(`http://localhost:3000/api/post/`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function CREATE_A_POST(user_id, {
  title,
  subTitle,
  content,
  isProduct,
  productID,
  created_at

}) {
  axios.post(`http://localhost:3000/api/post/${user_id}`, {
      title: title,
      subTitle: subTitle,
      content: content,
      isProduct: isProduct,
      productID: productID,
      created_at: created_at
    }, {
      withCredentials: true
    })
    .then((result) => {
      console.log(result)
      return result

    })
    .catch(e => {
      console.log(e)
    })

}

export async function UPDATE_A_POST(post_id, {
  title,
  subTitle,
  content,
  isProduct,
  productID,
  created_at

}) {
  axios.put(`http://localhost:3000/api/post/${post_id}`, {

      title: title,
      subTitle: subTitle,
      content: content,
      isProduct: isProduct,
      productID: productID,
      created_at: created_at
    }, {
      withCredentials: true
    })
    .then((result) => {

      return result

    })
    .catch(e => {
      console.log(e)
    })
}

export async function DELETE_A_POST(post_id) {
  let data = axios.delete(`http://localhost:3000/api/post/${post_id}`, {
      withCredentials: true
    })
    .then(() => {

      console.log("post deleted")

    })
    .catch(e => {
      console.log(e)
    })
  return data
}


//products

export async function GET_USER_PRODUCTS(user_id) {
  let data = axios.get(`http://localhost:3000/api/product/${user_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function GET_ALL_PRODUCTS() {
  let data = axios.get(`http://localhost:3000/api/product/`, {
      withCredentials: true
    })
    .then((result) => {

      return result

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function CREATE_A_PRODUCT(user_id, post_data) {
  let data = axios.post(`http://localhost:3000/api/product/${user_id}`, {
      post_data
    }, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function UPDATE_A_PRODUCT(post_id, updated_data) {
  let data = axios.put(`http://localhost:3000/api/product/${post_id}`, {
      updated_data
    }, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function DELETE_A_PRODUCT(post_id) {
  let data = axios.delete(`http://localhost:3000/api/product/${post_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}



//store

export async function GET_USER_STORES(user_id) {
  let data = axios.get(`http://localhost:3000/api/store/${user_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function GET_ALL_STORES() {
  let data = axios.get(`http://localhost:3000/api/store/`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function CREATE_A_STORE() {
  let data = axios.post(`http://localhost:3000/api/store/`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function UPDATE_A_STORE(storeId, updated_data) {
  let data = axios.put(`http://localhost:3000/api/store/${storeId}`, {
      name: updated_data.name,
      description: updated_data.description,
      image: updated_data.image,
    }, {
      withCredentials: true
    })
    .then((result) => {
      console.log(result.data)
      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function DELETE_A_STORE(post_id) {
  let data = axios.delete(`http://localhost:3000/api/store/${post_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}



//rooms

export async function GET_USER_ROOMS(room_id) {
  let data = axios.get(`http://localhost:3000/api/room/${room_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function GET_ALL_ROOMS() {
  let data = axios.get(`http://localhost:3000/api/room/`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function CREATE_A_ROOM() {
  let data = axios.post(`http://localhost:3000/api/room/`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function UPDATE_A_ROOM(post_id, updated_data) {
  let data = axios.put(`http://localhost:3000/api/room/${post_id}`, {
      updated_data
    }, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function DELETE_A_ROOM(post_id) {
  let data = axios.get(`http://localhost:3000/api/room/${post_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}






//chats
//
export async function GET_USER_CHATS(user_id) {
  let data = axios.get(`http://localhost:3000/api/chat/${user_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function GET_LATEST_CHAT(roomid) {
  let data = axios.get(`http://localhost:3000/api/chat/latest/${roomid}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function CREATE_A_CHAT(data) {
  axios.post(`http://localhost:3000/api/chat/`, {
      room: data.room,
      nickname: data.nickname,
      message: data.message,

    }, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
}

export async function UPDATE_A_CHAT(post_id, updated_data) {
  let data = axios.put(`http://localhost:3000/api/chat/${post_id}`, {
      updated_data
    }, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}

export async function DELETE_A_CHAT(post_id) {
  let data = axios.get(`http://localhost:3000/api/chat/${post_id}`, {
      withCredentials: true
    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
  return data
}


//following
export async function FOLLOW(reciever_params_id, followers, followings) {



  axios.put(`http://localhost:3000/api/following/follow/${reciever_params_id}`, {
      followers: followers,
      followings: followings

    }, {
      withCredentials: true,

    })
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
}


export async function UNFOLLOW(reciever_params_id, followers, followings) {
  axios.put(`http://localhost:3000/api/following/unfollow/${reciever_params_id}`, {

        followers: followers,
        followings: followings

      }, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })
}


//upload


//post-upload
export async function UPLOAD_POST_IMAGE(post_id) {
  axios.post(`http://localhost:3000/api/image/post/upload/${post_id}`, {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

}

export async function GET_POST_IMAGE_ARRAY(post_id) {
  ///api/image/post/upload/:post_id
  axios.post(`http://localhost:3000/api/image/post/upload/${post_id}`, {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })


}

export async function GET_POST_IMAGE(file_name) {
  axios.get(`http://localhost:3000/api/image/post/${file_name}`, {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })


}

export async function DISPLAY_POST_IMAGE(file_name) {
  axios.get(`http://localhost:3000/api/image/post/display/${file_name}`, {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })


}

export async function DELETE_POST_IMAGES(id) {
  axios.delete(`http://localhost:3000/api/image/post/${id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

}


//user-upload
export async function UPLOAD_USER_IMAGE(data) {
  axios
    .post("http://localhost:3000/api/image/user/upload/", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      store.commit("USER_IMAGE", result.data.file.filename)
      return result

    })
    .catch((e) => {
      console.log(e);
    });
}

export async function GET_USER_IMAGE_ARRAY() {
  axios.get('http://localhost:3000/api/image/user/upload/', {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

}

export async function GET_USER_IMAGE(file_name) {
  axios.get(`http://localhost:3000/api/image/user/${file_name}`, {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

}

export async function DISPLAY_USER_IMAGE(file_name) {
  ///api/user/display/:filename
  axios.get(`http://localhost:3000/api/image/user/display/${file_name}`, {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //GET
}

export async function DELETE_USER_IMAGE(id) {
  ///api/image//user/:id
  axios.delete(`http://localhost:3000/api/image/user/${id}`, {}, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //DELETE
}



//store-upload

export async function UPLOAD_STORE_IMAGE(store_id) {
  ///api/image/store/upload/:store_id
  axios.post(`http://localhost:3000/api/image/store/upload/${store_id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //post
}

export async function GET_STORE_IMAGE_ARRAY(store_id) {
  ///api/image/store/upload/:store_id
  axios.get(`http://localhost:3000/api/image/store/upload/${store_id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //GET
}

export async function GET_STORE_IMAGE(file_name) {
  ///api/image///store/:filename'
  axios.get(`http://localhost:3000/api/image/store/${file_name}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //GET
}

export async function DISPLAY_STORE_IMAGE(file_name) {
  axios.get(`http://localhost:3000/api/image/store/display/${file_name}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

}

export async function DELETE_STORE_IMAGE(id) {
  ///api/image///store/:id
  axios.delete(`http://localhost:3000/api/image/store/:${id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //DELETE
}





//product-upload



export async function UPLOAD_PRODUCT_IMAGE(product_id) {
  axios.post(`http://localhost:3000/api/image/product/upload/${product_id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

}

export async function GET_PRODUCT_IMAGE_ARRAY(product_id) {
  ///api/image/product/upload/:post_id
  axios.get(`http://localhost:3000/api/image/product/upload/${product_id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //GET
}

export async function GET_PRODUCT_IMAGE(file_name) {
  ///api/image//product/post/:filename
  axios.get(`http://localhost:3000/api/image/product/${file_name}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //GET
}

export async function DISPLAY_PRODUCT_IMAGE(file_name) {
  ///api/product/display/:filename
  axios.get(`http://localhost:3000/api/image/product/display/${file_name}`, {
        withCredentials: true,

      },

    )
    .then((result) => {

      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //GET
}

export async function DELETE_PRODUCT_IMAGE(id) {
  ///api/image//product/:id
  axios.delete(`http://localhost:3000/api/image/product/${id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {
      console.log(result)
      return result.data

    })
    .catch(e => {
      console.log(e)
    })

  //DELETE
}



export async function ADD_TO_CART(user_id, payload) {
 let data = await  axios.put(`http://localhost:3000/api/cart/${user_id}`, {
        productId: payload.productId,
        quantity: payload.quantity,
        name: payload.name,
        price: payload.price
      }, {
        withCredentials: true,

      },

    )
    .then((result) => {
      console.log(payload)
      console.log(result)
      return result

    })
    .catch(e => {
      console.log(e)
    })
    return data.data
}
export async function DELETE_FROM_CART(user_id, payload) {
  let data = await  axios.put(`http://localhost:3000/api/cart/product/${user_id}`, {
         productId: payload.productId,
         quantity: payload.quantity,
         name: payload.name,
         price: payload.price
       }, {
         withCredentials: true,
 
       },
 
     )
     .then((result) => {
       console.log(payload)
       console.log(result)
       return result
 
     })
     .catch(e => {
       console.log(e)
     })
     return data.data
 }
export async function GET_CART_DATA(user_id) {
  let data = await axios.get(`http://localhost:3000/api/cart/${user_id}`, {
        withCredentials: true,

      },

    )
    .then((result) => {
return result
    })
    .catch(e => {
      console.log(e)
    })
       return data.data

}



export async function ADD_A_STORY(user_id, payload) {
  let data = await  axios.post(`http://localhost:3000/api/story/${user_id}`,{
  content:payload.content,
  userId:user_id
  }, {
    withCredentials: true,

  },

)
.then((result) => {
  return result.data

})
.catch(e => {
  console.log(e)
})
return data}



export async function GET_USER_STORY(user_id) {
  let data = await  axios.get(`http://localhost:3000/api/story/${user_id}`, {
    withCredentials: true,

  },

)
.then((result) => {
  return result.data

})
.catch(e => {
  console.log(e)
})
return data}



export async function DELETE_A_STORY(id){
 let data =  axios.delete(`http://localhost:3000/api/story/${id}`, {
    withCredentials: true,

  },

)
.then((result) => {
  console.log(result)
  return result

})
.catch(e => {
  console.log(e)
})
return data
}


export async function GET_POST_BY_ID(id) {
  let data = await  axios.get(`http://localhost:3000/api/post/id/${id}`, {
    withCredentials: true,

  },

)
.then((result) => {
  return result

})
.catch(e => {
  console.log(e)
})
return data}

export async function GET_POST_BY_TAG(tag) {
  let data = await  axios.get(`http://localhost:3000/api/post/tag/${tag}`, {
    withCredentials: true,

  },

)
.then((result) => {
  return result

})
.catch(e => {
  console.log(e)
})
return data}