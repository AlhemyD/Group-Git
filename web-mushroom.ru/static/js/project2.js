let post_count = 0;

let posts = {};

function toggleBlock(block2) {
    var block = document.getElementById("block2");
    if (block.style.display === "none") {
      block.style.display = "flex";
    } else {
      block.style.display = "none";
    }
}

// likeCount = 0;
// function likePOst() {
//   let like = document.getElementById("like-image-post");
//   let likeChosen = document.getElementById("like-chosen-image-post");
//   if (like.style.display === "none") {
//     like.style.display = "flex";
//     likeChosen.style.display = "none";
//     likeCount -= 1;
//   } else {
//     like.style.display = "none";
//     likeChosen.style.display = "flex";
//     likeCount += 1;
//   }
// }

function createPost(event){
  console.log(post_count);

  let post = document.createElement("div");
  post.classList.add("my_post");
  post.classList.add("my_post" + post_count);
  let main = document.querySelector(".main");
  main.append(post);

  //

  let img = document.createElement("img");
  img.alt = "654";
  img.src = "./img2/5.jpg"; 
  img.style.width = "900px";
  img.style.height = "600px";
  img.classList.add("image");
  post.append(img);

  let textDiv = document.createElement("div");
  textDiv.style.display = "flex";
  post.append(textDiv);

  let namePost = document.createElement("span");
  namePost.classList.add("namePost");
  namePost.textContent = document.querySelector(".name_post_add").value;
  textDiv.append(namePost);

  let descriptionPost = document.createElement("span");
  descriptionPost.classList.add("descriptionPost");
  descriptionPost.textContent = document.querySelector(".text_post_add").value;
  textDiv.append(descriptionPost);

  post_count+=1;
}