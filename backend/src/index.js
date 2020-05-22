const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const PORT = 3333;

const projects = [];

const app = express();
app.use(cors());
app.use(express.json());

const checkProject = (req, res, next) => {
  const { id } = req.params;

  const projIndex = projects.findIndex(
    proj => proj.id === id
  );

  if (projIndex < 0) {
    return res
      .status(400)
      .json({ error: 'Project not found' });
  }

  req.projIndex = projIndex;

  next();
};

app.get('/projects', (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter(proj =>
        proj.title
          .toLowerCase()
          .includes(title.toLowerCase())
      )
    : projects;

  return res.json(results);
});

app.post('/projects', (req, res) => {
  const { title, owner, techs } = req.body;

  const newProj = { id: uuid(), title, owner, techs };
  projects.push(newProj);

  return res.json(newProj);
});

app.put('/projects/:id', checkProject, (req, res) => {
  const { projIndex } = req;

  const { title, owner, techs } = req.body;

  const project = {
    id: projects[projIndex].id,
    title: title || projects[projIndex].title,
    owner: owner || projects[projIndex].owner,
    techs: techs || projects[projIndex].techs,
  };

  projects[projIndex] = project;

  return res.json(project);
});

app.delete('/projects/:id', checkProject, (req, res) => {
  const { projIndex } = req;
  projects.splice(+projIndex, 1);

  return res.status(204).send();
});

app.listen(PORT, () => {
  // Super + `.` to insert emoji
  console.log(`> Listening on port ${PORT}`);
});
