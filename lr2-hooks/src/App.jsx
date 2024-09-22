import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";
import List from "./components/List";
import Cart from "./components/Cart";
import AuthModal from "./components/AuthModal";

const products = [
	{
		name: "Playboi carti bloodsucker tee",
		image: "src/assets/BLOODSUCKER-TEE-247x247.png",
		price: 40.00
	},
	{
		name: "Playboi Carti Burn Tee",
		image: "src/assets/5-247x247.png",
		price: 50.00
	},
	{
		name: "Playboi carti wlr sympathy for the vampire tee",
		image: "src/assets/WLR-SYMPATHY-FOR-THE-VAMPIRE-TEE-247x247.png",
		price: 40.00
	},
	{
		name: "Playboi Carti Devils Trill Tee",
		image: "src/assets/7-247x247.png",
		price: 50.00
	},
	{
		name: "Playboi carti cpfm 4 wlr king vamp hoodie",
		image: "src/assets/CPFM-4-WLR-KING-VAMP-HOODIE-247x247.png",
		price: 150.00
	},
	{
		name: "Playboi Carti Neon Tour T-shirt Black",
		image: "src/assets/36-247x247.png",
		price: 90.00
	},
	{
		name: "Playboi carti new maps of hell poppy tee",
		image: "src/assets/NEW-MAPS-OF-HELL-POPPY-TEE-247x247.png",
		price: 40.00
	},
	{
		name: "Playboi carti new maps of hell tee",
		image: "src/assets/NEW-MAPS-OF-HELL-TEE-247x247.png",
		price: 40.00
	},
	{
		name: "Playboi Carti Neon Tour Drug Zone Tee Black",
		image: "src/assets/29-247x247.png",
		price: 80.00
	},
	{
		name: "Playboi carti war dog coffee mug",
		image: "src/assets/WAR-DOG-COFFEE-MUG-247x247.png",
		price: 25.00
	},
];

function App() {
	const [shoppingStarted, setShoppingStarted] = useState(false);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	const startShopping = () => setShoppingStarted(true);

	const handleCheckboxChange = (product) => {
		setSelectedProducts((prevSelectedProducts) => {
			const productExists = prevSelectedProducts.find((p) => p.name === product.name);
			if (productExists) {
				return prevSelectedProducts.filter((p) => p.name !== product.name);
			} else {
				return [...prevSelectedProducts, { ...product, quantity: 1 }];
			}
		});
	};

	const toggleCart = () => setIsCartOpen(!isCartOpen);

	const updateQuantity = (product, amount) => {
		setSelectedProducts((prevSelectedProducts) =>
			prevSelectedProducts.map((p) =>
				p.name === product.name ? { ...p, quantity: Math.max(p.quantity + amount, 0) } : p
			)
		);
	};

	const removeProduct = (product) => {
		setSelectedProducts((prevSelectedProducts) =>
			prevSelectedProducts.filter((p) => p.name !== product.name)
		);
	};

	const totalPrice = selectedProducts.reduce((sum, product) => {
		const productTotal = product.price * product.quantity;
		return sum + (isNaN(productTotal) ? 0 : productTotal);
	}, 0);

	const handleLogin = (userData) => {
		setCurrentUser({ name: userData.email.split('@')[0] });
		setIsAuthModalOpen(false);
	};

	const handleRegister = (userData) => {
		setCurrentUser({ name: userData.username, email: userData.email });
		setIsAuthModalOpen(false);
	};

	const handleLogout = () => {
		setCurrentUser(null);
	};

	return (
		<>
			<Navbar
				selectedCount={selectedProducts.length}
				toggleCart={toggleCart}
				currentUser={currentUser}
				onLoginClick={() => setIsAuthModalOpen(true)}
				onLogout={handleLogout}
			/>
			<div className="main-content">
				{!shoppingStarted ? (
					<Jumbotron startShopping={startShopping} />
				) : (
					<List
						products={products}
						onCheckboxChange={handleCheckboxChange}
						updateQuantity={updateQuantity}
					/>
				)}
			</div>

			{isCartOpen && (
				<Cart
					products={selectedProducts}
					updateQuantity={updateQuantity}
					removeProduct={removeProduct}
					totalPrice={totalPrice}
				/>
			)}
			<Footer />
			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
				onLogin={handleLogin}
				onRegister={handleRegister}
			/>
			{/* <div className="total-price">
        <h2>Загальна сума: ${totalPrice.toFixed(2)}</h2>
      </div> */}
		</>
	);
}

export default App;
