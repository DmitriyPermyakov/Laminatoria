import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainPageComponent } from './main-page/main-page.component'
import { ProductsPageComponent } from './products-page/products-page.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { AcceptOrderComponent } from './accept-order/accept-order.component'
import { EditProductComponent } from './edit-product/edit-product.component'
import { OrdersComponent } from './orders/orders.component'
import { OrderPositionComponent } from './order-position/order-position.component'
import { OrderPositionEditComponent } from './order-position-edit/order-position-edit.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { CreateProductComponent } from './create-product/create-product.component'
import { CreateOrderComponent } from './create-order/create-order.component'
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'product-cart', component: ShoppingCartComponent },
	{ path: 'products', component: ProductsPageComponent },
	{ path: 'products/create', component: CreateProductComponent, canActivate: [AuthGuardService] },
	{ path: 'products/:id/edit', component: EditProductComponent },
	{ path: 'products/:id', component: ProductCardComponent },
	{ path: 'accept-order', component: AcceptOrderComponent },
	{ path: 'orders', component: OrdersComponent },
	{ path: 'orders/create', component: CreateOrderComponent },
	{ path: 'orders/:id', component: OrderPositionComponent },
	{ path: 'orders/:id/edit', component: OrderPositionEditComponent },
	{ path: 'login', component: LoginPageComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
