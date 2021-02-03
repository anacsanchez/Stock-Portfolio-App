import React from 'react';
import { PurchaseStockSection, StockSearchForm, PurchaseStockForm } from '../app/components';

export default {
	title: 'Purchase Stock'
};

export const PurchaseStockSidebar = (args) => <PurchaseStockSection {...args} />;
PurchaseStockSidebar.args = {
	balance: 5000
};

export const StockSearchInput = () => <StockSearchForm />;

export const PurchaseQuantityForm = (args) => <PurchaseStockForm {...args} />;
PurchaseQuantityForm.args = {
	isUp: true,
	currentUnitPrice: 14.49,
	handleQuantitySubmit: () => 'submit quantity',
	companyName: 'apple'
};
