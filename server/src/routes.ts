import { Router } from 'express';

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CheckPermission } from "./middlewares/ensureHasPermission";

import { CreateRoleController } from './controllers/CreateRoleController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateCardController } from "./controllers/CreateCardController";
import { CreatePermissionController } from './controllers/CreatePermissionController';

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { ListRolesController } from './controllers/ListRolesController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListCardsController } from "./controllers/ListCardsController";
import { ListPermissionsController } from "./controllers/ListPermissionsController";

import { ViewRoleController } from "./controllers/ViewRoleController";

import { RefreshTokenUserController } from "./controllers/RefreshTokenUserController";

const router = Router();

const createRoleController = new CreateRoleController();
const createUserController = new CreateUserController();
const createCardController = new CreateCardController();
const createPermissionController = new CreatePermissionController();

const authenticateUserController = new AuthenticateUserController();

const refreshTokenUserController = new RefreshTokenUserController();

const listCardsController = new ListCardsController();
const listRolesController = new ListRolesController();
const listUsersController = new ListUsersController();
const listPermissionsController = new ListPermissionsController();

const viewRoleController = new ViewRoleController();

router.get('/roles', ensureAuthenticated, CheckPermission.ensureHasPermission('can-list-roles'), listRolesController.handle);
router.get('/roles/:id', viewRoleController.handle);
router.post('/roles', createRoleController.handle);

router.get('/users', listUsersController.handle);
router.post('/users', createUserController.handle);

router.get('/cards', listCardsController.handle);
router.post('/cards', createCardController.handle);

router.get('/permissions', listPermissionsController.handle);
router.post('/permissions', createPermissionController.handle);

router.post('/authenticate', authenticateUserController.handle);

router.post('/refresh-token', refreshTokenUserController.handle);

export { router }