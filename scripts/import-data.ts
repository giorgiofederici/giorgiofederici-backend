import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Skill } from '../server/src/models/skill-model';
import { Project } from '../server/src/models/project-model';

dotenv.config({ path: `./server/config.env` });

const DB = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILES
const skills = JSON.parse(
  fs.readFileSync(`${__dirname}/../../skills.json`, 'utf-8')
);
const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/../../projects.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Skill.create(skills);
    await Project.create(projects);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Skill.deleteMany({});
    await Project.deleteMany({});
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
