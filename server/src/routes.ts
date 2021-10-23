import { Router } from 'express';

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { CreateRoleController } from './controllers/CreateRoleController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateCardController } from "./controllers/CreateCardController";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { ListRolesController } from './controllers/ListRolesController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListCardsController } from "./controllers/ListCardsController";

import { RefreshTokenUserController } from "./controllers/RefreshTokenUserController";

const router = Router();

const createRoleController = new CreateRoleController();
const createUserController = new CreateUserController();

const authenticateUserController = new AuthenticateUserController();

const createCardController = new CreateCardController();

const refreshTokenUserController = new RefreshTokenUserController();

const listCardsController = new ListCardsController();
const listRolesController = new ListRolesController();
const listUsersController = new ListUsersController();

router.get('/roles', ensureAuthenticated, listRolesController.handle);
router.post('/roles', createRoleController.handle);

router.get('/users', listUsersController.handle);
router.post('/users', createUserController.handle);

router.get('/cards', listCardsController.handle);
router.post('/cards', createCardController.handle);

router.post('/authenticate', authenticateUserController.handle);

router.post('/refresh-token', refreshTokenUserController.handle);

export { router }