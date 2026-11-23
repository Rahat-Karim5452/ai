export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface IBooking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  location: string;
  hostEmail: string;
  email: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  totalPrice: number;
  status: BookingStatus;
}
