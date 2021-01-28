export const mocks = {
	Query: () => ({
		getPortfolio: () => ({
			portfolio: {
				id: 2,
				stocks: [{
						id: 1,
						companyName: "apple",
						currentUnitPrice: 18,
						symbol: "aapl",
						shares: 2,
						isUp: true,
						__typename: "UserStock"
					}, {
						id: 2,
						symbol: "HEAR",
						currentUnitPrice: 7.27,
						shares: 13,
						companyName: "Turtle Beach Corp.",
						isUp: false,
						__typename: "UserStock"
					}
				],
				balance: 4000
			}
		}),
		getStock: () => ({
			stock: {
				symbol: 'aapl',
				currentUnitPrice: 84.56,
				companyName: 'apple',
				__typename: "Stock"
			}
		})
	})
};
