import axios from "axios";
const BASE_URL = "http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000";

//그룹 목록 조회
export async function getGroupList({
  order = "createdAt",
  cursor = "",
  limit = 8,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BASE_URL}/groups/?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getGroupsAxios(currentPage, itemsPerPage){
  const url =`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${currentPage}/${itemsPerPage}?isPublic=true`;
  const res = await axios.get(url);
  const data = res.data;
  return data;
}

      // //grouppage (그룹정보 추억 : 그룹 id필요)
      // axios.get('http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/771bb589-e76f-4ba1-bb2d-3e82008bc251/1/10?isPublic=true')
      // .then((res)=>{console.log(res.data)})
      // .catch(error => {console.log(error)})
      // const page=1
      // const items=4
      // //grouplistpage(그룹정보 리스트)
      // axios.get(`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/groups/${page}/${items}?isPublic=true`)
      // .then((res)=>{console.log(res.data)})
      // .catch(error => {console.log(error)})
      // //memorydetailpage(추억정보 댓글: 추억 id 필요)
      // axios.get('http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/e3307679-ef7b-45aa-adc8-4b83a99dff50/comments')
      // .then((res)=>{console.log(res.data)})
      // .catch(error => {console.log(error)})

      // //const sources=`http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/images/${getTest}`-> 이미지불러오기

// 그룹 생성
export async function createGroup(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/makeGroup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error("데이터를 생성하는데 실패했습니다");
  }
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

// 추억 상세 페이지 불러오기
export async function getDataById(id) {
  const response = await fetch(`${BASE_URL}/GroupPage/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }

  const body = await response.json();
  return body;
}

// 추억 상세 페이지 수정
export async function editMemory(id, updatedItem) {
  const response = await fetch(`${BASE_URL}/GroupPage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  });

  if (!response.ok) {
    throw new Error("데이터를 수정하는 데 실패했습니다.");
  }

  const body = await response.json();
  return body;
}

// 추억 삭제
export async function deleteMemory(id, password) {
  const response = await fetch(`${BASE_URL}/GroupPage/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error("데이터를 삭제하는 데 실패했습니다.");
  }

  const body = await response.json();
  return body;
}

// 댓글 수정
export async function editReply(id, updatedReply, password) {
  const response = await fetch(`${BASE_URL}/GroupPage/replies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updatedReply, password }),
  });

  if (!response.ok) {
    throw new Error("댓글을 수정하는 데 실패했습니다.");
  }

  const body = await response.json();
  return body;
}

// 댓글 삭제
export async function deleteReply(id, password) {
  const response = await fetch(`${BASE_URL}/GroupPage/replies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error("댓글을 삭제하는 데 실패했습니다.");
  }

  const body = await response.json();
  return body;
}

// 공감보내기 상태 업데이트
export function updateLikeCount(id) {
  return fetch(`${BASE_URL}/GroupPage/${id}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "like",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("좋아요 상태 업데이트에 실패했습니다.");
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("서버 요청 중 오류 발생:", error);
    });
}
