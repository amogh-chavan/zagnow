import IApiResponse from '../types/api_response.interface';

class ApiResponse<T> implements IApiResponse<T> {
  constructor(
    public success: boolean,
    public data: T,
    public message: string,
  ) {}
}
export default ApiResponse;
