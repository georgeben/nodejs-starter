class AuthRepository {
  async login(email, password) {
    return {
      user: "George",
      email,
      password,
    };
  }
}

export default AuthRepository;
