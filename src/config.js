export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-2",
      BUCKET: "fitness-tracker-uploads"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://5f95s5jnhi.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_UZO7x4njg",
      APP_CLIENT_ID: "vvmooq1159r8gpnvth8aguqum",
      IDENTITY_POOL_ID: "us-east-2:9b94976e-dc30-4725-8c5f-7bbf3e85515b"
    }
  };