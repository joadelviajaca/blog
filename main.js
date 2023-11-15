document.addEventListener("DOMContentLoaded", () => {
    const articleList = document.getElementById("article-list");
    const addArticle = async (article) => {
      const listItem = document.createElement("li");
      const author = await getAuthor(article.authorId);
      listItem.textContent = `${article.title} - Autor: ${author.first_name}`;

      listItem.addEventListener("click", () => {
        // Redirigir a la página de detalles del artículo al hacer clic
        window.location.href = `article-details.html?id=${article.id}`;
      });

      articleList.appendChild(listItem);
    }
    // Obtener la lista de artículos desde la API
    fetch('http://localhost:3000/articles')
      .then(response => response.json())
      .then(articles => {
        articles.forEach(addArticle);
      })
      .catch(error => console.error('Error:', error));
  });

  const getAuthor = async (id)=>{
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const author = await response.json();
    return author;
  }
  