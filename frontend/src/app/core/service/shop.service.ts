import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { NGXLogger } from 'ngx-logger';
import { IShopData } from '../model/business';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  // private baseUrl = 'http://localhost:8001';
  private baseUrl = 'https://api-mapofpi.vercel.app';
  allShops: any[] = [];

  coordinates: number[] = [];
  country: string = '';
  city: string = '';
  region: string = '';

  constructor(private logger: NGXLogger) {}

  getConfig(): AxiosRequestConfig {
    const token = localStorage.getItem('accessToken');
    const config: AxiosRequestConfig = {};

    config.headers = {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Origin': 'https://mapofpi.com',
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  setUserPosition(arr: number[]) {
    this.coordinates = arr;
  }

  setCountry(name: string) {
    this.country = name;
  }

  setCity(name: string) {
    this.city = name;
  }
  setRegion(name: string) {
    this.region = name;
  }

  getUserPosition() {
    return this.coordinates;
  }

  async registerShop(shopData: IShopData) {
    const data: any = {
      name: shopData.shopName,
      type: shopData.shopType,
      address: shopData.shopAddress,
      description: shopData.shopDescription,
      image: shopData.shopImage[0],
      phone: shopData.shopPhone,
      email: shopData.shopEmail,
      transactionEnabled: shopData.isPiPaymentEnabled,
      coordinates: this.coordinates,
      country: this.country,
      city: this.city,
      region: this.region,
    };

    try {
      const response = await axios.post(`${this.baseUrl}/shops/register`, { ...data }, this.getConfig());
      return response.data;
    } catch (error: any) {
      this.logger.error('Error while registering shop:', error);
      throw new Error(error);
    }
  }

  async deleteShop(shopId: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}/shops/${shopId}`, this.getConfig());
      return response.data;
    } catch (error) {
      this.logger.error('Error deleting shop:', error);
      throw new Error('Error deleting shop: ');
    }
  }

  async updateShop(shopId: string, updatedData: any) {
    try {
      const response = await axios.patch(`${this.baseUrl}/shops/${shopId}`, updatedData, this.getConfig());
      return response.data;
    } catch (error) {
      this.logger.error('Error updating shop:', error);
      throw new Error('Error updating shop: ');
    }
  }

  async addProductToShop(shopId: string, productData: any) {
    const product = {
      name: productData.itemName,
      description: productData.description,
      price: productData.itemPrice,
      time: productData.prepTime,
      image: productData.image,
    };
    try {
      const response = await axios.post(`${this.baseUrl}/shops/add-product/${shopId}`, { ...product }, this.getConfig());
      return response.data;
    } catch (error) {
      this.logger.error('Error adding product to shop:', error);
      throw new Error('Error adding product to shop: ');
    }
  }

  async deleteProductFromShop(productId: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}/shops/products/${productId}`, { ...this.getConfig });
      return response.data;
    } catch (error) {
      this.logger.error('Error deleting product from shop:', error);
      throw new Error('Error deleting product from shop: ');
    }
  }

  async getShopProducts(shopId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/shops/products/${shopId}`, this.getConfig());
      return response.data;
    } catch (error) {
      this.logger.error('Error getting shop products:', error);
      throw new Error('Error getting shop products: ');
    }
  }

  async getAllShops() {
    try {
      const response = await axios.get(`${this.baseUrl}/shops`);
      this.logger.info(response.data);

      return (this.allShops = response.data.data);
    } catch (error) {
      this.logger.error('Error getting all shops:', error);
      throw new Error('Error getting all shops: ');
    }
  }

  async getShop(shopId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/shops/${shopId}`);
      this.logger.info('New shop created as: ', JSON.stringify(response.data.data));
      return response.data;
    } catch (error) {
      this.logger.error('Error getting shop:', error);
      throw new Error('Error getting shop: ');
    }
  }
}
