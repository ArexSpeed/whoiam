const url = process.env.NEXT_PUBLIC_URL;

export const getCategories = async () => {
  const data = await fetch(`${url}/api/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json());

  return data;
}

export const getSubcategories = async () => {
  const data = await fetch(`${url}/api/subcategory`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json());

  return data;
}

export const getWords = async () => {
  const data = await fetch(`${url}/api/words`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json());

  return data;
}