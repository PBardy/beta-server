import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import UserRoute from './routes/user.route';
import ProductsRoute from './routes/products.route';
import ProductRoute from './routes/product.route';
import LocationRoute from './routes/location.route';
import LocationsRoute from './routes/locations.route';
import CategoryRoute from './routes/category.route';
import CategoriesRoute from './routes/categories.route';

validateEnv();

const app = new App([
  new UserRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProductRoute(),
  new ProductsRoute(),
  new LocationRoute(),
  new LocationsRoute(),
  new CategoryRoute(),
  new CategoriesRoute(),
]);

app.listen();
