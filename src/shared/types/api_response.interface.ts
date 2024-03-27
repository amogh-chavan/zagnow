interface IApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export default IApiResponse;
