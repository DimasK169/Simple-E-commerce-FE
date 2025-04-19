export type ApiResponse = {
  code: string;
  message: string;
  data: {
    User_Email: string;
    User_Password: string;
    User_Name: string;
    User_Role: string;
    User_Token: string;
  };
  error: any[];
  data_all: any;
};
