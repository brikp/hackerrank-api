const api_url = 'https://hacker-news.firebaseio.com/v0';
const params ='.json';

async function fetchItem(id) {
  try {
    const response = await fetch(`${api_url}/item/${id}${params}`)
    const data = await response.json();
    return data;
  }
  catch (e){
    console.log(`Error: ${e}`);
  }
}

export async function fetchTopStories () {
  const response = await fetch(`${api_url}/topstories${params}`);
  const data = await response.json();

  return data;
}

export async function fetchNewStories () {
  const response = await fetch(`${api_url}/newstories${params}`);
  const data = await response.json();

  return data;
}

export async function fetchUser(user) {
  const response = await fetch(`${api_url}/user/${user}${params}`)
  const data = await response.json();

  return data;
}

export async function fetchUserPosts(user, numberOfComments) {
  const posts = [];
  user.submitted.forEach(async (id, index) => {
    if (index < numberOfComments) {
      let post = await fetchItem(id);
      posts.push(post);
    }
    else return;
  });
  return posts;
}

export async function fetchStoryWithComments(storyId) {
  const story = await fetchItem(storyId);
  if (!story.kids) return story;
  const fullStory = {...story}
  const kids = [];
  fullStory.kids.forEach(async (id) => {
    let kid = await fetchStoryWithComments(id);
    kids.push(kid);
  })
  fullStory.kids = kids;
  return fullStory;
}