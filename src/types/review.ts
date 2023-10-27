export type AddReview = {
  id?: string;
  cameraId: number;
  userName?: string;
  advantage?: string;
  disadvantage?: string;
  review?: string;
  rating?: number;
};
export type Review = AddReview & {

  createAt: string;
};

export type Reviews = Review[];
