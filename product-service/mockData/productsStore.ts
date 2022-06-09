export interface IProduct {
  id: string;
  productImageUrl: string;
  productName: string;
  productPrice: number;
}

export const productsStore: IProduct[] = [
  {
    id: "1",
    productImageUrl: 'https://source.unsplash.com/random?sig=0',
    productName: 'First product',
    productPrice: 100
  },
  {
    id: "2",
    productImageUrl: 'https://source.unsplash.com/random?sig=1',
    productName: 'Second product',
    productPrice: 1000
  },
  {
    id: "3",
    productImageUrl: 'https://source.unsplash.com/random?sig=2',
    productName: '3rd product',
    productPrice: 70
  },
  {
    id: "4",
    productImageUrl: 'https://source.unsplash.com/random?sig=3',
    productName: '4th product',
    productPrice: 10
  },
  {
    id: "5",
    productImageUrl: 'https://source.unsplash.com/random?sig=4',
    productName: '5th product',
    productPrice: 33
  }
]