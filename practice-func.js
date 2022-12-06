function handleFunction(options, callback) {
  if (!Array.isArray(options)) return;
  options.forEach((item) => {
    callback(item + 5);
  });
}

function resultFunc(data) {
  console.log(data);
}

let data = [1, 2, 3];

handleFunction(data, (params) => {
  resultFunc(params);
});