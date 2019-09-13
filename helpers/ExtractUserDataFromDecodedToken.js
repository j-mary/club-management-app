const ExtractUserDataFromDecodedToken = decoded => ({
  name: `${decoded.firstName} ${decoded.lastName}`,
  userName: decoded.userName,
  email: decoded.email,
  userSlug: decoded.slug,
});

export default ExtractUserDataFromDecodedToken;
