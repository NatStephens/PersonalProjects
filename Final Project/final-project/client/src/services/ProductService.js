import axios from 'axios';

export default {

  getProducts(nameSearch, skuSearch ) {
    if(nameSearch != null && skuSearch != null){
        return axios.get('/products?name=' + nameSearch + '&sku=' + skuSearch)
    } else if(nameSearch !=null && skuSearch == null){
        return axios.get('/products?name=' + nameSearch)
    } else if(nameSearch == null && skuSearch != null){
        return axios.get('/products?sku=' + skuSearch)
    }else if(nameSearch == null && skuSearch == null)
     return axios.get('/products')
  },

  getProductById(id){
      return axios.get('/products/' + id)
  },
  searchProduct(searchTerm){
      if(searchTerm){
         return axios.get('/products?name=' + searchTerm)
      }
  }

}