const awsconfig = {
  Auth: {
    Cognito: {
      region: "us-east-1",
      userPoolId: "us-east-1_z2tH7rL2Q",
      userPoolClientId: "vir2ppe6l7dkvvs2i4js044bj",

      // Required for Amplify v6
      loginWith: {
        email: true,
        username: false,
        phone: false
      }
    }
  }
};

export default awsconfig;
