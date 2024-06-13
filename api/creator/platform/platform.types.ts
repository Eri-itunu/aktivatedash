export type CreateRateCardBody =  {
  "platformProfileId": string,
  "price": number,
  "currency": "NGN",
  "service": string,
  "bundle": string,
}

export type UpdateRateCardBody =  {
  "price": number,
  "currency": "NGN",
  "service": string,
  "bundle": string,
}