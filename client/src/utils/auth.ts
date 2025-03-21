import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
  const token = this.getToken();
  if (!token)
    return null;

  try{
    return jwtDecode<JwtPayload>(token);
  }catch (error){
    console.log('Error decoding token:', error);
    return null;
  }
  }

  loggedIn() {
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp < Date.now() / 100) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error decoding token:', error);
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('authToken') || '';
  }

  login(Token: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page

    localStorage.setItem('authToken', Token);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page

    localStorage.removeItem('authToken');
    window.location.assign('/login');
    
  }
}

export default new AuthService();
