import { Router } from 'express';

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CheckPermission } from "./middlewares/ensureHasPermission";

import { CreateRoleController } from './controllers/CreateRoleController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateCardController } from "./controllers/CreateCardController";
import { CreatePermissionController } from './controllers/CreatePermissionController';
import { CreateCategoryController } from './controllers/CreateCategoryController';
import { CreateGameController } from './controllers/CreateGameController';
import { CreateBuyTypeController } from './controllers/CreateBuyTypeController';
import { CreateBuyController } from './controllers/CreateBuyController';

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { ListRolesController } from './controllers/ListRolesController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListCardsController } from "./controllers/ListCardsController";
import { ListPermissionsController } from "./controllers/ListPermissionsController";
import { ListCategoriesController } from "./controllers/ListCategoriesController";
import { ListGamesController } from "./controllers/ListGamesController";
import { ListBuyTypesController } from './controllers/ListBuyTypesController';
import { ListBuysController } from './controllers/ListBuysController';

import { ViewRoleController } from "./controllers/ViewRoleController";
import { ViewUserController } from "./controllers/ViewUserController";

import { RefreshTokenUserController } from "./controllers/RefreshTokenUserController";

const router = Router();

const createRoleController = new CreateRoleController();
const createUserController = new CreateUserController();
const createCardController = new CreateCardController();
const createPermissionController = new CreatePermissionController();
const createCategoryController = new CreateCategoryController();
const createGameController = new CreateGameController();
const createBuyTypeController = new CreateBuyTypeController();
const createBuyController = new CreateBuyController();

const authenticateUserController = new AuthenticateUserController();

const refreshTokenUserController = new RefreshTokenUserController();

const listCardsController = new ListCardsController();
const listRolesController = new ListRolesController();
const listUsersController = new ListUsersController();
const listPermissionsController = new ListPermissionsController();
const listCategoriesController = new ListCategoriesController();
const listGamesController = new ListGamesController();
const listBuyTypesController = new ListBuyTypesController();
const listBuysController = new ListBuysController();

const viewRoleController = new ViewRoleController();
const viewUserController = new ViewUserController();

//router.get('/roles', ensureAuthenticated, CheckPermission.ensureHasPermission('can-list-roles'), listRolesController.handle);
router.get('/roles', ensureAuthenticated, listRolesController.handle);
router.get('/roles/:id', viewRoleController.handle);
router.post('/roles', createRoleController.handle);

router.get('/users', listUsersController.handle);
router.post('/users', createUserController.handle);
router.post('/users/view', viewUserController.handle);

router.get('/categories', listCategoriesController.handle);
router.post('/categories', createCategoryController.handle);

router.get('/games', listGamesController.handle);
router.post('/games', createGameController.handle);

router.get('/cards', listCardsController.handle);
router.post('/cards', createCardController.handle);

router.get('/permissions', listPermissionsController.handle);
router.post('/permissions', createPermissionController.handle);

router.post('/authenticate', authenticateUserController.handle);

router.post('/refresh-token', refreshTokenUserController.handle);

router.get('/buy-types', listBuyTypesController.handle);
router.post('/buy-types', createBuyTypeController.handle);

router.get('/buys', listBuysController.handle);
router.post('/buys', createBuyController.handle);

export { router }