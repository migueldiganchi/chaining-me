exports.welcome = (req, res) => {
  res.set('Content-Type', 'application/json');
  let data = {
    message: 'Welcome!'
  };
  res.send(JSON.stringify(data, null, 2));
};