const BASE_URL = "https://localhost:3000/api";

//그룹 불러오기
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

// 그룹 생성
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

// 추억 불러오기
export async function getMemories({
  order = "createdAt",
  cursor = "",
  limit = 8,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BASE_URL}/GroupPage/?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

// 추억 상세 페이지 수정
export async function updateMemory(id, formData) {
  const response = await fetch(`${BASE_URL}/GroupPage/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 수정하는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

// 추억 삭제
export async function deleteMemory(id) {
  const response = await fetch(`${BASE_URL}/GroupPage/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("데이터를 삭제하는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

