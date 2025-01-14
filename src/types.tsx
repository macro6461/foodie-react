// Define the type for the props
type FoodieReactProps = {
  GMapsApiKey: string; // Prop is required and must be a string
  radius?: number;
  devPort?: number;
};

type EditorialSummary = {
  overview: string;
};

type Review = {
  author_name: string;
  relative_time_description: string;
  text: string;
  rating: number;
};

type FoodieRestaurant = {
  url: string;
  geometry: { location: GoogleLatLong };
  name: string;
  formatted_address: string;
  international_phone_number: string;
  open_now: boolean;
  price_level: number;
  rating: number;
  reviews: Review[];
  editorial_summary: EditorialSummary;
  user_ratings_total: number;
  distance: number;
  place_id: string;
};

type LatLong = {
  latitude: number;
  longitude: number;
};

type GoogleLatLong = {
  lat: number;
  lng: number;
};

export {
  FoodieReactProps,
  EditorialSummary,
  Review,
  FoodieRestaurant,
  LatLong,
  GoogleLatLong,
};
