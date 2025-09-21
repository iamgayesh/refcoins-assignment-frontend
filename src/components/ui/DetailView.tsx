interface DetailViewProps {
    title: string;
    description: string;
  }
  
  export default function DetailView({ title, description }: DetailViewProps) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  