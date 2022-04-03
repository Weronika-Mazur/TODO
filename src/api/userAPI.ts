import { fetchService } from "../api/fetchService";
import { FormValues, User } from "../types/type";

class UserAPI {
  login(values: FormValues) {
    return fetchService.post<FormValues, User>("user/login", values);
  }

  register(values: FormValues) {
    return fetchService.post<FormValues, User>("user/register", values);
  }
}

export const userApi = new UserAPI();
