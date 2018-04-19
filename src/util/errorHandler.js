export default (res, e) => {
  if (e.response) {
    res.status(e.response.status).send(e.response.statusText);
  } else {
    res.status(500).send(e);
  }
}
