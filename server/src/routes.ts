import { Router } from 'express';

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { is, can } from "./middlewares/ensureHasPermission";

import { UpdateUserController } from './controllers/UpdateUserController';
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { RefreshTokenUserController } from "./controllers/RefreshTokenUserController";
import { ForgotPasswordUserController } from "./controllers/ForgotPasswordUserController";
import { ChangePasswordUserController } from "./controllers/ChangePasswordUserController";

import { CreateRoleController } from './controllers/CreateRoleController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateCardController } from "./controllers/CreateCardController";
import { CreatePermissionController } from './controllers/CreatePermissionController';
import { CreateCategoryController } from './controllers/CreateCategoryController';
import { CreateGameController } from './controllers/CreateGameController';
import { CreateBuyTypeController } from './controllers/CreateBuyTypeController';
import { CreateBuyController } from './controllers/CreateBuyController';
import { CreateTicketsController } from './controllers/CreateTicketsController';
import { CreateRolePermissionController } from "./controllers/CreateRolePermissionController";

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
import { GetUserController } from "./controllers/GetUserController";

import { DeleteGameController } from "./controllers/DeleteGameController";
import { DeleteCardController } from "./controllers/DeleteCardController";

import { BuyHistoryController } from "./controllers/BuyHistoryController";

//import { UpdateGameController } from "./controllers/UpdateGameController";

const router = Router();

router.get('/requests', new ListRequestsController().handle);
//const updateGameController = new UpdateGameController();

router.get('/users', new ListUsersController().handle);
router.get('/users/:id', new GetUserController().handle);
router.get('/users/:id/buy-history', new BuyHistoryController().handle);
router.get('/users/:id/friends', new ListUserFriendsController().handle);
router.patch('/users/:id', new UpdateUserController().handle);
router.put('/users/:id', new UpdateUserController().handle);
router.post('/users', new CreateUserController().handle);
router.post('/forgot-password', new ForgotPasswordUserController().handle);
router.post('/change-password', new ChangePasswordUserController().handle);
router.post('/authenticate', new AuthenticateUserController().handle);
router.post('/refresh-token', new RefreshTokenUserController().handle);

router.get('/categories', new ListCategoriesController().handle);
router.post('/categories', new CreateCategoryController().handle);

router.get('/games', new ListGamesController().handle);
router.post('/games', new CreateGameController().handle);
//router.patch('/games/:id', updateGameController.handle);
//router.put('/games/:id', updateGameController.handle);
router.delete('/games/:id', new DeleteGameController().handle);

router.get('/cards', new ListCardsController().handle);
router.post('/cards', new CreateCardController().handle);
router.delete('/cards/:id', new DeleteCardController().handle);

router.get('/buy-types', new ListBuyTypesController().handle);
router.post('/buy-types', new CreateBuyTypeController().handle);

router.get('/buys', new ListBuysController().handle);
router.post('/buys', new CreateBuyController().handle);

router.get('/tickets', new ListTicketsController().handle);
router.post('/tickets', new CreateTicketsController().handle);

// ACL 
router.get('/permissions', new ListPermissionsController().handle);
router.post('/permissions', new CreatePermissionController().handle);

router.get('/roles', new ListRolesController().handle);
router.get('/roles/:id', new ViewRoleController().handle);

router.post(
    '/roles',
    ensureAuthenticated,
    new CreateRoleController().handle
);

router.post('/roles/:id', new CreateRolePermissionController().handle);

export { router }