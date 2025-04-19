export interface IWeeklySales {
  series: IWeeklyPetData[];
  categories: string[];
}

interface IWeeklyPetData {
  name: string;
  data: number[];
}

export interface IPetSaleDetail {
  date: string;
  animal: string;
  price: string;
}
