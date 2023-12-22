import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { MainPageComponent } from './main-page/main-page.component'
import { ProductsPageComponent } from './products-page/products-page.component'
import { FilterComponent } from './filter/filter.component'
import { OpenCloseMenuDirective } from './directives/open-close-menu.directive'
import { ProductComponent } from './product/product.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { RelatedProductsComponent } from './related-products/related-products.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { ShoppintCartItemComponent } from './shoppint-cart-item/shoppint-cart-item.component'
import { CounterComponent } from './counter/counter.component'
import { AcceptOrderComponent } from './accept-order/accept-order.component'
import { AuthService } from './services/auth.service'
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderPositionComponent } from './order-position/order-position.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { DeliveryBtnsComponent } from './delivery-btns/delivery-btns.component'

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		MainPageComponent,
		ProductsPageComponent,
		FilterComponent,
		OpenCloseMenuDirective,
		ProductComponent,
		ProductCardComponent,
		RelatedProductsComponent,
		ShoppingCartComponent,
		ShoppintCartItemComponent,
		CounterComponent,
		AcceptOrderComponent,
		EditProductComponent,
  OrdersComponent,
  OrderPositionComponent,
  OrderItemComponent,
  DeliveryBtnsComponent,
	],
	imports: [BrowserModule, AppRoutingModule],
	providers: [AuthService],
	bootstrap: [AppComponent],
})
export class AppModule {}
