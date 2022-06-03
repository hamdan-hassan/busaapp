

const url = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
export const baseUrl =  {
	baseUrl: url
}