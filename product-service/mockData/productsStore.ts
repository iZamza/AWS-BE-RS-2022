export interface IProduct {
  id: string,
  title: string,
  description: string,
  price: number
}

export const productsStore: IProduct[] = [
  {
    id: "1",
    title: 'FIRST',
    description: 'some description first',
    price: 100
  },
  {
    id: "2",
    title: 'SECOND',
    description: 'some description second',
    price: 200
  },
  {
    id: "3",
    title: '3th',
    description: 'some description 3th',
    price: 300
  },
  {
    id: "4",
    title: '4th',
    description: 'some description 4th',
    price: 600
  },
  {
    id: "5",
    title: '5th',
    description: 'some description 5th',
    price: 800
  },
  {
    id: "6",
    title: '6th',
    description: 'some description 6th',
    price: 1000
  }
]