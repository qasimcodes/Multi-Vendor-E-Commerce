import SES from "aws-sdk/clients/ses.js";
import S3 from "aws-sdk/clients/s3.js";

export const AWS_ACCESS_KEY_ID = "AKIA5GGEGDJJWBIEPUUP"
export const AWS_SECRET_ACCESS_KEY = "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"
export const EMAIL_FROM = '"Mohammad Bilal Hussain" <syed.mohammad.hussain2020@gmail.com>'
export const REPLY_TO = "syed.mohammad.hussain2020@gmail.com"
export const AWS_REGION='ap-northeast-1'
export const AWS_API_VERSION='2010-12-01'

export const CLIENT_URL = "http://localhost:5173";

export const BUCKET_NAME = "apnaghar-bucket";

const awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
    apiVersion: AWS_API_VERSION
}

export const AWSSES = new SES(awsConfig);
export const AWSS3 = new S3(awsConfig);

export const JWT_SECRET = "9W4J5T9ERJG9ERW0IERJW9FW";

const options = {
    provider: 'google',
    apiKey: 'AIzaSyD-ZClRLtplttr9sIAYgGTqJkzRBO8DjPA', 
    formatter: null 
  };
  

