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

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'product-cart', component: ShoppingCartComponent },
	{ path: 'products/:category', component: ProductsPageComponent },
	{ path: 'products/:id/edit', component: EditProductComponent },
	{ path: 'products/product/:id', component: ProductCardComponent },
	{ path: 'accept-order', component: AcceptOrderComponent },
	{ path: 'orders', component: OrdersComponent },
	{ path: 'orders/:id', component: OrderPositionComponent },
	{ path: 'orders/:id/edit', component: OrderPositionEditComponent },
	{ path: 'login', component: LoginPageComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
