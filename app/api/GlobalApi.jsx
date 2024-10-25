import axios from 'axios';
import { filterUniqueProducts } from '../_utils/filter';

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api`;

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    // 'Cache-Control': 'public, max-age=3600',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
});
const getCategoryList = (url) =>
  axiosClient.get(url).then((resp) => {
    return resp.data.data;
  });

const getHomePageHeroDatas = (url) =>
  axiosClient.get(url).then((resp) => {
    return resp.data.data[0].hero;
  });

const getHomePageSectionsDatas = (url) =>
  axiosClient.get(url).then((resp) => {
    return resp.data.data[0].section;
  });

const getProductById = (id) =>
  axiosClient.get('/products/' + id + '?populate=*').then((resp) => {
    return resp.data.data;
  });
const getFamousProduct = (url) =>
  axiosClient.get(url).then((resp) => {
    return resp.data.data;
  });

const registerUser = (username, email, password) =>
  axiosClient
    .post('/auth/local/register', {
      username,
      email,
      password,
    })
    .then((resp) => {
      return resp.data;
    });
const getAllProducts = (url) =>
  axiosClient.get(url).then((resp) => {
    return resp.data.data;
  });
const getSearchProducts = (query) =>
  axiosClient
    .get(`/products?filters[name][$containsi]=${query}&populate=*`)
    .then((resp) => {
      return filterUniqueProducts(resp.data.data);
    });
const signIn = (data) =>
  axiosClient
    .post('/auth/local', {
      identifier: data.email,
      password: data.password,
    })
    .then((resp) => {
      return resp.data;
    });

const createOrder = (data) =>
  axiosClient.post('/orders', { data }).then((resp) => {
    return resp.data.data;
  });

const updateStock = (id, stock) =>
  axiosClient.put('/sizes/' + id, { data: { stock } }).then((resp) => {
    return resp.data.data;
  });
const getCartItems = (id) =>
  axiosClient
    .get(
      '/carts?filters[userId][$eq]=' +
        id +
        '&populate[products][populate][0]=images'
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemsList = data.map((item) => ({
        id: item.documentId,
        name: item.products[0].name,
        quantity: item.quantity,
        amount: item.amount,
        image: item.products[0].images.url,
        size: item.products[0].size,
        productId: item.products[0].documentId,
      }));
      return cartItemsList;
    });

export default {
  getCategoryList,
  getProductById,
  registerUser,
  signIn,
  getCartItems,
  createOrder,
  getAllProducts,
  getHomePageHeroDatas,
  getHomePageSectionsDatas,
  updateStock,
  getFamousProduct,
  getSearchProducts,
};
