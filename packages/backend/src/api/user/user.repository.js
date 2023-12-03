import query from '../../db'

const getUsers = async () => {
  const text = `SELECT id, "firstName", "lastName", email FROM users`
  return await query(text)
}

const getUserById = async (id) => {
  const text = `SELECT id, "firstName", "lastName", email FROM users WHERE id = $1`
  const params = [id]
  return await query(text, params)
}

const getUserByEmail = async (email) => {
  const text = `SELECT id, "firstName", "lastName", email, password FROM users WHERE email = $1`
  const params = [email]
  return await query(text, params)
}

const createUser = async ({ firstName, lastName, email, password }) => {
  const text = `INSERT INTO users ("firstName", "lastName", email, password) VALUES ($1, $2, $3, $4) RETURNING id, "firstName", "lastName", email`
  const params = [firstName, lastName, email, password]
  return await query(text, params)
}

const updateUser = async (id, { firstName, lastName, email, password }) => {
  const text = `UPDATE users SET "firstName"=$1, "lastName"=$2, email=$3, password=$4 WHERE id = $5 RETURNING id, "firstName", "lastName", email`
  const params = [firstName, lastName, email, password, id]
  return await query(text, params)
}

const deleteUser = async (id) => {
  const text = `DELETE FROM users WHERE id = $1 RETURNING id, "firstName", "lastName", email`
  const params = [id]
  return await query(text, params)
}

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
}
