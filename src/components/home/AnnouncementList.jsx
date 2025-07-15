const AnnouncementList = ({ announcements }) => {
  if (!announcements || announcements.length === 0) return null;

  return (
    <section className="py-4 px-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-3">📢 Announcements</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((a) => (
          <div key={a._id} className="p-4 bg-base-200 rounded-lg shadow">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm">{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementList;
