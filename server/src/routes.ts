import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { CreateRoleController } from "./controllers/CreateRoleController";
import { CreateUserController } from "./controllers/CreateUserController";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { ListRolesController } from "./controllers/ListRolesController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createRoleController = new CreateRoleController();
const createUserController = new CreateUserController();

const authenticateUserController = new AuthenticateUserController();

const listRolesController = new ListRolesController();
const listUsersController = new ListUsersController();

router.post("/roles", createRoleController.handle);
router.get("/roles", ensureAuthenticated, listRolesController.handle);

router.post("/authenticate", authenticateUserController.handle);

router.post("/users", createUserController.handle);
router.get("/users", listUsersController.handle);

export { router }