import decode from 'jwt-decode';

export default () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  let decodedToken;
  let decodedRefreshToken;

  try {
    decodedToken = decode(token);
    decodedRefreshToken = decode(refreshToken);
  } catch (err) {
    return false;
  }
  return {
    decodedToken,
    decodedRefreshToken
  };
};
