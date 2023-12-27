const toggleFormButton = document.getElementById('toggleForm');
const formContainer = document.getElementById('formContainer');
var userContainer = document.getElementById('userContainer');
const acc = document.getElementById('acc');
const exit = document.getElementById('exit');

toggleFormButton.addEventListener('click', function() {
    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
        formContainer.classList.add('form'); // Добавляем класс .form
    } else {
        formContainer.style.display = 'none';
        formContainer.classList.remove('form'); // Удаляем класс .form
    }
});

toggleForm.addEventListener('click', function(){
    userContainer.style.display = 'block';
});

var sendButton = document.querySelector('.send');
sendButton.addEventListener('click', function(){
    var username = document.querySelector('.registratsia input[type="text"]').value;
    userContainer.innerHTML = username;
    userContainer.style.display = 'block';
    userContainer.classList.add('userLog');
    formContainer.style.display = 'none';
    toggleFormButton.style.display = 'none';
});

userContainer.addEventListener('click', function(){
    if (acc.style.display === 'none') {
        acc.style.display = 'block';
        acc.classList.add('account'); // Добавляем класс .form
    } else {
        acc.style.display = 'none';
        acc.classList.remove('account'); // Удаляем класс .form
    }
});

exit.addEventListener('click', function(){
    userContainer.style.display = 'none';
    userContainer.classList.remove('userLog');
    formContainer.style.display = 'none';
    formContainer.classList.remove('form');
    acc.style.display = 'none';
    acc.classList.remove('account');
    toggleFormButton.style.display = 'block';
});

// Находим элементы на странице
const posts = document.querySelectorAll('.post');

// Проходимся по каждому посту и добавляем обработчик события клика на элементе .like
posts.forEach((post) => {
    const likeIkon = post.querySelector('.like');
    const likeImage = likeIkon.querySelector('img[id^="like-image-"]');
    const likeChosenImage = likeIkon.querySelector('img[id^="like-chosen-image-"]');
    const likeCount = post.querySelector('span[id^="like-count-"]');
            
    likeIkon.addEventListener('click', toggleLike);

    function toggleLike() {
        // Проверяем текущее состояние лайка
        const isLiked = likeChosenImage.style.display !== 'none';
                    
        if (isLiked) {
            // Если лайк уже поставлен, удаляем его
            likeChosenImage.style.display = 'none';
            likeImage.style.display = 'inline-block';
            likeCount.textContent = Number(likeCount.textContent) - 1;
        } else {
            // Если лайк не поставлен, добавляем его
            likeImage.style.display = 'none';
            likeChosenImage.style.display = 'inline-block';
            likeCount.textContent = Number(likeCount.textContent) + 1;
        }
    }
});



