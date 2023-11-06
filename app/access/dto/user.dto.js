const UserDTO = (req, user) => ({
  id: user._id,
  username: user.user_name,
  email: user.email
});

const UserListDTO = (req, users) => users.map(user => UserDTO(req, user));

module.exports = {
  UserDTO,
  UserListDTO
};
