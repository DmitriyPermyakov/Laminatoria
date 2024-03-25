import { NgModule, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData } from '@angular/common'
import localeRu from '@angular/common/locales/ru'
import '@angular/common/locales/global/ru'

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
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component'
import { CounterComponent } from './counter/counter.component'
import { AcceptOrderComponent } from './accept-order/accept-order.component'
import { EditProductComponent } from './edit-product/edit-product.component'
import { OrdersComponent } from './orders/orders.component'
import { OrderPositionComponent } from './order-position/order-position.component'
import { OrderItemComponent } from './order-item/order-item.component'
import { DeliveryBtnsComponent } from './delivery-btns/delivery-btns.component'
import { OrderItemEditComponent } from './order-item-edit/order-item-edit.component'
import { OrderPositionEditComponent } from './order-position-edit/order-position-edit.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProductPropsComponent } from './product-props/product-props.component'
import { AdditionalPropsComponent } from './additional-props/additional-props.component'
import { PaginationComponent } from './pagination/pagination.component'
import { ControlButtonsComponent } from './control-buttons/control-buttons.component'
import { ShoppingCartItemInfoComponent } from './shopping-cart-item-info/shopping-cart-item-info.component'
import { CreateProductComponent } from './create-product/create-product.component'
import { CreateOrderComponent } from './create-order/create-order.component'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { AUTH_INTERCEPTOR_PROVIDER } from './interceptors/auth.interceptor'
import { ImagesComponent } from './images/images.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component'

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
		ShoppingCartItemComponent,
		CounterComponent,
		AcceptOrderComponent,
		EditProductComponent,
		OrdersComponent,
		OrderPositionComponent,
		OrderItemComponent,
		DeliveryBtnsComponent,
		OrderItemEditComponent,
		OrderPositionEditComponent,
		LoginPageComponent,
		ProductPropsComponent,
		AdditionalPropsComponent,
		PaginationComponent,
		ControlButtonsComponent,
		ShoppingCartItemInfoComponent,
		CreateProductComponent,
		CreateOrderComponent,
		ClickOutsideDirective,
		ImagesComponent,
  ChangePasswordComponent,
  ChangeEmailComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
	providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }, AUTH_INTERCEPTOR_PROVIDER],
	bootstrap: [AppComponent],
})
export class AppModule {}
