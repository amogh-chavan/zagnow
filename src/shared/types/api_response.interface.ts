interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export default IApiResponse;
