/**
 * GET /api/welcome
 * Hello, World! 👋
 */
export const welcome = (req, res) => {
  const { name } = req.params
  name ? res.send(`👋 Hello, ${name}!`) : res.send('👋 Hello, World!')
}
