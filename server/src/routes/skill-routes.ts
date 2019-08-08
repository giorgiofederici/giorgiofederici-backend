import express from 'express';
import * as skillController from '../controllers/skill-controller';
import * as authController from '../controllers/auth-controller';

const skillRouter = express.Router();

skillRouter
  .route('/')
  .get(skillController.getAllSkills)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    skillController.createSkill
  );

skillRouter
  .route('/:id')
  .get(skillController.getSkill)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    skillController.updateSkill
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    skillController.deleteSkill
  );

export { skillRouter };
