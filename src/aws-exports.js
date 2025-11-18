const awsconfig = {
  Auth: {
    Cognito: {
      region: "us-east-1",
      userPoolId: "us-east-1_z2tH7rL2Q",
      userPoolClientId: "vir2ppe6l7dkvvs2i4js044bj",

      // Required by Amplify v6 — prevents loginWith crash
      loginWith: {
        username: true,   // You are using email login only
        email: true,
        phone: false,
      },
    }
  }
};

export default awsconfig;
