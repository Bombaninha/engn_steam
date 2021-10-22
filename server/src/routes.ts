import { Router } from 'express';

//import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { CreateRoleController } from './controllers/CreateRoleController';
import { CreateUserController } from './controllers/CreateUserController';
/*

import { CreateCardController } from "./controllers/CreateCardController";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
*/
import { ListRolesController } from './controllers/ListRolesController';
/*
import { ListUsersController } from "./controllers/ListUsersController";
import { ListCardsController } from "./controllers/ListCardsController";

import { RefreshTokenUserController } from "./controllers/RefreshTokenUserController";
*/
const router = Router();

const createRoleController = new CreateRoleController();
const createUserController = new CreateUserController();
/*


const createCardController = new CreateCardController();

const authenticateUserController = new AuthenticateUserController();

const refreshTokenUserController = new RefreshTokenUserController();
*/
const listRolesController = new ListRolesController();
/*
const listUsersController = new ListUsersController();
const listCardsController = new ListCardsController();
*/
router.get('/roles', listRolesController.handle);
router.post('/roles', createRoleController.handle);

router.post('/users', createUserController.handle);

//router.get("/roles", ensureAuthenticated, listRolesController.handle);
/*
router.post("/authenticate", authenticateUserController.handle);

router.get("/users", listUsersController.handle);


router.get("/cards", listCardsController.handle);
router.post("/cards", createCardController.handle);

router.post("/refresh-token", refreshTokenUserController.handle);
*/
export { router }