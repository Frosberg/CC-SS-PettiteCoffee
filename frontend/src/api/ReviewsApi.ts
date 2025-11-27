import { handleRequest, HTTP_METHODS } from "./ApiRequest";

const REVIEWS_URLS = {
    LIST: "/reviews/getReviews",
    ADD: "/reviews/addReview",
    ADD_GUEST: "/reviews/addReviewGuest",
};

export const RequestReviews = () => handleRequest<Review[]>(HTTP_METHODS.GET, REVIEWS_URLS.LIST);

export const RequestAddReviewGuest = (data: ReviewGuestPayload) =>
    handleRequest<void>(HTTP_METHODS.POST, REVIEWS_URLS.ADD_GUEST, data);

export const RequestAddReview = (data: ReviewPayload) =>
    handleRequest<void>(HTTP_METHODS.POST, REVIEWS_URLS.ADD, data);
