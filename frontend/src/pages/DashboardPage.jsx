const Dashboard = () => {
  try {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold">Welcome to Dashboard 🎉</h1>
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <p>Something went wrong!</p>;
  }
};

export default Dashboard;
