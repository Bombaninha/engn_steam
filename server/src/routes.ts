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
import { CreateTicketsController } from './controllers/CreateTicketsController';

import { UpdateUserController } from './controllers/UpdateUserController';

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { ListRolesController } from './controllers/ListRolesController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListCardsController } from "./controllers/ListCardsController";
import { ListPermissionsController } from "./controllers/ListPermissionsController";
import { ListCategoriesController } from "./controllers/ListCategoriesController";
import { ListGamesController } from "./controllers/ListGamesController";
import { ListBuyTypesController } from './controllers/ListBuyTypesController';
import { ListBuysController } from './controllers/ListBuysController';

import { ListUserFriendsController } from './controllers/ListUserFriendsController';
import { ListRequestsController } from './controllers/ListRequestsController';

import { ListTicketsController } from './controllers/ListTicketsController';

import { ViewRoleController } from "./controllers/ViewRoleController";
import { ViewUserController } from "./controllers/ViewUserController";

import { DeleteGameController } from "./controllers/DeleteGameController";
import { DeleteCardController } from "./controllers/DeleteCardController";

import { BuyHistoryController } from "./controllers/BuyHistoryController";

import { RefreshTokenUserController } from "./controllers/RefreshTokenUserController";

import { ForgotPasswordUserController } from "./controllers/ForgotPasswordUserController";

import { ChangePasswordUserController } from "./controllers/ChangePasswordUserController";

//import { UpdateGameController } from "./controllers/UpdateGameController";

const router = Router();

const createRoleController = new CreateRoleController();
const createUserController = new CreateUserController();
const createCardController = new CreateCardController();
const createPermissionController = new CreatePermissionController();
const createCategoryController = new CreateCategoryController();
const createGameController = new CreateGameController();
const createBuyTypeController = new CreateBuyTypeController();
const createBuyController = new CreateBuyController();

const createTicketsController = new CreateTicketsController();
const updateUserController = new UpdateUserController();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const forgotPasswordUserController = new ForgotPasswordUserController();
const changePasswordUserController = new ChangePasswordUserController();

const listCardsController = new ListCardsController();
const listRolesController = new ListRolesController();
const listUsersController = new ListUsersController();
const listPermissionsController = new ListPermissionsController();
const listCategoriesController = new ListCategoriesController();
const listGamesController = new ListGamesController();
const listBuyTypesController = new ListBuyTypesController();
const listBuysController = new ListBuysController();
const listUserFriendsController = new ListUserFriendsController();

const listRequestsController = new ListRequestsController();

const viewRoleController = new ViewRoleController();
const viewUserController = new ViewUserController();

const deleteGameController = new DeleteGameController();
const deleteCardController = new DeleteCardController();

const buyHistoryController = new BuyHistoryController();

const listTicketsController = new ListTicketsController();

router.get('/requests', listRequestsController.handle);
//const updateGameController = new UpdateGameController();
//router.get('/roles', ensureAuthenticated, CheckPermission.ensureHasPermission('can-list-roles'), listRolesController.handle);
router.get('/roles', listRolesController.handle);
router.get('/roles/:id', viewRoleController.handle);
router.post('/roles', createRoleController.handle);

router.get('/users', listUsersController.handle);
router.get('/users/:id/buy-history', buyHistoryController.handle);
router.get('/users/:id/friends', listUserFriendsController.handle);
router.patch('/users/:id', updateUserController.handle);
router.put('/users/:id', updateUserController.handle);
router.post('/users', createUserController.handle);
router.post('/users/view', viewUserController.handle);
router.post('/forgot-password', forgotPasswordUserController.handle);
router.post('/change-password', changePasswordUserController.handle);
router.post('/authenticate', authenticateUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);

router.get('/categories', listCategoriesController.handle);
router.post('/categories', createCategoryController.handle);

router.get('/games', listGamesController.handle);
router.post('/games', createGameController.handle);
//router.patch('/games/:id', updateGameController.handle);
//router.put('/games/:id', updateGameController.handle);
router.delete('/games/:id', deleteGameController.handle);

router.get('/cards', listCardsController.handle);
router.post('/cards', createCardController.handle);
router.delete('/cards/:id', deleteCardController.handle);

router.get('/permissions', listPermissionsController.handle);
router.post('/permissions', createPermissionController.handle);

router.get('/buy-types', listBuyTypesController.handle);
router.post('/buy-types', createBuyTypeController.handle);

router.get('/buys', listBuysController.handle);
router.post('/buys', createBuyController.handle);

router.get('/tickets', listTicketsController.handle);
router.post('/tickets', createTicketsController.handle);

export { router }