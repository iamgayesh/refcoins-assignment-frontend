const currentYear = new Date().getFullYear();

export default function MainFooter() {
  return (
    <footer className="bg-background text-foreground border-t border-gray-200 dark:border-gray-700 py-6 mt-8 transition-colors">
      <div className="max-w-7xl mx-auto text-center text-sm">
        © {currentYear} PropertyApp. All rights reserved.
      </div>
    </footer>
  );
}
