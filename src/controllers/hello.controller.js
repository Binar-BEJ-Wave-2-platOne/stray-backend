const hello = (req, res, next) => {
  return res.status(200).json({
    status: true,
    message:
      'say salam and welcome to the project challenge platinum group stray',
  });
};

module.exports = { hello };
