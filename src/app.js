const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(
    repositories
  )
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);

  response.json(
    repository
  )
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { url, title, techs } = request.body;

  let repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: ' Repository not found!' });
  }

  repository = {
    id,
    url,
    title,
    techs,
    likes: repositories[repositoryIndex].likes
  }
  repositories[repositoryIndex] = repository;

  return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {

    const {id} = request.params;
    
    let repoIndex = repositories.findIndex(repo => repo.id === id);

    if (repoIndex < 0){
      return response.status(400).json({error:'Repository not found!'});
    }
    
    repositories.splice(repoIndex);
    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
    const {id} = request.params;

    let repository = repositories.find(repo => repo.id === id);

    if (!repository){
      return response.status(400).json({error:"Repository not found!"})
    }
    repository.likes ++;

    return response.json(repository);

});

module.exports = app;
