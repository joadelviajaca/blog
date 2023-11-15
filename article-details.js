document.addEventListener("DOMContentLoaded", () => {
    const articleDetails = document.getElementById("article-details");
    const commentsList = document.getElementById("comments-list");
    const commentForm = document.getElementById("comment-form");
    const authorSelect = document.getElementById("author-select");
    const commentContent = document.getElementById("comment-content");
  
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
  
    // Obtener los detalles del artículo desde la API
    fetch(`http://localhost:3000/articles/${articleId}`)
      .then(response => response.json())
      .then(article => {
        // Mostrar los detalles del artículo
        const detailsHTML = `
          <h2>${article.title}</h2>
          <p>Autor: ${article.authorId}</p>
          <p>${article.content}</p>
        `;
        articleDetails.innerHTML = detailsHTML;
      })
      .catch(error => console.error('Error:', error));
  
    // Obtener la lista de autores desde la API y poblar el campo de selección
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        users.forEach(user => {
          const option = document.createElement("option");
          option.value = user.id;
          option.textContent = user.first_name;
          authorSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error:', error));
  
    // Obtener y mostrar los comentarios asociados al artículo desde la API
    fetch(`http://localhost:3000/comments?articleId=${articleId}`)
      .then(response => response.json())
      .then(comments => {
        comments.forEach(comment => {
          const listItem = document.createElement("li");
          listItem.textContent = `Autor: ${comment.userId}, Comentario: ${comment.comment}`;
          commentsList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error:', error));
  
    // Manejar el envío del formulario de comentario
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const commentData = {
        comment: commentContent.value,
        userId: authorSelect.value,
        articleId: articleId
      };
  
      // Guardar el comentario en la API
      fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })
      .then(response => response.json())
      .then(newComment => {
        // Mostrar el nuevo comentario en la lista de comentarios
        const listItem = document.createElement("li");
        listItem.textContent = `Autor: ${newComment.userId}, Comentario: ${newComment.comment}`;
        commentsList.appendChild(listItem);
  
        // Limpiar el formulario después de agregar el comentario
        commentContent.value = "";
      })
      .catch(error => console.error('Error:', error));
    });
  });
  