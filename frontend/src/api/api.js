const BASE_URL = "https://localhost:3000/api";

export async function getGroups({
  order = "createdAt",
  cursor = "",
  limit = 8,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BASE_URL}/?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function createGroup(formData) {
  const response = await fetch(`${BASE_URL}/makeGroup`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 생성하는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
