
export function fetchData(payload) {
  const action = {
    type:"API_LOAD",
    payload
  };
  return action;
}
