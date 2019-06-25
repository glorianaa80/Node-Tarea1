function okPath(req, string) {
  return new RegExp(`^(${string})`, 'gm').test(req.url);
}

function throwErr(err) {
  if (err) throw new Error(err);
}

function end(res, {data, status = 200, error = null, success = true}) {
  res.statusCode = status;
  if (typeof data === 'string') {
      return res.end(data);
  }
  return res.end(JSON.stringify({
      success,
      error,
      data
  }));
}

function getData({
  req,
  res
}, f, err) {
  let d = '';
  req
      .on('data', c => {
          d += c
          if (d.length > 1e6) error(res, err ? err : 'Too much data');
      })
      .on('end', () => {
          const parsed = qs.parse(d);
          f(parsed);
      });
}

module.exports = {
  okPath,
  end,
  getData,
  throwErr
}