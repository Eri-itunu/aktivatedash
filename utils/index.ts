import axios from 'axios'
export const promisify = (fn: any) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

/*
  calculate progress in percentage
*/
export const calcProgress = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()

  if (now < start) {
    return 0
  }

  if (now > end) {
    return 100
  }
  const val = ((now - start) * 100) / (end - start)
  return Math.max(0, Math.round(val));
}

/*
  scale up a value from percentage
*/
export const scaleUp = (params: { max_val: number, min_val: number, a: number}) => {

  const sol = ((params.max_val - params.min_val) * params.a) / 100

  return sol + params.min_val
}

/*
  currency to symbol
*/

export const currencyToSymbol = (currency: "USD" | "NGN"): string => {
  if(currency == "NGN") {
    return  '₦'
  }

  if(currency == "USD") {
    return  '$'
  }

  return ''
}

export  const accountConnectedDiscordNotif = async(payload: { accountId:string, workplatformId:string, userId: string }) => {
  const { accountId, workplatformId, userId } = payload;

  const BASE_URL = "https://discord.com/api";
  const WEBHOOK_ID = "1266012959159881842"
  const WEBHOOK_TOKEN = "LFmahCnGAom8DyUhx_LuWdmtxv8F-p7IB723gMxzqCiIl0KmgI4g2BsnHJK5NuPgbiwu"
  const url = `${BASE_URL}/webhooks/${WEBHOOK_ID}/${WEBHOOK_TOKEN}`;

  const axiosInstance = axios.create({
    baseURL: url,
  });

  const data = {
    content: " ",
      embeds: [
        {
          type: "rich",
          title: "UI- Account Connected",
          description: "UI- Account Connection",
          color: 11342935, // dark vivid pink
          fields: [
            {
              name: `Account ID`,
              value: `${accountId}`,
            },
            {
              name: `Work Platform`,
              value: `${workplatformId}`,
            },
            {
              name: `UserId`,
              value: `${userId}`,
            },
            {
              name: "Date",
              value: `${new Date()}`,
            },
          ],
        },
      ],
  }

  const formData = new FormData();

  formData.append("payload_json", JSON.stringify(data));

  try {
    await axiosInstance.postForm("", formData);
  } catch (err: any) {
    console.log("Error sending to discord");
    // if (err.response) {
    // // The request was made and the server responded with a status code
    // // that falls out of the range of 2xx
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // }
    // throw err
  }

}

export const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date"; // Handle empty or invalid inputs
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options); // Explicitly set locale
};