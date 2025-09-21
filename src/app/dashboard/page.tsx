import ImageLayer from "../../components/ui/ImageLayer";
import SearchBar from "../../components/ui/SearchBar";

export default function DashboardPage() {
  return (
    <div>
      <ImageLayer />
      <SearchBar />
      <section className="max-w-6xl mx-auto mt-16 p-4">
        <h2 className="text-2xl font-bold mb-4">Featured Properties</h2>
        <p className="text-gray-600">
          Explore our curated list of properties available for sale and rent.
        </p>
      </section>
    </div>
  );
}
