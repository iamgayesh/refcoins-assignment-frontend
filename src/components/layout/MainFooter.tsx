export default function MainFooter() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto text-center text-sm">
        © {new Date().getFullYear()} PropertyApp. All rights reserved.
      </div>
    </footer>
  );
}
