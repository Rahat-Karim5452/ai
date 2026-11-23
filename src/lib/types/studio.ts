export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export interface IStudio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  gallery?: string[];
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhoto?: string;
  rating: number;
  reviews?: IReview[];
}
