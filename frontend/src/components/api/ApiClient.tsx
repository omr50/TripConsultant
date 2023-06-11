import axios from "axios"
export const apiClient = axios.create(
    {
        baseURL: "http://localhost:8000"
        // the other one if for the aws app
        // baseURL: "http://quickstudy.us-east-2.elasticbeanstalk.com"
    }
)