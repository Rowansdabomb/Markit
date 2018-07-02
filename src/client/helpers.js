export const getClientError = errors => {
  if (!errors) return;
  const error = errors[0].message;
  return (error.indexOf('{"_error"') === -1) ? {_error: 'Server query error'} : JSON.parse(error);
}

export const fetchGraphQL = async (graphParams) => {
  const token = sessionStorage.getItem('authToken');
  console.log(token)
  const res = await fetch('http://localhost:3000/api', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    body: JSON.stringify(graphParams)
  });
  const resJSON = await res.json();
  const {data, errors} = resJSON;
  return {data, error: getClientError(errors)}
}