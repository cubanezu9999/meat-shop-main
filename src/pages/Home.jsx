import Navbar from "../Navbar/Navbar";
import LatestOffers from "../layouts/LatestOffers/LatestOffers";
import CustomerFavorites from "../layouts/CustomerFavorites/CustomerFavorites";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <LatestOffers />
        <CustomerFavorites />
      </main>
      <div>
        <Link to="/Showcase">Visit our Showcase</Link>
      </div>
    </div>
  );
}
