import express from 'express';
import * as projectController from '../controllers/project-controller';
import * as authController from '../controllers/auth-controller';

const projectRouter = express.Router();

projectRouter
  .route('/')
  .get(projectController.getAllProjects)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.createProject
  );

projectRouter
  .route('/:id')
  .get(projectController.getProject)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.updateProject
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.deleteProject
  );

export { projectRouter };
